module.exports = {
    verbose: true,
    collectCoverage: true,
    clearMocks: true,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    coverageDirectory: "coverage",
    transform: {
      '^.+\\.[jt]sx?$': `<rootDir>/jest-preprocess.js`,
    },
    collectCoverageFrom: [
      '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
      '!<rootDir>/node_modules',
      '!<rootDir>/public',
    ],
    testMatch: ['**/*.test.{js,ts,tsx}'],
    roots: ['<rootDir>/__mocks__', '<rootDir>/__tests__', '<rootDir>/src'],
    modulePaths: ['<rootDir>/src'],
    moduleDirectories: ['src', 'node_modules'],
    testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
    moduleNameMapper: {
      '.+\\.(css|style|less|sass|scss)$': `identity-obj-proxy`,
    },
    testEnvironment: 'jsdom',
  };