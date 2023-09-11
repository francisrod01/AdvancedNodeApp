/** @type {import('ts-jest').JestConfigWithTsJest} */
// const { defaults } = require('jest-config');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 120000,
  setupFilesAfterEnv: ['./__tests__/jest.setup.js'],
  testPathIgnorePatterns: [
    './__tests__/factories/',
    './__tests__/helpers/',
    './__tests__/jest.setup.js'
  ],
  verbose: true,
  // detectOpenHandles: true,
  // collectCoverage: true,
  // forceExit: true,
  moduleDirectories: ["node_modules", "src"]
};
