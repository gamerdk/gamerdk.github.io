export default class InputManager {/*dit script is groot en deels van OpenAI en daarop verder gebauwd (de prompt was of het mogelijk was met Eventlisteners om in javascript de input.iskeydown van monogame na te kunnen maken )*/
    constructor() {
        this.keys = {};
        this.lastKeyPressed = '';
        
        this.keyDownHandler = this.KeyDownHandler.bind(this);
        this.keyUpHandler = this.KeyUpHandler.bind(this);

        window.addEventListener("keydown", this.keyDownHandler);
        window.addEventListener("keyup", this.keyUpHandler);
    }

    KeyDownHandler(event) {
        // console.log(event.key);
        this.keys[event.key] = true;
    }

    KeyUpHandler(event) {
        this.keys[event.key] = false;
        this.lastKeyPressed = '';
    }

    IsKeyPressed(key) {
        if(!!this.keys[key] && key != this.lastKeyPressed){
            this.lastKeyPressed = key;
            return true;
        }
        else return false;
    }
    IsKeyDown(key){
        return !!this.keys[key];
    }
}