import Character from "../character.js";

test("Character should be created with the correct properties.", () => {
    const id = 1;
    const name = "Rick Sanchez";
    const status = "Alive";
    const specie = "Human";
    const gender = "Male";
    const origin = "Earth (C-137)";
    const location = "Citadel of Ricks";
    const image = "https://rickandmortyapi.com/api/character/avatar/1.jpeg";

    const character = new Character(
        id,
        name,
        status,
        specie,
        gender,
        origin,
        location,
        image
    );

    expect(character.id).toEqual(id);
    expect(character.name).toEqual(name);
    expect(character.status).toEqual(status);
    expect(character.specie).toEqual(specie);
    expect(character.gender).toEqual(gender);
    expect(character.origin).toEqual(origin);
    expect(character.location).toEqual(location);
    expect(character.image).toEqual(image);
});
