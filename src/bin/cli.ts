#!/usr/bin/env node

import {Command} from 'commander';

import {main as pullSymbols} from '../pull.js';

const program = new Command();

program
    .version('1.0.0')
    .command('pull')
    .option('-t, --saveFile <path>', 'Target file path')
    .action(pullSymbols);

// program
//     .command('lossySquash')
//     .option('-t, --saveFile <path>', 'Target file path')
//     .action(runLossySquash);

program.parse(process.argv);

const command = program.args[0];
if (!['pull'].includes(command)) {
    console.error('Invalid command');
    process.exit(1);
}
