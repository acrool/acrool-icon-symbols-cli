import {spawn} from 'child_process';
import fs from 'fs';
import nock from 'nock';
import path from 'path';

describe('pull', () => {
    beforeAll(() => {
        // 攔截 axios 呼叫的 API，範例如下
        nock('https://workspace.acrool.com')
            .get('/api/iconSymbols/pull')
            .reply(200, {icons: ['mock-icon']});
    });

    afterAll(() => {
        nock.cleanAll(); // 移除所有攔截器
    });

    const cli = path.join(__dirname, '../../dist/bin/cli.js');
    const targetFile = path.join(__dirname, '../../sandbox/library/acrool-react-icon/SvgSymbol.tsx');

    const timeout = 30 * 1000;
    afterAll(async () => {
        // 測試結束後 刪除文件
        const existsFile = await fs.existsSync(targetFile);
        if(existsFile){
            await fs.rmSync(targetFile);
        }
    }, timeout);

    it('should download svg symbols', (done) => {
        const cmd = spawn('node', [
            cli,
            'pull'
        ]);

        let output = '';
        cmd.stdout.on('data', (data) => {
            output += data.toString();
        });

        cmd.on('close', async (code) => {
            try {
                expect(code).toBe(1);
                expect(output).toContain('✔ SVG symbol successfully downloaded to sandbox/library/acrool-react-icon/SvgSymbol.tsx');

                const existsFile = await fs.existsSync(targetFile);
                expect(existsFile).toBe(true);

                done();
            } catch (error) {
                done(error);
            }
        });
    }, timeout);
});
