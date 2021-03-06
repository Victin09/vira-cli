import fs from 'fs';
import path from 'path';

const copyFolderSync = (from: string, to: string, initialpath: string) => {
    try {
        if (!fs.existsSync(to)) fs.mkdirSync(to); 
        fs.readdirSync(from).forEach(element => {
            if (fs.lstatSync(path.join(from, element)).isFile() && !from.toLowerCase().includes('.gitignore')) {
                fs.copyFileSync(path.join(from, element), path.join(to, element));
            } else {
                copyFolderSync(path.join(from, element), path.join(to, element), initialpath);
            }
        });
    } catch (error) {
        fs.rmdirSync(initialpath);
        process.exit();
    }
}

const removeFolder = (projectPath: string) => {
    try {
        fs.rmdirSync(projectPath);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

export { copyFolderSync, removeFolder };
