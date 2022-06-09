/**
 * Internal imports
 */
import { AdaptCssPathsExecutorSchema } from './schema';
import executor from './executor';

const options: AdaptCssPathsExecutorSchema = {
  directory: '.'
};

describe('Adapt CSS Paths Executor', () => {
  it('can run', async () => {
    const output = await executor(options, {
      cwd: '',
      isVerbose: false,
      root: '',
      workspace: undefined
    });
    expect(output.success).toBe(true);
  });
});
