import path from 'path';
import ejs from 'ejs';
const __dirname = path.resolve();

/**
 * 编译ejs模版文件
 * @param {*} target // 需要编译的目标文件路径
 * @param {*} data // 模版内注入的数据
 * @returns str || err
 */
export const compile = (target, data) => {
    const fileOption = `${target}`;
    const filePath = path.resolve(__dirname, fileOption);
    
    return new Promise((resolve, reject) => {
        ejs.renderFile(filePath, data, {}, (err, str) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(str);
        });
    });
};