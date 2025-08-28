export default class SceneInfo{
    constructor(sprites){
        this.sprites = sprites;
    }

    SelectElement(change, index){
        const object = this.sprites[index].find(element => element.active);//openAI heeft geholpen deze regel code te schrijven
        const testElement = this.sprites[index].indexOf(object) + change;
        
        if(testElement < this.sprites[index].length && testElement >= 0){
            object.active = false;
            this.sprites[index][testElement].active = true;
        }
    }

    GetSprites() {
        let spriteList = [];

        for (const elements of this.sprites){
            for (const [key, value] of Object.entries(elements)){//openAI kwam orgineel met deze regel code (heb het daarna overal en nergens in het project gebruikt voor de dictionaries)
                if(value.active)  spriteList.push(value);
            }
        }
        return spriteList;
    }

    GetInfoSelected(index){
        return this.sprites[index].find(element => element.active);
    }
}