export function getCharactersFromLocalStorage(page) {
    const characters = JSON.parse(localStorage.getItem(page));
    if (characters === null) {
        throw new Error(`There isn't characters saved in ${page} (localStorage)`)
    }

    return characters;
}

export function getCharacterFromLocalStorage(id) {
    const character = JSON.parse(localStorage.getItem(id));
    if (character === null) {
        throw new Error(`There isn't a character saved with ID${id} (localStorage)`);
    }

    return character;
}

export function saveCharactersInLocalStorage(page, characters) {
    if (page === undefined || typeof characters !== 'object') {
        throw new Error('A URL of the page and characters object are needed.');
    }

    localStorage.setItem(page, JSON.stringify(characters));
}

export function saveCharacterInLocalStorage(id, character) {
    if (id === undefined || typeof character !== 'object') {
        throw new Error('An ID and character object are needed.');
    }

    localStorage.setItem(id, JSON.stringify(character));
}
