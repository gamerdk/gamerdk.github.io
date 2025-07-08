import { Sprite, Assets, Texture, Rectangle} from "https://cdn.jsdelivr.net/npm/pixi.js@8.0.0/+esm";


export default class SpriteRenderer{
    
    constructor(app){
        self.ratio = {width:160, height:144};
        self.textures = {};
        self.sprites = {};
        self.scale = 1;
        self.scene = 'start';
        self.app = app;
        self.spritesLoaded = false;
        
        
        window.addEventListener("resize", this.Scale)
        this.Scale();
        this.LoadTextures();
    }
    
    UpdateViewPort(scene, elements){
        if(!spritesLoaded) return;
        app.stage.addChild(this.createSprite(textures[scene.sprite]));

        for (const element of elements) {
                app.stage.addChild(this.createSprite(sprites[element.sprite][element.index], {width: ratio.width, height: ratio.height, x: element.x, y: element.y }));
            };
        /*this.DrawOnCanvas(textures[schene], 0, 0, ratio.width, ratio.height, 0, 0);
        this.DrawOnCanvas(textures['spriteSheet'], 2, 2, blokjes.width, blokjes.height, 11 * scale, 109 * scale );
    }
    //w:11, h:109
    DrawOnCanvas(image, posX, posY, height, width, displayX, displayY){
        draw.drawImage(image, posX * width, posY * height, width, height, displayX, displayY, width * scale, height * scale);*/
        
        app.render();
    }

    createSprite(texture, options = {}) { //deze funktie is van open ai met een paar aanpassingen
        let sprite = new Sprite(texture);

        if (options.x !== undefined) sprite.x = options.x * scale;
        if (options.y !== undefined) sprite.y = options.y * scale;
        sprite.scale.set(scale);
        return sprite;
    }
    
    Scale(){
        const vw = document.documentElement.clientWidth;
        const vh = document.documentElement.clientHeight;
        
        scale = Math.min(Math.floor(vw/ratio.width), Math.floor(vh/ratio.height));
        app.renderer.resize(ratio.width * scale, ratio.height * scale);
    }
    
    async LoadTextures(){
        textures['start'] = await Assets.load('sprites/StartScreen.png');
        textures['gameType-A'] = await Assets.load('sprites/GameTypeA.png');
        textures['menueType-A'] = await Assets.load('sprites/Game-Type-A.png');
        textures['gameType-B'] = await Assets.load('sprites/GameTypeB.png');
        textures['menueType-B'] = await Assets.load('sprites/Game-Type-B.png');
        textures['selection'] = await Assets.load('sprites/GameSelection.png');
        textures['gameOverFill'] = await Assets.load('sprites/GameOverFill.png');
        textures['gameOverScreen'] = await Assets.load('sprites/GameOverSCreen.png');
        textures['pause'] = await Assets.load('sprites/PauseScreen.png');
        textures['title'] = await Assets.load('sprites/TitleScreen.png');
        
        textures['start'].source.scaleMode = 'nearest';
        textures['gameType-A'].source.scaleMode = 'nearest';
        textures['menueType-A'].source.scaleMode = 'nearest';
        textures['gameType-B'].source.scaleMode = 'nearest';
        textures['menueType-B'].source.scaleMode = 'nearest';
        textures['selection'].source.scaleMode = 'nearest';
        textures['gameOverFill'].source.scaleMode = 'nearest';
        textures['gameOverScreen'].source.scaleMode = 'nearest';
        textures['pause'].source.scaleMode = 'nearest';
        textures['title'].source.scaleMode = 'nearest';

        this.LoadSprites(await Assets.load('sprites/SpriteSheet.png'));
        spritesLoaded = true;
    }

    LoadSprites(spriteSheet){
        let baseTexture = spriteSheet.source;
        baseTexture.scaleMode = 'nearest';
        const spriteInformation = {
            blokjes : {height:8, width:8, start:[0,0], amaunt:[4,3]},
            letters : {height:10, width:10, start:[0,24], amaunt:[11,3]},
            cijvers : {height:6, width:6, start:[0,54], amaunt:[10,1]},
            types : {height:6, width:46, start:[0,60], amaunt:[2,2]},
            levels : {height:28, width:95, start:[0,72], amaunt:[1,1]},
        };
        
        for (const [key, sprite] of Object.entries(spriteInformation)){
            sprites[key] = [];
            for (let x = 0; x < sprite.amaunt[0]; x++){
                for (let y = 0; y < sprite.amaunt[1]; y++){
                    let startX = sprite.start[0] + (x * sprite.width);
                    let startY = sprite.start[1] + (y * sprite.height);
                    const texture = new Texture({
                        source: baseTexture,
                        frame: new Rectangle(startX, startY, sprite.width, sprite.height)
                    });
                    sprites[key].push(texture);
                }   
            }
        }
    }
}

