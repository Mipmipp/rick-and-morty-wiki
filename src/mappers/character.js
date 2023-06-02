import Character from "../entities/character";

export function mapCharacter(data) {
    const { id, name, status, specie, gender, origin, location, image } = data;

    return new Character(
        id,
        name,
        status,
        specie,
        gender,
        origin.name,
        location.name,
        image
    );
}
