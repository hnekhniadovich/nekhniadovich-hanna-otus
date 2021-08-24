const path = require('path');
const fs = require('fs');

const tree = (customPath, currentDir, result) => {
    const currentDirectory = path.resolve();
    result.dirs.push(path.relative(currentDirectory, path.resolve(currentDir, customPath)));

    return new Promise((resolve, reject) => {
        fs.readdir(path.resolve(currentDir, customPath), { withFileTypes: true }, (err, filenames) => {
            if(err) {
                reject(err);
                return;
            }
            Promise.all(filenames.map((file) => {
                if(file.isDirectory()) {
                    return tree(file.name, path.resolve(currentDir, customPath), result);
                } else {
                    result.files.push(path.relative(currentDirectory, path.resolve(currentDir, customPath, file.name) ));
                }
            }))
            .then(resolve);
        })
    })
}

module.exports = tree;