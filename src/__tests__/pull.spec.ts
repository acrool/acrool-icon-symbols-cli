import fs from 'fs';
import {createServer, Server} from 'http';
import os from 'os';
import path from 'path';

import {API_HOST, buildPullUrl, pullSymbols} from '../api';

/**
 * 直接測試 api.ts（不含 chalk/logger，jest 可在行程內 import），
 * 以本地 http server 跑過 axios 真實請求路徑；host 以函式參數注入（測試專用，非使用者設定）。
 */
describe('pull', () => {
    const svgBody = '<svg xmlns="http://www.w3.org/2000/svg" style={{height:0, width:0, display: \'block\'}}></svg>';
    const timeout = 30 * 1000;

    it('buildPullUrl 應使用內部後端域名', () => {
        expect(buildPullUrl('01js17m', 'react'))
            .toBe('https://api-workspace.acrool.com/api/icon-symbols/01js17m/pull?type=react');
        expect(API_HOST).toBe('https://api-workspace.acrool.com');
    });

    it('type 非法時應拋錯', async () => {
        await expect(
            pullSymbols({token: 't', id: 'i', path: '/tmp/x.tsx', type: 'vue' as never}, 'http://127.0.0.1:1'),
        ).rejects.toThrow(/Invalid icon symbols type/);
    });

    it('should download svg symbols', async () => {
        const server: Server = createServer((req, res) => {
            if (req.method === 'GET' && req.url && req.url.startsWith('/api/icon-symbols/01js17m/pull')) {
                res.writeHead(200, {'content-type': 'text/plain'});
                res.end(svgBody);
                return;
            }
            res.writeHead(404, {'content-type': 'text/plain'});
            res.end('Not Found');
        });

        await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
        const address = server.address();
        const port = typeof address === 'object' && address ? address.port : 0;
        const baseUrl = `http://127.0.0.1:${port}`;

        const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'acrool-icon-cli-'));
        const savePath = path.join(workDir, 'output/SvgSymbol.tsx');

        try {
            await pullSymbols({
                token: 'uimofa-academy',
                id: '01js17m',
                path: savePath,
                type: 'react',
            }, baseUrl);

            expect(fs.existsSync(savePath)).toBe(true);
            expect(fs.readFileSync(savePath, 'utf-8')).toContain('<svg');
        } finally {
            fs.rmSync(workDir, {recursive: true, force: true});
            await new Promise<void>((resolve) => server.close(() => resolve()));
        }
    }, timeout);

    it('回傳 HTML 時應拋錯', async () => {
        const server: Server = createServer((req, res) => {
            res.writeHead(200, {'content-type': 'text/html'});
            res.end('<!doctype html><html><body>SPA</body></html>');
        });
        await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
        const address = server.address();
        const port = typeof address === 'object' && address ? address.port : 0;
        const baseUrl = `http://127.0.0.1:${port}`;

        const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'acrool-icon-cli-'));
        const savePath = path.join(workDir, 'output/SvgSymbol.tsx');

        try {
            await expect(
                pullSymbols({token: 't', id: '01js17m', path: savePath, type: 'react'}, baseUrl),
            ).rejects.toThrow(/Received HTML/);
            expect(fs.existsSync(savePath)).toBe(false);
        } finally {
            fs.rmSync(workDir, {recursive: true, force: true});
            await new Promise<void>((resolve) => server.close(() => resolve()));
        }
    }, timeout);
});
