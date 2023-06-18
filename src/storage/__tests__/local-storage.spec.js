import "jest-localstorage-mock";
import { CharactersLocalStorage } from "../local-storage";

const page = "https://rickandmortyapi.com/api/character";

const characters = [
    {
        name: "rick sanchez",
    },
    {
        name: "morty smith",
    },
];

beforeEach(() => {
    localStorage.clear();
});

describe("CharactersLocalStorage - get method", () => {
    test("Successfully loads characters with get method.", async () => {
        const charactersLocalStorage = new CharactersLocalStorage();
        charactersLocalStorage.cache(page, characters);
        const retrievedCharacters = await charactersLocalStorage.get(page);

        expect(retrievedCharacters).toEqual(characters);
    });

    test("Throws an error when characters are not saved in localStorage.", async () => {
        const charactersLocalStorage = new CharactersLocalStorage();

        try {
            await charactersLocalStorage.get(page);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe(
                `There isn't characters saved in ${page} (localStorage)`
            );
        }
    });
});

describe("CharactersLocalStorage - cache method", () => {
    test("successfully saves characters to localStorage.", async () => {
        const charactersLocalStorage = new CharactersLocalStorage();
        charactersLocalStorage.cache(page, characters);

        expect(await charactersLocalStorage.get(page)).toEqual(characters);
    });

    test("throws an error when the page is invalid.", () => {
        const invalidPage = undefined;
        const charactersLocalStorage = new CharactersLocalStorage();

        expect(() => {
            charactersLocalStorage.cache(invalidPage, characters);
        }).toThrowError("A URL of the page and characters object are needed.");
    });

    test("throws an error when the characters are invalid.", () => {
        const invalidCharacters = "rick sanchez, morty smith";
        const charactersLocalStorage = new CharactersLocalStorage();

        expect(() => {
            charactersLocalStorage.cache(page, invalidCharacters);
        }).toThrowError("A URL of the page and characters object are needed.");
    });
});
