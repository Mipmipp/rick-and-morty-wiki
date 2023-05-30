import "jest-localstorage-mock";
import {
    getCharacterFromLocalStorage,
    getCharactersFromLocalStorage,
    saveCharacterInLocalStorage,
    saveCharactersInLocalStorage,
} from "../../storage/local-storage";
import { getCharacter, getCharacters } from "../services";
import { getCharactersFromAPI, getCharacterFromAPI } from "../../api/api";

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

jest.mock("../../api/api", () => ({
    getCharactersFromAPI: jest.fn(),
    getCharacterFromAPI: jest.fn(),
}));

beforeEach(() => {
    localStorage.clear();
});

describe("getCharacters", () => {
    test("loads characters from localStorage", async () => {
        saveCharactersInLocalStorage(page, characters);
        const retrievedCharacters = await getCharacters(page);
        expect(retrievedCharacters).toEqual(characters);
        expect(async () => await getCharacters(page)).not.toThrow();
    });

    test("loads characters from API and then saves characters to localStorage", async () => {
        getCharactersFromAPI.mockResolvedValueOnce(characters);
        const retrievedCharacters = await getCharacters(page);
        expect(retrievedCharacters).toEqual(characters);

        const charactersOnLocalStorage = getCharactersFromLocalStorage(page);
        expect(charactersOnLocalStorage).toEqual(characters);
    });
});

describe("getCharacter", () => {
    test("throws error when ID is missing", async () => {
        expect(getCharacter()).rejects.toEqual(
            new Error("A ID is needed to load a character.")
        );
    });

    test("loads a single character from localStorage", async () => {
        saveCharacterInLocalStorage("1", character);
        const retrievedCharacter = await getCharacter("1");
        expect(retrievedCharacter).toEqual(character);
        expect(async () => await getCharacter("1")).not.toThrow();
    });

    test("loads a single character from API and then saves it to localStorage", async () => {
        getCharacterFromAPI.mockResolvedValueOnce(character);
        const retrievedCharacter = await getCharacter("1");
        expect(retrievedCharacter).toEqual(character);

        const characterOnLocalStorage = getCharacterFromLocalStorage("1");
        expect(characterOnLocalStorage).toEqual(character);
    });
});
