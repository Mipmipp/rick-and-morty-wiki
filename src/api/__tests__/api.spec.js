import {
    getCharactersFromAPI,
    getCharacterFromAPI,
    getTotalPages,
} from "../api";

const BASE_URL = "https://rickandmortyapi.com/api/character";

beforeEach(() => {
    global.fetch = jest.fn();
});

describe("getCharacters", () => {
    test("load characters list with default page", () => {
        global.fetch.mockImplementationOnce(
            () =>
                new Promise((resolve) => {
                    const jsonPromise = new Promise((response) => {
                        response({});
                    });
                    resolve({ json: () => jsonPromise });
                })
        );

        getCharactersFromAPI();
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(BASE_URL);
    });

    test("load characters list with page defined by user", () => {
        global.fetch.mockImplementationOnce(
            () =>
                new Promise((resolve) => {
                    const jsonPromise = new Promise((response) => {
                        response({});
                    });
                    resolve({ json: () => jsonPromise });
                })
        );

        getCharactersFromAPI(`${BASE_URL}/?page=7`);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/?page=7`);
    });
});

describe("getCharacter", () => {
    test("load 1 character", () => {
        global.fetch.mockImplementationOnce(
            () =>
                new Promise((resolve) => {
                    const jsonPromise = new Promise((response) => {
                        response({});
                    });
                    resolve({ json: () => jsonPromise });
                })
        );

        getCharacterFromAPI(3);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/3`);
    });

    test("load character with wrong id", () => {
        expect(getCharacterFromAPI()).rejects.toEqual(
            new Error("A ID is needed to load a character.")
        );

        expect(global.fetch).toHaveBeenCalledTimes(0);
    });
});

describe("getTotalPages", () => {
    test("get total pages without problems", async () => {
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                info: {
                    pages: 10,
                },
            }),
        });

        const totalPages = await getTotalPages();
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(totalPages).toBe(10);
    });

    test("error getting total pages", async () => {
        const error = new Error("API Error");
        global.fetch.mockRejectedValue(error);

        console.log = jest.fn();

        await getTotalPages();

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(error);
    });
});
