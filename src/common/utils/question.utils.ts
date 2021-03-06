import inquirer from 'inquirer';
import path from 'path';

import ProjectAnswers from '../interfaces/answers.interface';
import messages from '../constants/messages.constants';
import constants from '../constants/project.constants';
import checkProjectName from './folder.utils';

const initQuestions = async (): Promise<ProjectAnswers> => {
    const projectType: string = await projectTypeQuestion();
    const projectSubType: string = await projectSubTypeQuestion(projectType);
    const projectName: string = await projetNameQuestion();
    const projectPackageManager: string = await projectPackageManagerQuestion();
    const projectGit: string = await projectGitQuestion();

    return { projectType, projectSubType, projectName, projectPackageManager, projectGit };
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

const projectSubTypeQuestion = async (projectType: string): Promise<string> => {
    let projectSubType: inquirer.Answers;
    switch (projectType.toLowerCase()) {
        case constants.EXPRESS:
            projectSubType = await inquirer.prompt({
                name: 'type',
                type: 'list',
                message: messages.PROJECT_SELECTION_QUESTION,
                choices: ['Default', 'Knex', 'Mongoose', 'Prisma', 'Routing-controller', 'Sequelize', 'Typeorm'],
            });
            return projectSubType.type;
        case constants.REACT:
            projectSubType = await inquirer.prompt({
                name: 'type',
                type: 'list',
                message: messages.PROJECT_SELECTION_QUESTION,
                choices: ['Bootstrap', 'Tailwind CSS'],
            });
            return projectSubType.type;
        case constants.VUE:
            projectSubType = await inquirer.prompt({
                name: 'type',
                type: 'list',
                message: messages.PROJECT_SELECTION_QUESTION,
                choices: ['Bootstrap', 'Tailwind CSS'],
            });
            return projectSubType.type;
        default:
            return new Promise((resolve, reject) => resolve(''));
    }
}

export default initQuestions;
