export async function getCharacterMock(id) {
    return {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: {
            name: "Earth (C-137)",
            url: "https://rickandmortyapi.com/api/location/1",
        },
        location: {
            name: "Citadel of Ricks",
            url: "https://rickandmortyapi.com/api/location/3",
        },
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        episodes: [
            "https://rickandmortyapi.com/api/episode/1",
            "https://rickandmortyapi.com/api/episode/2",
            "https://rickandmortyapi.com/api/episode/3",
        ],
        url: "https://rickandmortyapi.com/api/character/1",
        created: "2017-11-04T18:48:46.250Z",
    };
}
