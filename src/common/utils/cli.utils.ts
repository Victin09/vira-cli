import path from 'path';
import chalk from 'chalk';

import ProjectAnswers from '../interfaces/answers.interface';
import constants from '../constants/project.constants';
import initGitRepository from './git.utils';
import generateProjectPath from './path.utils';
import checkProjectFolder from './folder.utils';
import copyFileSync from './fs.template';
import packageManagerInit from './pm.utils';
import MESSAGES from '../constants/messages.cosntants';

const generate = async (projectOptions: ProjectAnswers) => {
    switch (projectOptions.projectType.toLowerCase()) {
        case constants.EXPRESS:
            generateExpressTemplate(projectOptions);
            break;
        case constants.NESTJS:
            console.info('NestJS project');
            break;
        case constants.REACT:
            console.info('React project');
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
        copyFileSync(templatePathToGenerate, projectPath, projectPath);
        // init git
        if (projectOptions.projectGit) initGitRepository(projectPath);
        // install with package manager
        await packageManagerInit(projectOptions.projectPackageManager, projectPath, projectOptions.projectName);
        // Run get started messages
        getStartedMessages(projectPath, projectOptions.projectPackageManager);
    }

}

const getStartedMessages = (projectPath: string, packageManager: string) => {
    console.info(MESSAGES.GET_STARTED_INFORMATION);
    console.info();
    console.info(chalk.gray(MESSAGES.CHANGE_DIR_COMMAND(projectPath)));
    console.info(chalk.gray(MESSAGES.START_COMMAND(packageManager.toLowerCase())));
    console.info();
}

export default generate;
