class PomodoroSession {
    constructor(sessionOwner, numberOfRounds, breakDuration, workDuration) {
        this.sessionOwner = sessionOwner;
        this.numberOfRounds = numberOfRounds;
        this.breakDuration = breakDuration;
        this.workDuration = workDuration;
        this.currentState = 'S';
        this.transitionTo('W', 0);
    }

    transitionTo(newState, delay) {
        console.log(`Transitioning from ${this.currentState} to ${newState}`);
        this.currentState = newState;
        setTimeout(() => {
            this.handleTransition();
        }, delay * 1000); //* 60
    }

    handleTransition() {
        switch (this.currentState) {
        case 'W':
            if (this.numberOfRounds === 0) {
                this.transitionTo('E', 0);
            }
            else {
                this.numberOfRounds--;
                this.transitionTo('B', this.workDuration);
            }
            break;
        case 'B':
            this.transitionTo('W', this.breakDuration);
            break;
        case 'E':
            console.log('Done');
            break;
        default:
            console.log('Invalid state');
        }
    }
}

const session = new PomodoroSession('Nico', 3, 5, 25);