import chalk from 'chalk';
import figlet from 'figlet';

const init = (title: string) => {
    console.info(chalk.bold.cyan(figlet.textSync(title, {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    })));
};

export default init;
