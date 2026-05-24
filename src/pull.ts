import fs from 'fs';
import path from 'path';

import {pullSymbols} from './api.js';
import {logger} from './logger.js';
import {
    IIconSymbolsConfig,
    IPull,
} from './types';


/**
 * 讀取專案根目錄的設定檔。
 */
async function loadConfig(): Promise<IIconSymbolsConfig> {
    const configPath = path.join(process.cwd(), '.acrool-icon-symbols.cjs');
    if (!fs.existsSync(configPath)) {
        throw new Error('.acrool-icon-symbols.cjs configuration file not found');
    }

    const configModule = await import(`file://${configPath}`);
    return configModule.default as IIconSymbolsConfig;
}

export async function main(args: IPull) {
    try {
        const config = await loadConfig();
        const savePath = await pullSymbols(config);
        logger.success(`SVG symbol successfully downloaded to ${savePath}`);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
    }
}
