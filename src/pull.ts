import axios, {AxiosError} from 'axios';
import fs from 'fs';
import path from 'path';

import {logger} from './logger.js';
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
        const configPath = path.join(process.cwd(), '.acrool-icon-symbols.cjs');
        if (!fs.existsSync(configPath)) {
            throw new Error('.acrool-icon-symbols.cjs configuration file not found');
        }

        const configModule = await import(`file://${configPath}`);
        const config = configModule.default;

        const {token, id, path: savePath} = config;

        if (!token || !id || !savePath) {
            throw new Error('The configuration file is missing the required `token`, `id` or `path` fields');
        }

        // const apiUrl = `http://localhost:8080/api-frontdesk/iconSymbols/pull/${id}`;
        const apiUrl = `https://workspace.acrool.com/api/iconSymbols/pull/${id}`;
        // 調用 API 下載 SVG 符號
        const response = await axios.get(apiUrl, {
            headers: {
                'icon-symbols-token': token,
            }
        })
            .catch((error: AxiosError<IResponseError>) => {
                if (error.response) {
                    // 服務器返回了錯誤狀態碼
                    throw new Error(`API request failed: ${error.response.status} - ${error.response.data.message}`);
                } else if (error.request) {
                    // 請求已發送但沒有收到響應
                    throw new Error('Unable to connect to the server, please check your network connection');
                } else {
                    // 請求配置出錯
                    throw new Error(`Request configuration error: ${error}`);
                }
            });


        // 確保目標目錄存在
        const dir = path.dirname(savePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {recursive: true});
        }

        // 保存下載的內容
        fs.writeFileSync(savePath, response.data);
        logger.success(`SVG symbol successfully downloaded to ${savePath}`);

    } catch (e) {
        if(e instanceof Error){
            logger.error(e.message);
        }
    }
}
