export class CharactersLocalStorage {
    async get(page) {
        const characters = JSON.parse(localStorage.getItem(page));

        if (characters === null) {
            throw new Error(
                `There isn't characters saved in ${page} (localStorage)`
            );
        }

        return characters;
    }

    cache(page, characters) {
        if (page === undefined || typeof characters !== "object") {
            throw new Error(
                "A URL of the page and characters object are needed."
            );
        }

        localStorage.setItem(page, JSON.stringify(characters));
    }
}
