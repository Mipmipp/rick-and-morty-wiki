import { getCharacters, getCharacter } from '../services/services.js';

export function showCharacter(character) {
    const $image = document.getElementById('image');
    const $name = document.getElementById('name');
    const $gender = document.getElementById('gender');
    const $specie = document.getElementById('specie');
    const $status = document.getElementById('status');
    const $origin = document.getElementById('origin');
    const $location = document.getElementById('location');

    $image.src = character.image;
    $image.alt = `${character.name} picture`;
    $name.innerText = character.name;
    $gender.innerText = `Gender: ${character.gender}`;
    $specie.innerText = `Specie: ${character.species}`;
    $status.innerText = `Status: ${character.status}`;
    $origin.innerText = `Origin: ${character.origin.name}`;
    $location.innerText = `Location: ${character.location.name}`;
}

export function showCharacters(characters) {
    const $charactersList = document.querySelector('#characters-list');
    const $modal = document.querySelector('#modal');
    const $buttonClose = document.querySelector('#btn-close');
    $charactersList.innerHTML = '';

    characters.forEach((character) => {
        const $column = document.createElement('div');
        const $card = document.createElement('div');
        const $cardBody = document.createElement('div');
        const $name = document.createElement('p');
        const $image = document.createElement('img');

        $column.className = 'col-6 col-xl-3';
        $card.className = 'card';
        $card.title = character.name;
        $card.addEventListener('click', async () => showCharacter(await getCharacter(character.id).results));
        $card.addEventListener('click', () => $modal.showModal());
        $buttonClose.addEventListener('click', () => $modal.close());
        $cardBody.className = 'card-body';
        $image.src = character.image;
        $image.alt = `${character.name} image`;
        $name.className = 'card-text';
        $name.textContent = character.name;

        $card.appendChild($image);
        $card.appendChild($cardBody);
        $cardBody.appendChild($name);
        $column.appendChild($card);
        $charactersList.appendChild($column);
    });
}

export function makePagination(totalPages) {
    const $previousPage = document.getElementById('previous-page');
    const $actualPage = document.getElementById('actual-page');
    const $nextPage = document.getElementById('next-page');
    let actualPage = 1;
    let page = `https://rickandmortyapi.com/api/character/?page=${actualPage}`;

    $previousPage.addEventListener('click', async () => {
        if (actualPage > 1) {
            actualPage--;
            $actualPage.innerText = actualPage;
            showCharacters(await getCharacters(page).results);
        } else {
            return;
        }
    });

    $nextPage.addEventListener('click', async () => {
        if (actualPage < totalPages) {
            actualPage++;
            $actualPage.innerText = actualPage;       
            showCharacters(await getCharacters(page).results);
        } else {
            return;
        }
    });
}
