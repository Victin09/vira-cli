import inquirer from 'inquirer';
import path from 'path';

import ProjectAnswers from '../interfaces/answers.interface';
import messages from '../constants/messages.cosntants';
import constants from '../constants/project.constants';
import checkProjectName from './folder.utils';

const initQuestions = async (): Promise<ProjectAnswers> => {
    const projectType: string = await projectTypeQuestion();
    const projectName: string = await projetNameQuestion();
    const projectPackageManager: string = await projectPackageManagerQuestion();
    const projectGit: string = await projectGitQuestion();

    if (projectType.toLowerCase() === constants.EXPRESS) {
        const projectExpress: string = await projectExpressQuestion();
        return { projectType, projectName, projectPackageManager, projectGit, projectExpress }
    }

    return { projectType, projectName, projectPackageManager, projectGit };
}

const projectTypeQuestion = async (): Promise<string> => {
    const projectType: inquirer.Answers = await inquirer.prompt({
        name: 'type',
        type: 'list',
        message: messages.PROJECT_SELECTION_QUESTION,
        choices: ['Express', 'NestJS', 'React', 'Vue'],
    });

    return projectType.type;
}

const projetNameQuestion = async (): Promise<string> => {
    const projectName: inquirer.Answers = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: messages.PROJECT_NAME_QUESTION,
        default: path.basename(process.cwd())
    });

    return new Promise(resolve => {
        if (!checkProjectName(projectName.name)) resolve(projetNameQuestion());
        else return resolve(projectName.name)
    })
}

const projectPackageManagerQuestion = async (): Promise<string> => {
    const projectPackageManager: inquirer.Answers = await inquirer.prompt({
        name: 'pm',
        type: 'list',
        message: messages.PACKAGE_MANAGER_QUESTION,
        choices: ['NPM', 'YARN']
    });

    return projectPackageManager.pm;
}


const projectGitQuestion = async (): Promise<string> => {
    const projectGit: inquirer.Answers = await inquirer.prompt({
        name: 'git',
        type: 'confirm',
        message: messages.GIT_QUESTION
    });

    return projectGit.git;
}

const projectExpressQuestion = async (): Promise<string> => {
    const projectExpress: inquirer.Answers = await inquirer.prompt({
        name: 'express',
        type: 'list',
        message: messages.PROJECT_LIBRARY_SELECTION_QUESTION,
        choices: ['TypeScript with TypeORM', 'TypeScript without TypeORM']
    });

    return projectExpress.express;
}

export default initQuestions;
