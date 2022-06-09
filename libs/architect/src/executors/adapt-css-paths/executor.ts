/**
 * Node.js imports
 */
import * as fs from 'fs/promises';

/**
 * Nx imports
 */
import { ExecutorContext } from '@nrwl/devkit';

/**
 * 3rd-party imports
 */
import * as fg from 'fast-glob';

/**
 * Internal imports
 */
import { AdaptCssPathsExecutorSchema } from './schema';
import * as path from 'path';

export default async function runExecutor(
  options: AdaptCssPathsExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  options.directory = options.directory ?? '';

  const stream = fg.stream(['**/*.css'], {
    cwd: path.join(context.root, context.target.outputs[0], options.directory),
    ignore: ['**/node_modules']
  });
  for await (const entry of stream) {
    const filename: string = path.join(
      context.root,
      context.target.outputs[0],
      options.directory,
      entry as string
    );

    const fileContent: string = await fs.readFile(filename, {
      encoding: 'utf8'
    });

    const replacedContent: string = fileContent.replace(
      /url\(..\/..\/..\/icons\/.+?\/(.+?)\)/g,
      'url(./$1)'
    );

    await fs.writeFile(filename, replacedContent);
  }

  return {
    success: true
  };
}
