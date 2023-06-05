import { CharactersService } from "../services";
import { mapCharacter } from "../../mappers/mapCharacter";

jest.mock("../../mappers/mapCharacter", () => ({
    mapCharacter: jest.fn(),
}));

describe("CharactersService", () => {
    let charactersAPI;
    let charactersLocalStorage;
    let charactersService;

    beforeEach(() => {
        charactersAPI = {
            get: jest.fn(),
        };
        charactersLocalStorage = {
            get: jest.fn(),
            cache: jest.fn(),
        };
        charactersService = new CharactersService(
            charactersAPI,
            charactersLocalStorage
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Get", () => {
        test("Returns characters from local storage if available.", async () => {
            const page = "https://rickandmortyapi.com/api/character";
            const characters = [
                { name: "rick sanchez" },
                { name: "morty smith" },
            ];

            charactersLocalStorage.get.mockResolvedValue(characters);

            const result = await charactersService.get(page);

            expect(result).toEqual(characters);
            expect(charactersLocalStorage.get).toHaveBeenCalledWith(page);
            expect(charactersAPI.get).not.toHaveBeenCalled();
            expect(charactersLocalStorage.cache).not.toHaveBeenCalled();
        });

        test("Returns characters from API and caches them in local storage if not available.", async () => {
            const page = "https://rickandmortyapi.com/api/character";
            const data = {
                results: [{ name: "character 1" }, { name: "character 2" }],
            };
            const mappedCharacters = [
                { name: "mapped character 1" },
                { name: "mapped character 2" },
            ];

            charactersLocalStorage.get.mockRejectedValueOnce(
                new Error("Characters not found in local storage")
            );
            charactersAPI.get.mockResolvedValue(data);
            mapCharacter.mockImplementation((character) => {
                return { name: `mapped ${character.name}` };
            });
            charactersLocalStorage.cache.mockResolvedValue();

            const result = await charactersService.get(page);

            expect(result).toEqual(mappedCharacters);
            expect(charactersLocalStorage.get).toHaveBeenCalledWith(page);
            expect(charactersAPI.get).toHaveBeenCalledWith(page);
            expect(mapCharacter).toHaveBeenCalledTimes(data.results.length);
            expect(charactersLocalStorage.cache).toHaveBeenCalledWith(
                page,
                mappedCharacters
            );
        });

        test("Throws an error if both local storage and API fail.", async () => {
            const page = "https://rickandmortyapi.com/api/character";

            charactersLocalStorage.get.mockRejectedValueOnce(
                new Error("Characters not found in local storage")
            );
            charactersAPI.get.mockRejectedValueOnce(
                new Error("API request failed")
            );

            await expect(charactersService.get(page)).rejects.toThrowError(
                "API request failed"
            );
            expect(charactersLocalStorage.get).toHaveBeenCalledWith(page);
            expect(charactersAPI.get).toHaveBeenCalledWith(page);
            expect(mapCharacter).not.toHaveBeenCalled();
            expect(charactersLocalStorage.cache).not.toHaveBeenCalled();
        });
    });
});
