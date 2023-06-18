import { CharactersAPI, getTotalPages } from "../api";

const BASE_URL = "https://rickandmortyapi.com/api/character";

beforeEach(() => {
    global.fetch = jest.fn();
});

const mockFetch = () =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    });

describe("CharactersAPI", () => {
    test("Get characters from API.", async () => {
        global.fetch.mockImplementationOnce(mockFetch);

        const charactersAPI = new CharactersAPI();
        await charactersAPI.get(BASE_URL);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(BASE_URL);
    });

    test("Get characters from API with user-defined page.", async () => {
        global.fetch.mockImplementationOnce(mockFetch);

        const charactersAPI = new CharactersAPI();
        await charactersAPI.get(`${BASE_URL}/?page=7`);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/?page=7`);
    });
});

describe("getTotalPages", () => {
    test("Successfully retrieves total pages.", async () => {
        const apiResponse = { info: { pages: 10 } };
        global.fetch.mockResolvedValue({
            json: () => Promise.resolve(apiResponse),
        });

        const totalPages = await getTotalPages();
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(totalPages).toBe(10);
    });

    test("Throws error when retrieving total pages.", async () => {
        const error = new Error("API Error");
        global.fetch.mockRejectedValue(error);

        console.log = jest.fn();

        await getTotalPages();

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(error);
    });
});
