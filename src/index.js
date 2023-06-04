import { CharactersAPI, getTotalPages } from "./api/api.js";
import { CharactersLocalStorage } from "./storage/local-storage.js";
import { CharactersService } from "./services/services.js";
import { makePagination, showCharacters } from "./ui/ui.js";

const defaultPage = "https://rickandmortyapi.com/api/character";

const charactersService = new CharactersService(
    new CharactersAPI(),
    new CharactersLocalStorage(window.localStorage)
);

async function initialize() {
    const initialCharacters = await charactersService.get(defaultPage);
    const totalPages = await getTotalPages();
    showCharacters(initialCharacters);
    makePagination(totalPages, charactersService);
}

initialize();
