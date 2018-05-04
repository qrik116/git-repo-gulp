import React, { Component } from 'react';

class HelloWorld extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            valueDefault: 'stranger'
        }
    }

    handerChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        return (
            <div>
                <input type="text" 
                    onChange={event => {this.handerChange(event)}}
                />
                <br/>
                <p>Hello, {this.state.value || this.state.valueDefault}!</p>
            </div>
        );
    }

}

export default HelloWorld;