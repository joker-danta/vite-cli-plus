import logSymbols from 'log-symbols';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

export const created = async (projectName) => {
    console.log('=====1111', projectName);
    if (fs.existsSync(`./${projectName}`)) {
      const dir = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'dir',
          message: '文件目录已经存在，是否删除该文件夹？',
          default: true
        }
      ]);
      if (!dir.dir) {
        console.log(logSymbols.error, chalk.hex('#d60b46').bold('请先手动删除该文件目录，再进行初始化'));
        return
      }
      fs.rmSync(`./${projectName}`, { recursive: true })
      fs.mkdirSync(`./${projectName}`)
      console.log(logSymbols.success, chalk.hex('#d60b46').bold('项目文件创建成功'));
      console.log('000000', dir);
    }
    const template = await inquirer.prompt([
        {
          type: 'list',
          name: 'template',
          message: '请选择框架',
          choices: [
            'Vue3',
            'React'
          ]
        }
    ]);
    console.log('======', template);
    const styles = await inquirer.prompt([
        {
          type: 'list',
          name: 'style',
          message: '请选择CSS语言',
          choices: [
            'SCSS',
            'LESS',
            '都需要'
          ]
        }
    ]);
    console.log('======', styles);
    const lang = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'lang',
          message: '是否需要TypeScript',
          default: true
        }
    ]);
    console.log('======', lang);
    const fileDate = {
        data: '11111'
    };
    fs.writeFileSync('./demo.js', JSON.stringify(fileDate), 'utf8');
}

 