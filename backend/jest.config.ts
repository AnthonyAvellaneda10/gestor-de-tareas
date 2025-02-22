export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.test.ts"], // Solo archivos que terminen en .test.ts
    moduleFileExtensions: ["ts", "js", "json"],
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
};