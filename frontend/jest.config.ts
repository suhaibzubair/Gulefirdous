// jest.config.ts

export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$': '<rootDir>/src/test/_mocks_/fileMock.js',
        '\\.(css|less|scss|sass)$': '<rootDir>/src/test/styleMock.ts',
    },
}