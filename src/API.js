const URL = 'https://rickandmortyapi.com/api/character';

export function getCharacters(callback, page = URL) {
    fetch(page)
    .then((response) => response.json())
    .then((data) => callback(data.results))
    .catch((error) => console.log(error));
}

export function getCharacter(callback, id) {
    fetch(`${URL}/${id}`)
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((error) => console.log(error));
}

export function getTotalPages(callback) {
    fetch(URL)
    .then((response) => response.json())
    .then((data) => callback(data.info.pages))
    .catch((error) => console.log(error));
}
