import { Application } from "https://cdn.jsdelivr.net/npm/pixi.js@8.0.0/+esm";
import Input from "./Input.js";
import SpriteRenderer from "./SpriteRenderer.js";
import SceneInfo from "./Scenes.js";
import Time from "./TimeManager.js";

/*In dit project word heelveel code gebruikt die is geschreven door openAI of daar op is gebasseerd. 
Dit komt aangezien ik veel code gebruik in javascript waar ik niet bekend mee ben.
Om mij weg wijs te maken met de nieuwe libraries en code vraag ik openAI om hulp,
maar kijk ik ook veel op stackoverflow en heb ik de serie over PIXI.js gevolgd van Wael Yasmina of youtube.

Het helpt ook niet dat ik niet supperveel ervaring heb met javascript.
e ervaring die ik vooral heb kwam bij het maken van web pagina's, niet het maken van games wat ik vooral in C# doe.

Verder ga ik naar openAI als ik vast loop met debuggen.
OpenAI kan makkelijker dingen zien die ik over het hoofd zie.

Wat is dan wel volledig van mij??? de logica.
Daarnaast ben ik sinds mijn vorrige project enorme fan geworden van dictionaries wat ik openAI niet veel zie gebruiken tenzij je het benadrukt.

Hierdoor
*/
(async () => {
    const app = new Application();

    await app.init({
        backgroundColor: '#FFFFFF'
    });

    document.body.appendChild(app.canvas);
    
    const game = new GameManager(app);
    // await Sleep(5000);

    game.Update();
})();


class GameManager {
    currondScene = 'start';
    settings = {};
    webAddress = "http://86.95.236.166:5059/"
    // webAddress = "http://192.168.2.3:5059/"

   constructor(app) {
        this.changeScene = this.ChangeScenes.bind(this);

        this.time = new Time(2);
        this.input = new Input();
        this.spriteRenderer = new SpriteRenderer(app);
        this.update = this.Update.bind(this);
        
        window.addEventListener("resize", () => this.spriteRenderer.UpdateViewPort());
        this.NewScene();
    }

    async Update() {
        this.time.StartTest();
        const scene = {sprite:this.currondScene, extras:{}};
        let elements = [];

        switch(this.currondScene){
            case 'start':
                this.Menues(this.changeScene);
                elements = this.sceneInfo.GetSprites();
                break;
            case 'selection':
                this.Menues(this.changeScene);
                elements = this.sceneInfo.GetSprites();
                break;
            case 'menueType-A':
                this.Menues(this.changeScene);
                elements = this.sceneInfo.GetSprites();
                break;
            case 'gameType-A':
                if(this.input.IsKeyPressed('Escape')) console.log('pauze screen W.I.P.');
                else if(this.input.IsKeyPressed('ArrowRight')|this.input.IsKeyPressed('d')) await this.ApiCall("UpdateX", {isRight: true});
                else if(this.input.IsKeyPressed('ArrowLeft')|this.input.IsKeyPressed('a')) await this.ApiCall("UpdateX", {isRight: false});
                else if(this.input.IsKeyPressed('ArrowUp')| this.input.IsKeyDown('w')) console.log('rotation W.I.P.');
                if (this.input.IsKeyDown('ArrowDown')|this.input.IsKeyPressed('s')) await this.ApiCall("UpdateY", {softDrop: true, deltaTime: this.time.DeltaTime()});
                else await this.ApiCall("UpdateY", {softDrop: false, deltaTime: this.time.DeltaTime()});
                
                if(!this.input.IsKeyDown('Enter')) this.gameInfo.canSoftDrop = true;
                
                elements = this.gameInfo.currond[this.gameInfo.rotation];
                if(!(this.gameInfo.stationaryTetrimino == null)) elements = elements.concat(this.gameInfo.stationaryTetrimino);
                console.log(elements, this.gameInfo.stationaryTetrimino);
                break;
            default:
                console.log('new scene name:', this.currondScene);
                break;
        }
        this.spriteRenderer.UpdateViewPort(scene, elements);

        if(scene.sprite != this.currondScene) await this.NewScene(); 
        requestAnimationFrame(() => this.Update());
    }

    Menues(action, index = 0){
        if(this.input.IsKeyPressed('ArrowRight')|this.input.IsKeyPressed('d')){
            this.sceneInfo.SelectElement(1, index);
        }
        else if(this.input.IsKeyPressed('ArrowLeft')|this.input.IsKeyPressed('a')){
            this.sceneInfo.SelectElement(-1, index);
        }
        else if (this.input.IsKeyPressed('Enter')){
            action(index);
        }
    }

