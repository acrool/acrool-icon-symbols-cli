import axios, {AxiosError} from 'axios';
import fs from 'fs';
import path from 'path';

import {
    IIconSymbolsConfig,
    TIconSymbolType,
} from './types';


interface IResponseError {
    code: number,
    message: string,
}

/**
 * 後端 API 域名（內部設定，使用者不需也不應在 .acrool-icon-symbols.cjs 指定）。
 */
export const API_HOST = 'https://api-workspace.acrool.com';

/**
 * 允許的輸出類型。
 */
export const allowedTypes: TIconSymbolType[] = ['react', 'svg', 'angular', 'flutter'];

/**
 * 組出 pull 端點 URL。
 * @param id - Icon Symbols ID
 * @param type - 輸出類型
 * @param host - API 域名（預設為內部 API_HOST，僅測試時注入）
 */
export function buildPullUrl(id: string, type: TIconSymbolType, host: string = API_HOST): string {
    const normalizedHost = host.replace(/\/+$/, '');
    return `${normalizedHost}/api/icon-symbols/${id}/pull?type=${type}`;
}

/**
 * 依設定下載 icon symbols 並寫檔，回傳寫入的檔案路徑。
 * 失敗時拋出錯誤（交由呼叫端決定如何記錄）。
 * @param config - 設定檔內容
 * @param host - API 域名（預設為內部 API_HOST，僅測試時注入）
 */
export async function pullSymbols(config: IIconSymbolsConfig, host: string = API_HOST): Promise<string> {
    const {token, id, path: savePath, type = 'react'} = config;

    if (!token || !id || !savePath) {
        throw new Error('The configuration file is missing the required `token`, `id` or `path` fields');
    }

    if (!allowedTypes.includes(type)) {
        throw new Error(`Invalid icon symbols type: ${type}. Allowed types: ${allowedTypes.join(', ')}`);
    }

    const apiUrl = buildPullUrl(id, type, host);

    // 調用 API 下載 SVG 符號
    const response = await axios.post(apiUrl, {token}, {
        responseType: 'text',
    })
        .catch((error: AxiosError<IResponseError>) => {
            if (error.response) {
                // 服務器返回了錯誤狀態碼
                throw new Error(`API request failed: ${error.response.status} - ${error.response.data?.message}`);
            } else if (error.request) {
                // 請求已發送但沒有收到響應
                throw new Error('Unable to connect to the server, please check your network connection');
            } else {
                // 請求配置出錯
                throw new Error(`Request configuration error: ${error}`);
            }
        });

    const contentType = String(response.headers['content-type'] || '');
    if (contentType.includes('text/html')) {
        throw new Error('Received HTML instead of icon symbols, please check id, token and whether the endpoint exists');
    }

    // 確保目標目錄存在
    const dir = path.dirname(savePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }

    // 保存下載的內容
    fs.writeFileSync(savePath, response.data);

    return savePath;
}
