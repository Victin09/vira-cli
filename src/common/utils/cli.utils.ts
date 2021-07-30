import path from 'path';
import chalk from 'chalk';

import ProjectAnswers from '../interfaces/answers.interface';
import constants from '../constants/project.constants';
import initGitRepository from './git.utils';
import generateProjectPath from './path.utils';
import checkProjectFolder from './folder.utils';
import { copyFolderSync } from './fs.utils';
import packageManagerInit from './pm.utils';
import MESSAGES from '../constants/messages.cosntants';

const generate = async (projectOptions: ProjectAnswers) => {
    switch (projectOptions.projectType.toLowerCase()) {
        case constants.EXPRESS:
            generateExpressTemplate(projectOptions);
            break;
        case constants.NESTJS:
            generateNestTemplate(projectOptions);
            break;
        case constants.REACT:
            generateReactTemplate(projectOptions);
            break;
        case constants.VUE:
            console.info('Vue project');
            break;
        default:
            break;
    }
}

const generateExpressTemplate = async (projectOptions: ProjectAnswers) => {
    if (checkProjectFolder(projectOptions.projectName)) {
        const projectPath = generateProjectPath(projectOptions.projectName);
        // copy express template
        let templatePathToGenerate = path.join(process.cwd(), 'src/templates/express/ts-typeorm');
        if (!projectOptions.projectExpress!.toLowerCase().includes('typeorm')) templatePathToGenerate = path.join(process.cwd(), 'src/templates/express/ts-no-typeorm');
        copyFolderSync(templatePathToGenerate, projectPath, projectPath);
        // install with package manager
        await packageManagerInit(projectOptions.projectPackageManager, projectPath, projectOptions.projectName);
        // init git
        if (projectOptions.projectGit) initGitRepository(projectPath);
        // Run get started messages
        getStartedMessages(projectPath, projectOptions.projectPackageManager);
    }
}

const generateReactTemplate = async (projectOptions: ProjectAnswers) => {
    if (checkProjectFolder(projectOptions.projectName)) {
        const projectPath = generateProjectPath(projectOptions.projectName);
        // copy react template
        copyFolderSync(path.join(process.cwd(), 'src/templates/react'), projectPath, projectPath);
        // install with package manager
        await packageManagerInit(projectOptions.projectPackageManager, projectPath, projectOptions.projectName);
        // init git
        if (projectOptions.projectGit) initGitRepository(projectPath);
        // Run get started messages
        getStartedMessages(projectPath, projectOptions.projectPackageManager);
    }
}

const generateNestTemplate = async (projectOptions: ProjectAnswers) => {
    if (checkProjectFolder(projectOptions.projectName)) {
        const projectPath = generateProjectPath(projectOptions.projectName);
        // copy nest template
        copyFolderSync(path.join(process.cwd(), 'src/templates/nest'), projectPath, projectPath);
        // install with package manager
        await packageManagerInit(projectOptions.projectPackageManager, projectPath, projectOptions.projectName);
        // init git
        if (projectOptions.projectGit) initGitRepository(projectPath);
        // Run get started messages
        getStartedMessages(projectPath, projectOptions.projectPackageManager);
    }
}


const getStartedMessages = (projectPath: string, packageManager: string) => {
    console.info();
    console.info(MESSAGES.GET_STARTED_INFORMATION);
    console.info();
    console.info(chalk.gray(MESSAGES.CHANGE_DIR_COMMAND(projectPath)));
    console.info(chalk.gray(MESSAGES.START_COMMAND(packageManager.toLowerCase())));
    console.info();
}

export default generate;
