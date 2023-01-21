const BASE_URL = 'https://rickandmortyapi.com/api/character';

export async function getCharactersFromAPI(page = BASE_URL) {
    return (await fetch(page)).json();
}

export async function getCharacterFromAPI(id) {
    if (id === undefined) {
        throw new Error('A ID is needed to load a character.');
    }

    return (await fetch(`${BASE_URL}/${id}`)).json();
}

export function getTotalPages(callback) {
    fetch(BASE_URL)
    .then((response) => response.json())
    .then((data) => callback(data.info.pages))
    .catch((error) => console.log(error));
}
