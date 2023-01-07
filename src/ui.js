import { getCharacters, getCharacter } from './API.js';

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

