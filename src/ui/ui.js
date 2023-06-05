export function showCharacter(character) {
    const $image = document.getElementById("image");
    const $name = document.getElementById("name");
    const $gender = document.getElementById("gender");
    const $specie = document.getElementById("specie");
    const $status = document.getElementById("status");
    const $origin = document.getElementById("origin");
    const $location = document.getElementById("location");

    $image.src = character.image;
    $image.alt = `${character.name} picture`;
    $name.innerText = character.name;
    $gender.innerText = `Gender: ${character.gender}`;
    $specie.innerText = `Specie: ${character.specie}`;
    $status.innerText = `Status: ${character.status}`;
    $origin.innerText = `Origin: ${character.origin}`;
    $location.innerText = `Location: ${character.location}`;
}

export async function showCharacters(characters) {
    const $charactersList = document.querySelector("#characters-list");
    const $modal = document.querySelector("#modal");
    const $buttonClose = document.querySelector("#btn-close");
    $charactersList.innerHTML = "";

    characters.forEach(async (character) => {
        createCharacterCard(character, $charactersList, $modal, $buttonClose);
    });
}

export function createCharacterCard(
    character,
    $charactersList,
    $modal,
    $buttonClose
) {
    const $column = document.createElement("div");
    const $card = document.createElement("div");
    const $cardBody = document.createElement("div");
    const $name = document.createElement("p");
    const $image = document.createElement("img");

    $column.className = "col-6 col-xl-3";
    $card.className = "card";
    $card.title = character.name;
    $card.id = `card-${character.id}`;
    $cardBody.className = "card-body";
    $cardBody.id = `card-body-${character.id}`;
    $image.id = `image-${character.id}`;
    $image.src = character.image;
    $image.alt = `${character.name} image`;
    $name.className = "card-text";
    $name.textContent = character.name;
    $name.id = `name-${character.id}`;

    $buttonClose.addEventListener("click", () => $modal.close());
    $card.addEventListener("click", () => showCharacter(character));
    $card.addEventListener("click", () => $modal.showModal());

    $card.appendChild($image);
    $card.appendChild($cardBody);
    $cardBody.appendChild($name);
    $column.appendChild($card);
    $charactersList.appendChild($column);
}

export function makePagination(totalPages, charactersService, callback) {
    const $previousPage = document.getElementById("previous-page");
    const $actualPage = document.getElementById("actual-page");
    const $nextPage = document.getElementById("next-page");
    let actualPage = 1;

    $previousPage.addEventListener("click", async () => {
        if (actualPage > 1) {
            actualPage--;
            $actualPage.innerText = actualPage;
            let characters = await charactersService.get(
                `https://rickandmortyapi.com/api/character/?page=${actualPage}`
            );
            callback(characters);
        } else {
            return;
        }
    });

    $nextPage.addEventListener("click", async () => {
        if (actualPage < totalPages) {
            actualPage++;
            $actualPage.innerText = actualPage;
            let characters = await charactersService.get(
                `https://rickandmortyapi.com/api/character/?page=${actualPage}`
            );
            callback(characters);
        } else {
            return;
        }
    });
}
