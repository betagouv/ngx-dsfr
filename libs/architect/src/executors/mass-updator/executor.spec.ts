/**
 * Internal imports
 */
import { MassUpdatorSchema } from './schema';
import executor from './executor';

/**
 * TypeScript entities and constants
 */
const options: MassUpdatorSchema = {
  directory: '.',
  glob: '',
  searchValue: '',
  flags: '',
  replacement: ''
};

describe('Mass Updator Executor', () => {
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
