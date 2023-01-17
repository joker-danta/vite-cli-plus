#!/usr/bin/env node
import fs from 'fs';
import { program } from 'commander';
import logSymbols from 'log-symbols';
import chalk from 'chalk';
import { created } from '../src/index.js';

program.version(JSON.parse(fs.readFileSync('./package.json', 'utf8')).version, '-v, --version', '检查vite-cli版本号')
program.option('-c, --create <arg1>', '创建的项目名称')

program.parse()
const options = program.opts();
if (options.create) {
    console.log('======', options);
    created(options.create);
} else {
    console.log(logSymbols.error, chalk.hex('#d60b46').bold('请输入项目名称'));
}

