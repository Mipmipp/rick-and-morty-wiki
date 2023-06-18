import { mapCharacter } from "../mapCharacter.js";
import Character from "../../entities/character.js";
import { rickSanchezApiMock } from "../../__mocks__/rickSanchezApiMock.js";

test("mapCharacter should correctly map character data.", () => {
    const expectedCharacter = new Character(
        1,
        "Rick Sanchez",
        "Alive",
        "Human",
        "Male",
        "Earth (C-137)",
        "Citadel of Ricks",
        "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    );

    const mappedCharacter = mapCharacter(rickSanchezApiMock);

    expect(mappedCharacter).toEqual(expectedCharacter);
});
