import React, { Component } from 'react';

let styles = `
    .timer {
        display: flex;
        align-items: center;
    }
    .timer_time {
        margin: 0 15px
    }
    .timer_button {
        outline: none;
        border: none;
        background-color: transparent;
        width: 50px;
        height: 50px;
        position: relative;
        overflow: hidden;
        transition: all .3s ease
    }
    .timer_button:before {
        transition: all .3s ease
    }
    .timer_button-pause {
        background-color: #ffcb4b;
    }
    .timer_button-pause:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40%;
        height: 60%;
        border-right: 5px solid white;
        border-left: 5px solid white;
    }
    .timer_button-play {
        background-color: #90d468;
    }
    .timer_button-play:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-20%, -50%);
        border: 15px solid transparent;
        border-left: 20px solid white;
    }
    .timer_button-stop {
        background-color: #03c7fb;
    }
    .timer_button-stop:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -40%) rotate(50deg);
        width: 60%;
        height: 60%;
        border-radius: 50%;
        border-left: 3px solid transparent;
        border-top: 3px solid white;
        border-right: 3px solid white;
        border-bottom: 3px solid white;
    }
    .timer_button-stop:after {
        content: '';
        position: absolute;
        top: 13%;
        left: 15%;
        border: 8px solid transparent;
        border-right: 12px solid white;
    }
`;

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            isPaused: true
        }
    }

    componentDidMount() {
        if (!this.state.isPaused) this.startTimer();
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    tick() {
        if (Math.floor(this.state.counter / 60) <= 59) {
            this.setState({
                counter: this.state.counter + 1
            })
        } else {
            this.setState({
                counter: 0
            })
        }
    }

    startTimer() {
        this.idInterval = setInterval(() => this.tick(), 100);
    }

    clearTimer() {
        clearInterval(this.idInterval);
    }

    play() {
        if (this.state.isPaused) {
            this.startTimer();
        } else {
            this.clearTimer();
        }
        this.setState({
            isPaused: !this.state.isPaused
        })
    }

    stop() {
        this.clearTimer();
        this.setState({
            counter: 0,
            isPaused: true
        })
    }

    format(value) {
        let minutes = Math.floor(value / 60),
            seconds = Math.floor(value % 60);

        return `${minutes < 10 ? '0'+minutes : minutes}:${ seconds < 10 ? '0'+seconds : seconds }`
    }

    render() {
        return (
            <div className="timer">
                <style type="text/css">{styles}</style>
                <button 
                    className={`timer_button ${this.state.isPaused ? 'timer_button-play' : 'timer_button-pause'}`}
                    onClick={() => this.play()}
                ></button>
                <span className="timer_time">Таймер {this.format(this.state.counter)}</span>
                <button 
                    className="timer_button timer_button-stop"
                    onClick={() => this.stop()}
                ></button>
            </div>
        );
    }
}

export default Timer;