export const htmlMock = `
<body>
<div>
    <header id="header">
        <img src="src/assets/rick-and-morty-picture.png" alt="rick and morty picture">
        <h1>Rick and Morty</h1>
        <h2>Wiki</h2>
    </header>
    <div class="container text-center">
        <div class="row align-items-center" id="characters-list">
        </div>
    </div>
    <dialog id="modal">
        <div class="card" id="character-information">
            <img class="card-img-top" id="image">
            <div class="card-body" id="information">
                <h5 class="card-title" id="name"></h5>
                <p class="card-text" id="gender"></p>
                <p class="card-text" id="specie"></p>
                <p class="card-text" id="status"></p>
                <p class="card-text" id="origin"></p>
                <p class="card-text" id="location"></p>
                <button type="button" class="btn btn-dark" id="btn-close">close</button>
            </div>
        </div>
    </dialog>
    <div class="container text-center">
        <div class="row align-items-center" id="pagination">
            <div class="col-4" style="text-align: end;">
                <button type="button" class="btn btn-success" id="previous-page">Previous</button>
            </div>
            <div class="col-4">
                <button type="button" class="btn btn-secondary" disabled id="actual-page">1</button>
            </div>
            <div class="col-4" style="text-align: start;">
                <button type="button" class="btn btn-success" id="next-page">Next</button>
            </div>
        </div>
    </div>
    <footer id="footer">
        <div>
            <p>Created by Mipmipp</p>
            <a href="https://github.com/Mipmipp">GitHub</a>
            <br>
            <a href="https://www.linkedin.com/in/mipmipp/">Linkedin</a>
            <br>
            <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=imipmipp@gmail.com">Mail</a>
            <br>
            <br>
            <a href="https://rickandmortyapi.com/">Rick and Morty API</a>
        </div>
    </footer>
</div>
</body>
`;
