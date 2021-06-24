import init from './common/utils/init.utils';
import questions from './common/utils/question.utils';
import generate from './common/utils/cli.utils';

const bootstrap = async () => {
    init('VIRA-CLI');
    const answers = await questions();
    generate(answers);
}

export default bootstrap;
