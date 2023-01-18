import path from 'path';
import logSymbols from 'log-symbols';
import chalk from 'chalk';
import fs from 'fs';
import { compile } from '../lib/utils/utils.js';
/**
 * vue项目初始化文件方法
 * @param {*} projectName 项目名称 
 * @param {*} styles 选择的style语言
 * @param {*} lang 选择的开发语言
 */
export const vueCreateFile = async (projectName, styles, lang) => {
    const targetPath = path.resolve(path.resolve(), `./${projectName}`);
    const sourcePath = path.resolve(path.resolve(), './lib/template/vue');
    const packagePath = path.resolve(path.resolve(), './lib/ejs/vue-package.ejs');
    fs.cpSync(sourcePath, targetPath, { recursive: true, filter: (file) => {
        if (file.indexOf('.ejs') !== -1) {
            return false
        }
        return true
    }});
    try {
        const packageStr = await compile(packagePath, { 
          projectName: projectName,
          styles: styles.style,
          lang: lang.lang
        });
        const indexStr = await compile(`${sourcePath}/index.ejs`, { 
            lang: lang.lang
        });
        const mainStr = await compile(`${sourcePath}/src/main.ejs`, {});
        const viteStr = await compile(`${sourcePath}/vite.config.ejs`, {});
        fs.writeFileSync(`${targetPath}/package.json`, packageStr, 'utf8');
        fs.writeFileSync(`${targetPath}/index.html`, indexStr, 'utf8');
        fs.writeFileSync(`${targetPath}/vite.config.js`, viteStr, 'utf8');
        lang.lang ? fs.writeFileSync(`${targetPath}/src/main.ts`, mainStr, 'utf8') : fs.writeFileSync(`${targetPath}/src/main.js`, mainStr, 'utf8');
    } catch (err) {
        console.log(logSymbols.error, chalk.hex('#d60b46').bold('package.json文件编译错误'), err);
    }
}