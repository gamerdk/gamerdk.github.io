pages = [
    "bedrijfs-informatie",
    "chat-bot",
    "service-desk"
]

AddFrontPage("BPV-Verslag",'<p class="col fs-4">6 maart t/m 20 juni</p>');
AddContentsTable(pages);

function ToPage(index){
    window.location = pages[index] + ".html";
}