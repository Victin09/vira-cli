import path from 'path';
import chalk from 'chalk';

import ProjectAnswers from '../interfaces/answers.interface';
import constants from '../constants/project.constants';
import initGitRepository from './git.utils';
import generateProjectPath from './path.utils';
import checkProjectFolder from './folder.utils';
import { copyFolderSync } from './fs.utils';
import packageManagerInit from './pm.utils';
import MESSAGES from '../constants/messages.constants';

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
            generateVueTemplate(projectOptions);
            break;
        default:
            break;
    }
}

const generateExpressTemplate = async (projectOptions: ProjectAnswers) => {
    if (checkProjectFolder(projectOptions.projectName)) {
        const projectPath = generateProjectPath(projectOptions.projectName);
        // copy express template
        let templatePathToGenerate: string = '';
        switch (projectOptions.projectSubType.toLowerCase()) {
            case constants.EXPRESS_DEFAULT:
                templatePathToGenerate = path.join(path.join(__dirname, '../../'), `templates/express/${constants.EXPRESS_DEFAULT}`)
                break;
            case constants.EXPRESS_KNEX:
                templatePathToGenerate = path.join(path.join(__dirname, '../../'), `templates/express/${constants.EXPRESS_KNEX}`)
                break;
            case constants.EXPRESS_MONGOOSE:
                templatePathToGenerate = path.join(path.join(__dirname, '../../'), `templates/express/${constants.EXPRESS_MONGOOSE}`)
                break;
            case constants.EXPRESS_PRISMA:
                templatePathToGenerate = path.join(path.join(__dirname, '../../'), `templates/express/${constants.EXPRESS_PRISMA}`)
                break;
            case constants.EXPRESS_ROUTING_CONTROLLER:
                templatePathToGenerate = path.join(path.join(__dirname, '../../'), `templates/express/${constants.EXPRESS_ROUTING_CONTROLLER}`)
                break;
            case constants.EXPRESS_SEQUELIZE:
                templatePathToGenerate = path.join(path.join(__dirname, '../../'), `templates/express/${constants.EXPRESS_SEQUELIZE}`)
                break;
            case constants.EXPRESS_TYPEORM:
                templatePathToGenerate = path.join(path.join(__dirname, '../../'), `templates/express/${constants.EXPRESS_TYPEORM}`)
                break;
            default:
                break;
        }
        copyFolderSync(templatePathToGenerate, projectPath, projectPath);
        // init git
        if (projectOptions.projectGit) initGitRepository(projectPath);
        // install with package manager
        await packageManagerInit(projectOptions.projectPackageManager, projectPath, projectOptions.projectName);
        // Run get started messages
        getStartedMessages(projectPath, projectOptions.projectPackageManager);
    }
}

const generateNestTemplate = async (projectOptions: ProjectAnswers) => {
    if (checkProjectFolder(projectOptions.projectName)) {
        const projectPath = generateProjectPath(projectOptions.projectName);
        // copy nest template
        copyFolderSync(path.join(path.join(__dirname, '../../'), 'templates/nest/basic'), projectPath, projectPath);
        // init git
        if (projectOptions.projectGit) initGitRepository(projectPath);
        // install with package manager
        await packageManagerInit(projectOptions.projectPackageManager, projectPath, projectOptions.projectName);
        // Run get started messages
        getStartedMessages(projectPath, projectOptions.projectPackageManager);
    }
}

const generateReactTemplate = async (projectOptions: ProjectAnswers) => {
    if (checkProjectFolder(projectOptions.projectName)) {
        const projectPath = generateProjectPath(projectOptions.projectName);
        let templatePathToGenerate: string;
        if (projectOptions.projectSubType.toLowerCase() === constants.REACT_BOOTSTRAP)
            templatePathToGenerate = path.join(path.join(__dirname, '../../'), `templates/react/${constants.REACT_BOOTSTRAP}`)
        else 
            templatePathToGenerate = path.join(path.join(__dirname, '../../'), `templates/react/${constants.REACT_TAILWIND}`)
        // copy react template
        copyFolderSync(templatePathToGenerate, projectPath, projectPath);
        // init git
        if (projectOptions.projectGit) initGitRepository(projectPath);
        // install with package manager
        await packageManagerInit(projectOptions.projectPackageManager, projectPath, projectOptions.projectName);
        // Run get started messages
        getStartedMessages(projectPath, projectOptions.projectPackageManager);
    }
}

const generateVueTemplate = async (projectOptions: ProjectAnswers) => {
    if (checkProjectFolder(projectOptions.projectName)) {
        const projectPath = generateProjectPath(projectOptions.projectName);
        let templatePathToGenerate: string;
        if (projectOptions.projectSubType.toLowerCase() === constants.VUE_BOOTSTRAP)
            templatePathToGenerate = path.join(path.join(__dirname, '../../'), `templates/vue/${constants.VUE_BOOTSTRAP}`)
        else 
            templatePathToGenerate = path.join(path.join(__dirname, '../../'), `templates/vue/${constants.VUE_TAILWIND}`)
        // copy react template
        copyFolderSync(templatePathToGenerate, projectPath, projectPath);
        // init git
        if (projectOptions.projectGit) initGitRepository(projectPath);
        // install with package manager
        await packageManagerInit(projectOptions.projectPackageManager, projectPath, projectOptions.projectName);
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
