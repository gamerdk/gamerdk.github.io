const articelsHTML = document.querySelectorAll(".tekst-vak");
const buttonsLocation = document.querySelector(".verslag-menu");

async function GetFile(url) {
    return await fetch(url)
        .then((res) => res.text())
        .catch((e) => {
            console.error(e);
            return '';
        });
}

function CreateButtons(nameButtons){
    let HTML = "";
    nameButtons.forEach(nameButton =>{
        HTML += `
            <button class="m-3 flex-fill h-100" onclick="LoadArticels('${nameButton}')">${nameButton}</button>
        `;
    });
    buttonsLocation.innerHTML = HTML;
}

async function LoadArticels(file, textArea=0, articelsPerRow=2){
    let splitArticels = [];
    const url = `txtBestanden/${file}.txt`;
    const text = await GetFile(url);
    const updatedText = text.replace(/\r?\n\r?\n/g, "<br>");

    const articels = updatedText.split("$");
    articels.forEach(articel=> splitArticels.push(articel.split("※", 2)));
    
    let page = "";
    let articelHTML = "";
    
    splitArticels.forEach((titleAndText, index) => {
        articelHTML += `
        <!--${titleAndText[0]}-->
        <div class="bg-platform">
            <h2  class="text-center">${titleAndText[0]}</h2>
            <p>${titleAndText[1]}</p>
            </div>
            `;
        console.log("index:" + index)
        console.log("articelsPerRow:"+articelsPerRow)
        console.log(index % articelsPerRow)
        if (index % articelsPerRow == 1) {
            page += `
                <div class="d-flex justify-content-center  align-items-start">
                    ${articelHTML}
                </div>
                `;
            articelHTML = "";
        }
    });
    page += `
    <div class="d-flex justify-content-center  align-items-start">
    ${articelHTML}
    </div>
    `;
    articelsHTML[textArea].innerHTML = page;
}