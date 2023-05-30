/**
 * @jest-environment jsdom
 */
import { fireEvent } from "@testing-library/dom";
import {
    createCharacterCard,
    makePagination,
    showCharacter,
    showCharacters,
} from "../ui";
import { getCharacters } from "../../services/services";
import { htmlMock } from "../../__mocks__/htmlMock";
import { listCharactersMock } from "../../__mocks__/listCharactersMock";
import { rickSanchezApiMock } from "../../__mocks__/rickSanchezApiMock";

jest.mock("../../services/services", () => ({
    getCharacters: jest.fn().mockResolvedValue({ results: [] }),
}));

beforeEach(() => {
    document.body.innerHTML = "";
});

describe("showCharacter", () => {
    test("render showCharacter", () => {
        document.body.innerHTML = htmlMock;
        showCharacter(rickSanchezApiMock);

        const $image = document.getElementById("image");
        const $name = document.getElementById("name");
        const $gender = document.getElementById("gender");
        const $specie = document.getElementById("specie");
        const $status = document.getElementById("status");
        const $origin = document.getElementById("origin");
        const $location = document.getElementById("location");

        expect($image.src).toBe(rickSanchezApiMock.image);
        expect($image.alt).toBe(`${rickSanchezApiMock.name} picture`);
        expect($name.innerText).toBe(rickSanchezApiMock.name);
        expect($gender.innerText).toBe(`Gender: ${rickSanchezApiMock.gender}`);
        expect($specie.innerText).toBe(`Specie: ${rickSanchezApiMock.species}`);
        expect($status.innerText).toBe(`Status: ${rickSanchezApiMock.status}`);
        expect($origin.innerText).toBe(
            `Origin: ${rickSanchezApiMock.origin.name}`
        );
        expect($location.innerText).toBe(
            `Location: ${rickSanchezApiMock.location.name}`
        );
    });
});

describe("showCharacters", () => {
    test("Should create one charactersCard per character in the list.", () => {
        document.body.innerHTML = htmlMock;
        const $charactersList = document.querySelector("#characters-list");

        showCharacters(listCharactersMock);

        expect($charactersList.children.length).toBe(listCharactersMock.length);
    });
});

describe("createCharacterCard", () => {
    test("Should render character card with correct data", () => {
        document.body.innerHTML = htmlMock;
        const $charactersList = document.querySelector("#characters-list");
        const $modal = document.querySelector("#modal");
        const $buttonClose = document.querySelector("#btn-close");

        createCharacterCard(
            rickSanchezApiMock,
            $charactersList,
            $modal,
            $buttonClose
        );

        const $column = document.getElementsByClassName("col-6 col-xl-3");
        const $card = document.getElementById(`card-${rickSanchezApiMock.id}`);
        const $cardBody = document.getElementById(
            `card-body-${rickSanchezApiMock.id}`
        );
        const $image = document.getElementById(
            `image-${rickSanchezApiMock.id}`
        );
        const $name = document.getElementById(`name-${rickSanchezApiMock.id}`);

        expect($column).toBeDefined();
        expect($card.title).toBe(rickSanchezApiMock.name);
        expect($cardBody).toBeDefined();
        expect($image.src).toBe(rickSanchezApiMock.image);
        expect($image.alt).toBe(`${rickSanchezApiMock.name} image`);
        expect($name.textContent).toBe(rickSanchezApiMock.name);
    });

    test("click events should be attached to the elements", () => {
        document.body.innerHTML = htmlMock;
        const $charactersList = document.querySelector("#characters-list");
        const $buttonClose = document.querySelector("#btn-close");
        const $modal = {
            close: jest.fn(),
            showModal: jest.fn(),
        };

        createCharacterCard(
            rickSanchezApiMock,
            $charactersList,
            $modal,
            $buttonClose
        );

        const $card = document.getElementById(`card-${rickSanchezApiMock.id}`);
        const showCharacterMock = jest.fn();
        const showModalMock = jest.fn();
        const closeMock = jest.fn();

        $buttonClose.addEventListener("click", () => closeMock());
        $card.addEventListener("click", () =>
            showCharacterMock(rickSanchezApiMock)
        );
        $card.addEventListener("click", () => showModalMock());

        fireEvent.click($card);
        fireEvent.click($buttonClose);

        expect(showCharacterMock).toHaveBeenCalledWith(rickSanchezApiMock);
        expect(showModalMock).toHaveBeenCalledTimes(1);
        expect(closeMock).toHaveBeenCalledTimes(1);
    });
});

describe("makePagination", () => {
    test("Should use next page correctly and update it", () => {
        document.body.innerHTML = htmlMock;
        const $nextPage = document.getElementById("next-page");
        const $actualPage = document.getElementById("actual-page");

        makePagination(3);
        fireEvent.click($nextPage);
        expect($actualPage.innerText).toBe(2);
        expect(getCharacters).toHaveBeenCalledWith(
            "https://rickandmortyapi.com/api/character/?page=2"
        );
    });

    test("Should not use next page if it is the same value as the actual pagee", () => {
        document.body.innerHTML = htmlMock;
        const $nextPage = document.getElementById("next-page");
        const $actualPage = document.getElementById("actual-page");

        makePagination(1);
        fireEvent.click($nextPage);
        expect($nextPage.innerText).toBe(undefined);
    });

    test("Should not use previous page if it is less than 1", () => {
        document.body.innerHTML = htmlMock;
        const $nextPage = document.getElementById("next-page");
        const $previousPage = document.getElementById("previous-page");
        const $actualPage = document.getElementById("actual-page");

        makePagination(5);
        fireEvent.click($nextPage);
        fireEvent.click($nextPage);
        fireEvent.click($nextPage);
        fireEvent.click($previousPage);
        expect($actualPage.innerText).toBe(3);
        expect(getCharacters).toHaveBeenCalledWith(
            "https://rickandmortyapi.com/api/character/?page=3"
        );
    });

    test("Use previous page if it is less than 1", () => {
        document.body.innerHTML = htmlMock;
        const $previousPage = document.getElementById("previous-page");

        makePagination(1);
        fireEvent.click($previousPage);
        expect($previousPage.innerText).toBe(undefined);
    });
});
