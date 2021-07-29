import { ChildProcess, spawn, SpawnOptions } from 'child_process';
import ora from 'ora';
import chalk from 'chalk';

import MESSAGES from '../constants/messages.cosntants';
import { removeFolder } from './fs.utils';

const packageManagerInit = async (packageManager: string, projectPath: string, projectname: string) => {
    const spinner = ora(MESSAGES.PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS);
    spinner.spinner = 'arrow3';
    spinner.start();
    try {
        if (packageManager.toLowerCase().includes('npm')) {
            const child: ChildProcess = spawn('npm', ['-v']);
            child.stderr!.on('data', () => {
                console.log(chalk.red(MESSAGES.PACKAGE_MANAGER_ERROR));
                process.exit();
            });
            await run('npm install --silent', true, projectPath);
        }
        spinner.succeed(MESSAGES.PACKAGE_MANAGER_INSTALLATION_SUCCEED(projectname));
    } catch (error) {
        spinner.fail();
    }
}

const run = async (command: string, collect = false, cwd: string = process.cwd()): Promise<null | string> => {
    const args: string[] = [command];
    const options: SpawnOptions = {
        cwd,
        stdio: collect ? 'pipe' : 'inherit',
        shell: true,
    };
    return new Promise<null | string>((resolve, reject) => {
        const child: ChildProcess = spawn(command, [...args], options);
        if (collect) {
            child.stdout!.on('data', (data) =>
                resolve(data.toString().replace(/\r\n|\n/, '')),
            );
            child.stderr!.on('data', () => {
                removeFolder(cwd);
            })
        }
        child.on('close', (code) => {
            if (code === 0) {
                resolve(null);
            } else {
                console.error(chalk.red(MESSAGES.RUNNER_EXECUTION_ERROR(`${command}`)));
                reject();
            }
        });
    });
}

export default packageManagerInit;
