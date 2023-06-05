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
import { mapCharacter } from "../../mappers/mapCharacter";
import { htmlMock } from "../../__mocks__/htmlMock";
import { listCharactersMock } from "../../__mocks__/listCharactersMock";
import { rickSanchezApiMock } from "../../__mocks__/rickSanchezApiMock";

jest.mock("../../services/services");

beforeEach(() => {
    document.body.innerHTML = "";
});

describe("showCharacter", () => {
    test("Should render character details correctly.", () => {
        document.body.innerHTML = htmlMock;
        const mappedCharacter = mapCharacter(rickSanchezApiMock);
        showCharacter(mappedCharacter);

        const $image = document.getElementById("image");
        const $name = document.getElementById("name");
        const $gender = document.getElementById("gender");
        const $specie = document.getElementById("specie");
        const $status = document.getElementById("status");
        const $origin = document.getElementById("origin");
        const $location = document.getElementById("location");

        expect($image.src).toBe(mappedCharacter.image);
        expect($image.alt).toBe(`${mappedCharacter.name} picture`);
        expect($name.innerText).toBe(mappedCharacter.name);
        expect($gender.innerText).toBe(`Gender: ${mappedCharacter.gender}`);
        expect($specie.innerText).toBe(`Specie: ${mappedCharacter.specie}`);
        expect($status.innerText).toBe(`Status: ${mappedCharacter.status}`);
        expect($origin.innerText).toBe(`Origin: ${mappedCharacter.origin}`);
        expect($location.innerText).toBe(
            `Location: ${mappedCharacter.location}`
        );
    });
});

describe("showCharacters", () => {
    test("Should create a character card for each character in the list.", () => {
        document.body.innerHTML = htmlMock;
        const $charactersList = document.querySelector("#characters-list");

        showCharacters(listCharactersMock);

        expect($charactersList.children.length).toBe(listCharactersMock.length);
    });
});

describe("createCharacterCard", () => {
    test("Should render character card with correct data.", () => {
        document.body.innerHTML = htmlMock;
        const mappedCharacter = mapCharacter(rickSanchezApiMock);
        const $charactersList = document.querySelector("#characters-list");
        const $modal = document.querySelector("#modal");
        const $buttonClose = document.querySelector("#btn-close");

        createCharacterCard(
            mappedCharacter,
            $charactersList,
            $modal,
            $buttonClose
        );

        const $column = document.getElementsByClassName("col-6 col-xl-3");
        const $card = document.getElementById(`card-${mappedCharacter.id}`);
        const $cardBody = document.getElementById(
            `card-body-${mappedCharacter.id}`
        );
        const $image = document.getElementById(`image-${mappedCharacter.id}`);
        const $name = document.getElementById(`name-${mappedCharacter.id}`);

        expect($column).toBeDefined();
        expect($card.title).toBe(mappedCharacter.name);
        expect($cardBody).toBeDefined();
        expect($image.src).toBe(mappedCharacter.image);
        expect($image.alt).toBe(`${mappedCharacter.name} image`);
        expect($name.textContent).toBe(mappedCharacter.name);
    });

    test("Should attach click events to the elements.", () => {
        document.body.innerHTML = htmlMock;
        const mappedCharacter = mapCharacter(rickSanchezApiMock);
        const $charactersList = document.querySelector("#characters-list");
        const $buttonClose = document.querySelector("#btn-close");
        const $modal = {
            close: jest.fn(),
            showModal: jest.fn(),
        };

        createCharacterCard(
            mappedCharacter,
            $charactersList,
            $modal,
            $buttonClose
        );

        const $card = document.getElementById(`card-${mappedCharacter.id}`);
        const showCharacterMock = jest.fn();
        const showModalMock = jest.fn();
        const closeMock = jest.fn();

        $buttonClose.addEventListener("click", () => closeMock());
        $card.addEventListener("click", () =>
            showCharacterMock(mappedCharacter)
        );
        $card.addEventListener("click", () => showModalMock());

        fireEvent.click($card);
        fireEvent.click($buttonClose);

        expect(showCharacterMock).toHaveBeenCalledWith(mappedCharacter);
        expect(showModalMock).toHaveBeenCalledTimes(1);
        expect(closeMock).toHaveBeenCalledTimes(1);
    });
});

describe("makePagination", () => {
    test("Should use next page correctly and update it.", async () => {
        document.body.innerHTML = htmlMock;
        const $nextPage = document.getElementById("next-page");
        const $actualPage = document.getElementById("actual-page");
        const charactersServiceMock = {
            get: jest.fn().mockResolvedValue({ results: [] }),
        };

        makePagination(3, charactersServiceMock, jest.fn());
        fireEvent.click($nextPage);

        expect($actualPage.innerText).toBe(2);
        expect(charactersServiceMock.get).toHaveBeenCalledWith(
            "https://rickandmortyapi.com/api/character/?page=2"
        );
    });

    test("Should not use next page if it is the same value as the actual page.", async () => {
        document.body.innerHTML = htmlMock;
        const $nextPage = document.getElementById("next-page");
        const callbackMock = jest.fn();

        makePagination(1, jest.fn(), callbackMock);
        fireEvent.click($nextPage);

        expect($nextPage.innerText).toBe(undefined);
        expect(callbackMock).not.toHaveBeenCalled();
    });

    test("Should use previous page correctly and update it.", async () => {
        document.body.innerHTML = htmlMock;
        const $nextPage = document.getElementById("next-page");
        const $previousPage = document.getElementById("previous-page");
        const $actualPage = document.getElementById("actual-page");
        const charactersServiceMock = {
            get: jest.fn().mockResolvedValue({ results: [] }),
        };

        makePagination(5, charactersServiceMock, jest.fn());
        fireEvent.click($nextPage);
        fireEvent.click($nextPage);
        fireEvent.click($nextPage);
        fireEvent.click($previousPage);

        expect($actualPage.innerText).toBe(3);
        expect(charactersServiceMock.get).toHaveBeenCalledWith(
            "https://rickandmortyapi.com/api/character/?page=3"
        );
    });

    test("Should not use previous page if it the first page.", async () => {
        document.body.innerHTML = htmlMock;
        const $previousPage = document.getElementById("previous-page");
        const callbackMock = jest.fn();

        makePagination(1, jest.fn(), callbackMock);
        fireEvent.click($previousPage);

        expect($previousPage.innerText).toBe(undefined);
        expect(callbackMock).not.toHaveBeenCalled();
    });
});
