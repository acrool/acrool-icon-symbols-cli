module.exports = {
    // coverageDirectory: "coverage",
    preset: 'ts-jest',
    testEnvironment: "node",
    roots: ['<rootDir>/src'],
    testRegex: "(/__tests__/.*(\\.|/)(test|spec))\\.ts?$",
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};
