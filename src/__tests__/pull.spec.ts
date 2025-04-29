import {spawn} from 'child_process';
import path from 'path';
import fs from 'fs';

describe('pull', () => {
    const cli = path.join(__dirname, '../../dist/bin/cli.js');
    const targetFile = path.join(__dirname, '../../src/library/acrool-react-icon/SvgSymbol.tsx');

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
                expect(code).toBe(0);
                expect(output).toContain(`✔ SVG 符號已成功下載到 src/library/acrool-react-icon/SvgSymbol.tsx`);

                const existsFile = await fs.existsSync(targetFile);
                expect(existsFile).toBe(true);

                done();
            } catch (error) {
                done(error);
            }
        });
    }, timeout);
});
