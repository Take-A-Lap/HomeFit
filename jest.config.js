module.exports = {
    "preset": "jest-preset-angular",
    "setupTestFrameworkScriptFile": "<rootDir>/my-app/src/setup-jest.ts",
    "transform": {
        "^.+\\.(ts|html)$": "<rootDir>/node_modules/jest-preset-angular/preprocessor.js",
        "^.+\\.js$": "babel-jest"
    },
    "transformIgnorePatterns": [
        "node_modules/(?!(jest-test))"
    ],
    "globals": {
    "ts-jest": {
        "tsConfigFile": "my-app/src/tsconfig.spec.json",
        "useBabelrc": true
    },
    "__TRANSFORM_HTML__": true
    }
}