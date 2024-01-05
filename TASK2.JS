class Timer {
    constructor() {
        this.time = 0;
        this.intervalId = null;
        this.laps = [];
    }

    start() {
        if (this.intervalId === null) {
            this.intervalId = setInterval(() => {
                this.time++;
                this.displayTime();
            }, 1000);
        }
    }

    stop() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    reset() {
        this.stop();
        this.time = 0;
        this.laps = [];
        this.displayTime();
        this.displayLaps();
    }

    lap() {
        const lapTime = this.time;
        this.laps.push(lapTime);
        this.displayLaps();
    }

    displayTime() {
        const hours = Math.floor(this.time / 3600);
        const minutes = Math.floor((this.time % 3600) / 60);
        const seconds = this.time % 60;

        document.getElementById('timer').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    displayLaps() {
        const lapList = document.getElementById('laps');
        lapList.innerHTML = '';
        this.laps.forEach((lap, index) => {
            const li = document.createElement('li');
            li.textContent = `Lap ${index + 1}: ${Math.floor(lap / 3600)}.${Math.floor((lap % 3600) / 60)}.${lap % 60}`;
            lapList.appendChild(li);
        });
    }
}

const timer = new Timer();

document.getElementById('start').addEventListener('click', () => timer.start());
document.getElementById('stop').addEventListener('click', () => timer.stop());
document.getElementById('reset').addEventListener('click', () => timer.reset());
document.getElementById('lap').addEventListener('click', () => timer.lap());