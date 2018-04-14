import React, { Component } from 'react';
import { render } from 'react-dom';

class TestInit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: 'Hello World'
        }
    }

    change(s) {
        this.setState({
            message: s.target.value
        })
    }

    render() {
        return (
            <div>
                <input type='text' onChange={proxy => {this.change(proxy)}} value={this.state.message} />
                <div>{this.state.message}</div>
            </div>
        );
    }

}

export default TestInit;