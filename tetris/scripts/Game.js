import { Application } from "https://cdn.jsdelivr.net/npm/pixi.js@8.0.0/+esm";
import Input from "./Input.js";
import SpriteRenderer from "./SpriteRenderer.js";
(async () => {
    const app = new Application();

    await app.init({
        backgroundColor: '#FFFFFF'
    });

    document.body.appendChild(app.canvas);
    
    const game = new GameManager(app);
    game.Update();
})();


export class GameManager {
    frames = 0;

    constructor(app) {
        this.input = new Input();
        this.spriteRenderer = new SpriteRenderer(app);
        this.Update = this.Update.bind(this);
        window.addEventListener("resize", () => this.spriteRenderer.UpdateViewPort());
    }

    Update() {
        const scene = {sprite: 'start', extra: {}};
        const arrow = {sprite: 'blokjes', index: 8, x: 11, y:  109};
        this.spriteRenderer.UpdateViewPort(scene, [arrow]);
        requestAnimationFrame(this.Update);
    }
}
