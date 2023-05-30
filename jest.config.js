module.exports = {
    testEnvironment: "jsdom",
    collectCoverage: true,
    coverageReporters: ["text", "html"],
    setupFiles: ["jest-localstorage-mock"],
};
