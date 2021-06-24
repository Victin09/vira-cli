import path from 'path';

const generateProjectPath = (projectName: string): string => {
    if (projectName === path.basename(process.cwd())) return process.cwd();
    return path.join(process.cwd(), projectName);
}

export default generateProjectPath;
