import { getCharactersFromAPI, getTotalPages } from './api/api.js';
import { makePagination, showCharacters } from './ui/ui.js';

async function initialize() {
    const firstCharactersScreen = await (getCharactersFromAPI());
    getTotalPages(makePagination);
    showCharacters(firstCharactersScreen.results);
}

initialize();
