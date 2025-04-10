function AddFrontPage(soortPagina, extraHTML = "") {
    frontPageString = `
    <img class="position-absolute end-0" src="Images/Curious-inc_logo" alt="curious-inc logo"> 
    <div class="frond-page d-flex align-items-center justify-content-center">
        <div class="row-cols text-center">
            <h1 class="col p-1">curious inc.</h1>
            <h1 class="col fs-2 p-1">Daniël Kosters</h2>
            <p class="col fs-4 pt-1">${soortPagina}</p>
            ${extraHTML}
        </div>
    </div>
    `;
    
    const frontPageHTML = document.querySelector(".base-page");
    frontPageHTML.innerHTML = frontPageString;
}

function AddContentsTable(pages){
    buttons = ''
    pages.forEach((pages, index) => {
        buttons +=`
        <button onclick="ToPage(${index})">
        ${pages}
        </button>
        `
    });
    const inhoudsOpgave = document.querySelector(".contents-table");
    inhoudsOpgave.innerHTML = buttons;
}

function ToPage(index){
    window.location = pages[index] + ".html";
}