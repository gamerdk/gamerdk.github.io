import { Sprite, Assets, Texture, Rectangle, Ticker} from "https://cdn.jsdelivr.net/npm/pixi.js@8.0.0/+esm";

export default class SpriteRenderer{
    
    constructor(app){
        this.ratio = {width:160, height:144};
        this.textures = {};
        this.sprites = {};
        this.scale = 1;
        this.app = app;
        this.canRunGame = false;
        this.objectPool = [];
        
        this.init();
    }
    async init(){
        const scaleFunction = this.Scale.bind(this);
        window.addEventListener("resize", scaleFunction)
        scaleFunction();
        await this.TitleScreen();
        await this.Loadtextures();
        this.canRunGame = true;
    }

    async TitleScreen(){
        let title = await Assets.load('sprites/TitleScreen.png');
        title.source.scaleMode = 'nearest';
        this.CreateSprite(title);
        this.app.stage.addChild(this.objectPool[0]);
    }

    ResetObjectPool(){
        for (const object of this.objectPool) object.visible = false;
    }

    AddChildren(){
        for (const object of this.objectPool) this.app.stage.addChild(object);
        this.app.render();
    }

    UpdateViewPort(scene, elements){
        if(!this.canRunGame || scene == undefined) return;
        this.app.stage.removeChildren();
        this.ResetObjectPool();
        
        this.UpdateSprite(0, this.textures[scene.sprite]);
        if (elements == undefined) return;
        elements.forEach((element, index) => {
            this.UpdateSprite(index+1, this.sprites[element.sprite][element.index], {x: element.x, y: element.y });
        });
        this.AddChildren();
    }
    
    UpdateSprite(spriteIndex, texture, position = {}){
        if (spriteIndex >= this.objectPool.length) this.CreateSprite(texture); 

        const sprite = this.objectPool[spriteIndex];
        sprite.texture = texture;
        if (position.x != undefined) sprite.x = position.x * this.scale;
        if (position.y != undefined) sprite.y = position.y * this.scale;
        sprite.scale.set(this.scale);
        sprite.visible = true;
    }

    CreateSprite = (texture) => this.objectPool.push(new Sprite(texture));

    
    Scale(){
        const vw = document.documentElement.clientWidth;
        const vh = document.documentElement.clientHeight;
        
        this.scale = Math.min(Math.floor(vw/this.ratio.width), Math.floor(vh/this.ratio.height));
        this.app.renderer.resize(this.ratio.width * this.scale, this.ratio.height * this.scale);
    }
    
    async Loadtextures(){
        this.textures['start'] = await Assets.load('sprites/StartScreen.png');
        this.textures['gameType-A'] = await Assets.load('sprites/GameTypeA.png');
        this.textures['menueType-A'] = await Assets.load('sprites/Game-Type-A.png');
        this.textures['gameType-B'] = await Assets.load('sprites/GameTypeB.png');
        this.textures['menueType-B'] = await Assets.load('sprites/Game-Type-B.png');
        this.textures['selection'] = await Assets.load('sprites/GameSelection.png');
        this.textures['gameOverFill'] = await Assets.load('sprites/GameOverFill.png');
        this.textures['gameOverScreen'] = await Assets.load('sprites/GameOverSCreen.png');
        this.textures['pause'] = await Assets.load('sprites/PauseScreen.png');
        
        this.textures['start'].source.scaleMode = 'nearest';
        this.textures['gameType-A'].source.scaleMode = 'nearest';
        this.textures['menueType-A'].source.scaleMode = 'nearest';
        this.textures['gameType-B'].source.scaleMode = 'nearest';
        this.textures['menueType-B'].source.scaleMode = 'nearest';
        this.textures['selection'].source.scaleMode = 'nearest';
        this.textures['gameOverFill'].source.scaleMode = 'nearest';
        this.textures['gameOverScreen'].source.scaleMode = 'nearest';
        this.textures['pause'].source.scaleMode = 'nearest';

        this.LoadSprites(await Assets.load('sprites/Spritesheet.png'));
    }

    LoadSprites(spriteSheet){
        let baseTexture = spriteSheet.source;
        baseTexture.scaleMode = 'nearest';
        const spriteInformation = {
            "blokjes" : {height:8, width:8, start:[0,0], amaunt:[4,3]},
            "letters" : {height:10, width:10, start:[0,24], amaunt:[11,3]},
            "cijvers" : {height:6, width:6, start:[0,54], amaunt:[10,1]},
            "types" : {height:6, width:46, start:[0,60], amaunt:[2,2]},
            "levels" : {height:28, width:95, start:[0,72], amaunt:[1,1]},
        };
        
        for (const [key, sprite] of Object.entries(spriteInformation)){
            this.sprites[key] = [];
            for (let y = 0; y < sprite.amaunt[1]; y++){
                for (let x = 0; x < sprite.amaunt[0]; x++){
                    let startX = sprite.start[0] + (x * sprite.width);
                    let startY = sprite.start[1] + (y * sprite.height);
                    const texture = new Texture({
                        source: baseTexture,
                        frame: new Rectangle(startX, startY, sprite.width, sprite.height)
                    });
                    this.sprites[key].push(texture);
                }   
            }
        }
    }
}

