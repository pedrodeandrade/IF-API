module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
  preset: 'ts-jest',
};
