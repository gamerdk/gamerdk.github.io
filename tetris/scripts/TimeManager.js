export default class Time{
    first = undefined;
    last = undefined;

    lastUpdate = Date.now();

    constructor(filterStrength){
        this.filterStrength = filterStrength
    }

    Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

    StartTest(){
        this.first = performance.now();
    }

    FinishTest(){
        this.last = performance.now();
        const timePerFrame = (this.last - this.first)/1000;
        return 1/timePerFrame;
    }

    DeltaTime(){
        const now = Date.now();
        const dt = now - this.lastUpdate;
        this.lastUpdate = now
        return dt/1000;
    }
}