    ChangeScenes(index){
        const sceneInfo = this.sceneInfo.GetInfoSelected(index)
        if(sceneInfo.scene == undefined) console.log('This is not posible for now');
        else this.currondScene = sceneInfo.scene;
        if(!isNaN(sceneInfo.info)) this.settings['level'] = sceneInfo.info;
    }

    async NewScene(){
        switch(this.currondScene){
            case 'start':
                this.sceneInfo = new SceneInfo([[
                    {
                        x:11,
                        y:109,
                        sprite:'blokjes',
                        index:10,
                        active: true,
                        scene: 'selection',
                        infor: 'arrow'
                    },
                    {
                        x:90,
                        y:109,
                        sprite:'blokjes',
                        index:10,
                        active: false,
                        scene: undefined,
                        infor: 'arrow'
                    }
                ]]);
                break;
            case 'selection':
                this.sceneInfo = new SceneInfo([[
                    {
                        x:25,
                        y:41,
                        sprite:'types',
                        index:0,
                        active: true,
                        scene: 'menueType-A',
                        info: 'GameType-A'
                    },
                    {
                        x:89,
                        y:41,
                        sprite:'types',
                        index:1,
                        active: false,
                        scene: undefined, //'menueType-B'
                        info: 'GameType-B'
                    }]//,[
                    // 'music-type-a':{
                    //     x:11,
                    //     y:109,
                    //     sprite:'blokjes',
                    //     index:8,
                    //     active: true
                    // },
                    // 'music-type-b':{
                    //     x:11,
                    //     y:109,
                    //     sprite:'blokjes',
                    //     index:8,
                    //     active:
                    // },
                    // 'music-type-c':{
                    //     x:11,
                    //     y:109,
                    //     sprite:'blokjes',
                    //     index:8
                    // },
                    // 'music-type-off':{
                    //     x:11,
                    //     y:109,
                    //     sprite:'blokjes',
                    //     index:8
                    // }]
                ]);
                break;
            case 'menueType-A':
                this.sceneInfo = new SceneInfo([[
                    {
                        x:41,
                        y:49,
                        sprite:'cijvers',
                        index: 0,
                        active: true,
                        scene: 'gameType-A',
                        info: 0
                    },
                    {
                        x:57,
                        y:49,
                        sprite:'cijvers',
                        index: 1,
                        active: false,
                        scene: 'gameType-A',
                        info: 1
                    },
                    {
                        x:73,
                        y:49,
                        sprite:'cijvers',
                        index: 2,
                        active: false,
                        scene: 'gameType-A',
                        info: 2
                    },
                    {
                        x:89,
                        y:49,
                        sprite:'cijvers',
                        index: 3,
                        active: false,
                        scene: 'gameType-A',
                        info: 3
                    },
                    {
                        x:105,
                        y:49,
                        sprite:'cijvers',
                        index: 4,
                        active: false,
                        scene: 'gameType-A',
                        info: 4
                    },
                    {
                        x:41,
                        y:65,
                        sprite:'cijvers',
                        index: 5,
                        active: false,
                        scene: 'gameType-A',
                        info: 5
                    },
                    {
                        x:57,
                        y:65,
                        sprite:'cijvers',
                        index: 6,
                        active: false,
                        scene: 'gameType-A',
                        info: 6
                    },
                    {
                        x:73,
                        y:65,
                        sprite:'cijvers',
                        index: 7,
                        active: false,
                        scene: 'gameType-A',
                        info: 7
                    },
                    {
                        x:89,
                        y:65,
                        sprite:'cijvers',
                        index: 8,
                        active: false,
                        scene: 'gameType-A',
                        info: 8
                    },
                    {
                        x:105,
                        y:65,
                        sprite:'cijvers',
                        index: 9,
                        active: false,
                        scene: 'gameType-A',
                        info: 9
                    }
                ]]);
                break;
            case 'gameType-A':
                await this.ApiCall("", {level: this.settings.level, lines: 0})
                break;
            default:
                console.log('new scene name:', this.currondScene);
                break;
        }
    }

    async ApiCall(url, bodyInfo) {//Code verbeterd door OpenAI zodat mijn code wacht op de fetch
        if (this.gameInfo != null) bodyInfo['localGameInformation'] = JSON.stringify(this.gameInfo);
        const json = JSON.stringify(bodyInfo);

        const response = await fetch(this.webAddress + url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: json
        }).catch(error => {
            console.log(error);
            console.log(`url: ${this.webAddress + url}\nbody: ${json}`);
        });

        if (!response) return; // als fetch faalt, stoppen

        const data = await response.json().catch(error => {
            console.log(error);
            console.log(`url: ${this.webAddress + url}\nbody: ${json}`);
        });

        if (!data) return; // als JSON parsing faalt, stoppen
        console.log(data)
        this.gameInfo = data;
    }
}