import {logger} from './logger';
import fs from 'fs';
import path from 'path';
import axios, { AxiosError } from 'axios';
import {
    IPull
} from './types';


interface IResponseError {
    code: number,
    message: string,
}

export async function main(args: IPull) {

    try {
        // 讀取配置文件
        const configPath = path.join(process.cwd(), '.acrool-svg-symbols.cjs');
        if (!fs.existsSync(configPath)) {
            throw new Error('找不到 .acrool-svg-svg-symbols.cjs 配置文件');
        }

        const config = require(configPath);
        const { token, id, path: savePath } = config;

        if (!token || !id || !savePath) {
            throw new Error('配置文件缺少必要的 token、id 或 path 字段');
        }

        const apiUrl = `http://localhost:8080/api-frontdesk/iconSymbols/pull/${id}`;
        // const apiUrl = `https://workspace.acrool.com/api/iconSymbols/pull/${id}`;
        // 調用 API 下載 SVG 符號
        const response = await axios.get(apiUrl, {
            headers: {
                'icon-symbols-token': token,
            }
        })
            .catch((error: AxiosError<IResponseError>) => {
                if (error.response) {
                    // 服務器返回了錯誤狀態碼
                    throw new Error(`API 請求失敗: ${error.response.status} - ${error.response.data.message}`);
                } else if (error.request) {
                    // 請求已發送但沒有收到響應
                    throw new Error('無法連接到服務器，請檢查網絡連接');
                } else {
                    // 請求配置出錯
                    throw new Error(`請求配置錯誤: ${error}`);
                }
        });


        // 確保目標目錄存在
        const dir = path.dirname(savePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // 保存下載的內容
        fs.writeFileSync(savePath, response.data);
        logger.success(`SVG 符號已成功下載到 ${savePath}`);

    } catch (e) {
        if(e instanceof Error){
            logger.error(e.message);
        }
    }
}
