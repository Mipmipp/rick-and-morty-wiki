import "jest-localstorage-mock";
import {
    getCharactersFromLocalStorage,
    getCharacterFromLocalStorage,
    saveCharactersInLocalStorage,
    saveCharacterInLocalStorage,
} from "../local-storage";

const page = "https://rickandmortyapi.com/api/character";
const characters = [
    {
        name: "rick sanchez",
    },
    {
        name: "morty smith",
    },
];
const character = [
    {
        id: "1",
    },
    {
        name: "rick sanchez",
    },
];

beforeEach(() => {
    localStorage.clear();
});

describe("getCharactersFromLocalStorage", () => {
    test("successfully load characters from localStorage", () => {
        saveCharactersInLocalStorage(page, characters);
        const retrievedCharacters = getCharactersFromLocalStorage(page);
        expect(retrievedCharacters).toEqual(characters);
    });

    test("throws error when characters aren't saved in localStorage", () => {
        expect(() => {
            getCharactersFromLocalStorage(page);
        }).toThrowError(
            `There isn't characters saved in ${page} (localStorage)`
        );
    });
});

describe("geCharacterFromLocalStorage", () => {
    test("successfully load character from localStorage", () => {
        saveCharacterInLocalStorage("1", character);
        const retrievedCharacter = getCharactersFromLocalStorage("1");
        expect(retrievedCharacter).toEqual(character);
    });

    test("throws error when character isn't saved in localStorage", () => {
        expect(() => {
            getCharacterFromLocalStorage("1");
        }).toThrowError(
            `There isn't a character saved with ID1 (localStorage)`
        );
    });
});

describe("saveCharactersInLocalStorage", () => {
    test("successfully saves characters to localStorage", () => {
        saveCharactersInLocalStorage(page, characters);
        expect(getCharactersFromLocalStorage(page)).toEqual(characters);
    });

    test("throws error when page is invalid", () => {
        const invalidPage = undefined;
        expect(() => {
            saveCharactersInLocalStorage(invalidPage, characters);
        }).toThrowError("A URL of the page and characters object are needed.");
    });

    test("throws error when characters are invalid", () => {
        const invalidCharacters = "rick sanchez, morty smith";
        expect(() => {
            saveCharactersInLocalStorage(page, invalidCharacters);
        }).toThrowError("A URL of the page and characters object are needed.");
    });
});

describe("saveCharacterInLocalStorage", () => {
    test("successfully saves character to localStorage", () => {
        saveCharacterInLocalStorage("1", character);
        expect(getCharacterFromLocalStorage("1")).toEqual(character);
    });

    test("throws error when id is missing", () => {
        expect(() => {
            saveCharacterInLocalStorage();
        }).toThrowError("An ID and character object are needed.");
    });

    test("throws error when character is invalid", () => {
        const invalidCharacter = "rick sanchez";
        expect(() => {
            saveCharacterInLocalStorage("1", invalidCharacter);
        }).toThrowError("An ID and character object are needed");
    });
});
