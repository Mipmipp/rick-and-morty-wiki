import { getCharactersFromAPI, getCharacterFromAPI } from '../api/api.js';
import { 
    getCharactersFromLocalStorage, getCharacterFromLocalStorage,
    saveCharactersInLocalStorage, saveCharacterInLocalStorage } 
from '../storage/local-storage.js';

export async function getCharacters(page) {
    try {
        return getCharactersFromLocalStorage(page);
    } catch (error) {
        const characters = await getCharactersFromAPI(page);
        saveCharactersInLocalStorage(page, characters);
        return characters;
   }
}

export async function getCharacter(id) {
    if (id === undefined) {
        throw new Error('A ID is needed to load a character.');
    }

    try {
        return getCharacterFromLocalStorage(id);
    } catch (error) {
        const character = await getCharacterFromAPI(id);
        saveCharacterInLocalStorage(id, character);
        return character;
    }
}
