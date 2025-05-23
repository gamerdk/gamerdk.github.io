const articelsHTML = document.querySelector(".bpv-taak");
const buttonsLocation = document.querySelector(".verslag-menu");
let pages = [];

async function CreateArticels(urls) {
    
    for(url of urls){
        let splitArticels = [];
        const text = await GetFile(url);

        const articels = text.split("$");
        articels.forEach(articel=> splitArticels.push(articel.split("&", 2)));
        
        let page = "";
        let articelHTML = "";
        
        splitArticels.forEach((titleAndText, index) => {
            articelHTML += `
            <!--${titleAndText[0]}-->
            <div class="bg-platform">
                <h2  class="text-center">${titleAndText[0]}</h2>
                <div>
                <p>${titleAndText[1]}</p>
                </div>
                </div>
                `;

            if (index % 3 == 2) {
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
        pages.push(page);
    }
    
    articelsHTML.innerHTML = pages[0];  
}

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
    nameButtons.forEach((nameButton, index) =>{
        HTML += `
            <button class="m-3 flex-fill h-100" onclick="LoadArticels(${index})">${nameButton}</button>
        `
    })
    console.log(HTML)
    buttonsLocation.innerHTML = HTML;
}

function LoadArticels(index){
    articelsHTML.innerHTML = pages[index];
}