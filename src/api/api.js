const BASE_URL = "https://rickandmortyapi.com/api/character";

export class CharactersAPI {
    async get(page) {
        return (await fetch(page)).json();
    }
}

export function getTotalPages() {
    return fetch(BASE_URL)
        .then((response) => response.json())
        .then((data) => data.info.pages)
        .catch((error) => console.log(error));
}
