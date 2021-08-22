//tree - вывод списка файлов и папок файловой системы

//NodeJS скрипт tree для вывода списка файлов и папок файловой системы. 
//Результатом работы должен быть объект с массивами { files, folders }. 
//Вызовы файловой системы должны быть асинхронными. 
//Скрипт принимает входной параметр - путь до папки. Bозможность 
//выполнять этот скрипт через команду npm run tree -- path

//При вызове с путем foo/ скрипт должен вернуть структуру:

// {
//   "files": [
//     "foo/f1.txt",
//     "foo/f2.txt",
//     "foo/bar/bar1.txt",
//     "foo/bar/bar2.txt"
//   ],
//   "dirs": [
//     "foo",
//     "foo/bar",
//     "foo/bar/baz"
//   ]
// }


const path = require('path');
const tree = require('./tree');

const customPath = process.argv.slice(2)[0]

if(!customPath) {
    console.error('Please enter the directory: ex. npm run tree -- YOUR/PATH/');
    process.exit(1);
}

const currentDir = path.resolve();
const result = { files: [], dirs: [] }

tree(customPath, currentDir, result)
    .then(() => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
