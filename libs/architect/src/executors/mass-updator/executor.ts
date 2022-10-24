/**
 * Node.js imports
 */
import * as fs from 'fs/promises';
import * as path from 'path';

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
import { MassUpdatorSchema } from './schema';

export default async function runExecutor(
  options: MassUpdatorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const stream = fg.stream([options.glob], {
    cwd: path.join(context.root, context.target.outputs[0], options.directory),
    ignore: ['**/node_modules']
  });

  for await (const entry of stream) {
    const filePath: string = path.join(
      context.root,
      context.target.outputs[0],
      options.directory,
      entry as string
    );

    const fileContent: string = await fs.readFile(filePath, {
      encoding: 'utf8'
    });

    const searchValues: string[] =
      typeof options.searchValues === 'string'
        ? [options.searchValues]
        : options.searchValues;
    const replacements: string[] =
      typeof options.replacements === 'string'
        ? [options.replacements]
        : options.replacements;
    let replacedContent: string = '';
    for (let i = 0; i < searchValues.length; i++) {
      replacedContent = fileContent.replace(
        new RegExp(searchValues[i], options.flags),
        replacements[i]
      );
    }

    if (options.rewrite) {
      await fs.writeFile(filePath, replacedContent);
    } else {
      const extension: string = (entry as string).split('.').pop();
      const suffixedFilename: string = (entry as string).replace(
        extension,
        options.suffix + '.' + extension
      );
      const duplicateFilePath: string = path.join(
        context.root,
        context.target.outputs[0],
        options.directory,
        suffixedFilename
      );

      await fs.writeFile(duplicateFilePath, replacedContent);
    }
  }

  return {
    success: true
  };
}
