function AddFrontPage(pageType, extraHTML = "") {
    frontPageString = `
    <div class="position-absolute end-0">
        <img class="logo invert" src="/bpv-verslag/Images/Curious-Logo.webp" alt="curious-inc logo">
        <img class="logo" src="https://opleiding.com/wp-content/uploads/opleider/roc-van-twente-900x0-c-default.png" alt="ROC van Twente logo"> 
    </div>
    <div class="frond-page d-flex align-items-center justify-content-center">
        <div class="row-cols text-center">
            <h1 class="col p-1">Curious inc.</h1>
            <h1 class="col fs-2 p-1">Daniël Kosters</h2>
            <p class="col fs-4 pt-1">${pageType}</p>
            ${extraHTML}
        </div>
    </div>
    `;

    const frontPageHTML = document.querySelector(".base-page");
    frontPageHTML.innerHTML = frontPageString;
}

function AddContentsTable(pages, folders, classes = '') {
    buttons = ''
    pages.forEach(page => {
        buttons += `
        <button ${classes} onclick="ToPage('${folders + page}')">
        ${page}
        </button>
        `
    })
    const inhoudsOpgave = document.querySelector(".contents-table");
    inhoudsOpgave.innerHTML = buttons;
}

function FillHead() {
    const head = `  
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
    crossorigin="anonymous"></script>
  <link rel="stylesheet" href="/bpv-verslag/style.css">
  <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">
  `;
    const header = document.querySelector("head");
    header.innerHTML += head;
}

function ToPage(pageUrl) {
    window.location.href = pageUrl;
}
