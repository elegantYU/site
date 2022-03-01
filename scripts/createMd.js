/*
 * @Date: 2022-02-12 18:18:09
 * @LastEditors: elegantYu
 * @LastEditTime: 2022-03-01 14:15:50
 * @Description: 创建有模板的 md 文件
 */
const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
const chalk = require('chalk');

const TEMPLATE = path.resolve(__dirname, '../template/post.md');
const OUTPATH = path.resolve(__dirname, '../content/posts');
const filterTextReg = /\{(.*)\}/g;
const argTitle = process.argv.slice(2)[0];

const replaceText = (text, oWords = [], rWords = []) =>
  text.replace(filterTextReg, (_, $1) => {
    const idx = oWords.indexOf($1.trim());
    if (idx !== -1) {
      return rWords[idx];
    }
    return _;
  });

try {
  const data = fs.readFileSync(TEMPLATE, 'utf8');
  const nowDate = dayjs().format('YYYY-MM-DD HH:mm:SS');
  const content = replaceText(data, ['title', 'date'], [argTitle, nowDate]);
  fs.writeFileSync(path.join(OUTPATH, `${argTitle}.md`), content);
  console.log(chalk.green('已创建新文章'), argTitle);
} catch (error) {
  console.log(chalk.red('麻烦看下这是什么报错'), error);
}
