import { getCharacters, getTotalPages } from './API.js';
import { makePagination, showCharacters } from './ui.js';

 function initialize() {
    getTotalPages(makePagination);
    getCharacters(showCharacters);
}

initialize();
