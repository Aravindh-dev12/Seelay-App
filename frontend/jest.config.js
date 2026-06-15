module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^react-native$': '<rootDir>/__mocks__/react-native.js',
    '^expo-(.*)$': '<rootDir>/__mocks__/expo-$1.js',
    '^@expo/vector-icons$': '<rootDir>/__mocks__/vector-icons.js',
    '^react-native-reanimated$': '<rootDir>/__mocks__/react-native-reanimated.js',
    '^react-native-gesture-handler$': '<rootDir>/__mocks__/react-native-gesture-handler.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((react-native.*)|@react-native|@react-navigation|expo.*|@expo.*|@testing-library))',
  ],
  testMatch: ['**/*.test.ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
