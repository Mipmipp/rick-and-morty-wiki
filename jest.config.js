module.exports = {
    testEnvironment: "node",
    collectCoverage: true,
    coverageReporters: ["text", "html"],
    setupFiles: ["jest-localstorage-mock"],
};
