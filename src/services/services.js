import { mapCharacter } from "../mappers/character";

export class CharactersService {
    constructor(charactersAPI, charactersLocalStorage) {
        this.api = charactersAPI;
        this.localStorage = charactersLocalStorage;
    }

    async get(page) {
        try {
            return await this.localStorage.get(page);
        } catch (error) {
            const data = await this.api.get(page);
            const characters = data.results.map(mapCharacter);
            this.localStorage.cache(page, characters);
            return characters;
        }
    }
}
