import ProjectAnswers from '../interfaces/answers.interface';
import constants from '../constants/project.constants';
import initGitRepository from './git.utils';
import generateProjectPath from './path.utils';

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

const generateExpressTemplate = (projectOptions: ProjectAnswers): void => {
    const projectPath = generateProjectPath(projectOptions.projectName);
    
    // copy express template

    // init git
    if (projectOptions.projectGit) initGitRepository(projectPath);
    // install with package manager
}

export default generate;
