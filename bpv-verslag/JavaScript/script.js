function addFrontPage(soortPagina, extraHTML = "") {
    const frontPageHTML = document.querySelector(".base-page");
    frontPageString = `<img class="position-absolute end-0" src="Images/Curious-inc_logo" alt="curious-inc logo"> 
    <div class="frond-page d-flex align-items-center justify-content-center"><div class="row-cols text-center">
        <h1 class="col p-1">curious inc.</h1>
        <h1 class="col fs-2 p-1">Daniël Kosters</h2>
        <p class="col fs-4 pt-1">${soortPagina}</p>
        ${extraHTML}
    </div>
    </div>`;
    console.log(frontPageHTML);
    frontPageHTML.innerHTML = frontPageString;
}