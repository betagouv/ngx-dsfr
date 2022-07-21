/* eslint-disable */
import { pathsToModuleNameMapper } from 'ts-jest';

export default {
  displayName: 'ngx-dsfr',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$'
    }
  },
  coverageDirectory: '../../coverage/libs/ngx-dsfr',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular'
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment'
  ],
  moduleNameMapper: pathsToModuleNameMapper({
    '@betagouv/ngx-dsfr': ['./src/index.ts'],
    '@betagouv/ngx-dsfr/testing': ['./src/lib/testing/index.ts']
  })
};
