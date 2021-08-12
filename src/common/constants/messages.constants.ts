import chalk from 'chalk';

const messages = {
    PROJECT_NAME_QUESTION: 'What is the project name? 🤔',
    PROJECT_SELECTION_QUESTION: 'Which project would you like to generate to?',
    PROJECT_LIBRARY_SELECTION_QUESTION: 'Which project would you like to add the library to?',
    PROJECT_PRESET_QUESTION: 'Select a preset for the project? 📦',
    PROJECT_PRESET_SELECT: 'Check the features needed for your project',
    PROJECT_INFORMATION_START: `⚡  We will scaffold your app in a few seconds..`,
    PROJECT_FOLDER_EXSIST: 'There is a folder with that name ❌, select other project name',
    PROJECT_FOLDER_IN_PROGRESS: `Generating project folder... 📁`,
    PROJECT_FOLDER_SUCCESS: `Project folder generated! 📁`,
    PROJECT_FOLDER_ERROR: `Error generating project folder`,
    RUNNER_EXECUTION_ERROR: (command: string) => `\nFailed to execute command: ${command}`,
    PACKAGE_MANAGER_QUESTION: `Which package manager would you 💙 to use?`,
    PACKAGE_MANAGER_ERROR: 'Package manager selected is not installed',
    PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS: `Project dependencies installation in progress... 🪄`,
    TEMPLATE_INSTALLATION_IN_PROCESS: 'Generating project files... 📝',
    TEMPLATE_INSTALLATION_SUCCESS: 'Project files generated! 📝',
    TEMPLATE_INSTALLATION_ERROR: 'Error generating project files',
    GIT_QUESTION: 'Would you like to use git? 🗃️',
    GIT_INITIALIZATION_IN_PROGRESS: 'Initializing git repository',
    GIT_INITIALIZATION_SUCCESS: 'Git repository has been initialized',
    GIT_INITIALIZATION_ERROR: 'Git repository has not been initialized',
    PACKAGE_MANAGER_INSTALLATION_SUCCEED: (name: string) =>
        name !== '.' ? `Successfully created project ${chalk.green(name)} 🚀` : `Successfully created a new project 🚀`,
    GET_STARTED_INFORMATION: `👉  Get started with the following commands:`,
    CHANGE_DIR_COMMAND: (name: string) => `$ cd ${name}`,
    START_COMMAND: (name: string) => `$ ${name} run start`,
    PACKAGE_MANAGER_INSTALLATION_FAILED: `🙀  Packages installation failed, see above`,
    LIBRARY_INSTALLATION_FAILED_NO_LIBRARY: 'No library found.',
    LIBRARY_INSTALLATION_STARTS: 'Starting library setup...',
    EXPRESS_TYPESCRIPT_PROJECT_SUCCESS: 'Express TypeScript project generated! 🎉'
};

export default messages;
