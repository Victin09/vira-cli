import path from 'path';
import fs from 'fs';

import messages from '../constants/messages.cosntants';

const checkProjectFolder = (folderName: string): boolean => {
    const currentPath = path.basename(process.cwd());
    if (folderName === currentPath) return true;
    if (fs.existsSync(folderName)) {
        console.info(messages.PROJECT_FOLDER_EXSIST)
        return false;
    }
    return true;
}

export default checkProjectFolder;
