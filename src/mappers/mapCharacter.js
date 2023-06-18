import Character from "../entities/character.js";

export function mapCharacter(data) {
    const { id, name, status, species, gender, origin, location, image } = data;

    const character = new Character(
        id,
        name,
        status,
        species,
        gender,
        origin.name,
        location.name,
        image
    );

    return character;
}
