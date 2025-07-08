export default class InputManager {/*dit script is groot en deels van OpenAI*/
    keys = {};
    constructor() {
        this.keyDownHandler = this.KeyDownHandler.bind(this);
        this.keyUpHandler = this.KeyUpHandler.bind(this);

        window.addEventListener("keydown", this.KeyDownHandler);
        window.addEventListener("keyup", this.KeyUpHandler);
    }

    KeyDownHandler(event) {
        this.keys[event.key] = true;
    }

    KeyUpHandler(event) {
        this.keys[event.key] = false;
    }

    IsKeyPressed(key) {
        return !!this.keys[key];
    }
}