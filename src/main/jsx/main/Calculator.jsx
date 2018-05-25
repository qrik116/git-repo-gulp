import React, { Component } from 'react';

class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstArg: 0,
            secondArg: 0,
            arithmeticActive: 'сложение',
            arithmetic: ['сложение', 'вычитание', 'умножение'],
            value: 0
        }
    }

    handerSelectChange(event) {
        this.setState({
            arithmeticActive: event.target.value,
            value: this.calculate(event.target.value, this.state.firstArg, this.state.secondArg)
        });
    }

    handerFirstArgChange(event) {
        const _input = event.target;

        this.onlyNumber(_input);
        this.setState({
            firstArg: _input.value,
            value: this.calculate(this.state.arithmeticActive, _input.value, this.state.secondArg)
        });
    }

    handerSecondArgChange(event) {
        const _input = event.target;

        this.onlyNumber(_input);
        this.setState({
            secondArg: _input.value,
            value: this.calculate(this.state.arithmeticActive, this.state.firstArg, _input.value)
        });
    }

    onlyNumber(item) {
        if (item.value.match(/[^\d]+/g)) {
            item.value = item.value.replace(/[^\d]+/g, '');
        }
    }


    calculate(operation, arg1, arg2) {
        let value = 0;

        switch (operation) {
            case 'сложение':
                value = (parseInt(arg1, 10) || 0) + (parseInt(arg2, 10) || 0);
            break;

            case 'вычитание':
                value = (parseInt(arg1, 10) || 0) - (parseInt(arg2, 10) || 0);
            break;

            case 'умножение':
                value = (parseInt(arg1, 10) || 0) * (parseInt(arg2, 10) || 0);
            break;

            default:
                break;
        }
        return value;
    }

    render() {
        return (
            <div>
                <select
                    name='arithmetic'
                    onChange={event => (this.handerSelectChange(event))}
                    value={this.state.arithmeticActive}
                >
                    {
                        this.state.arithmetic.map((item, i) => {
                            return <option
                                key={i}
                                value={item}
                                   >
                                {item}
                            </option>
                        })
                    }
                </select>
                <input type='text'
                    size='3'
                    onChange={event => this.handerFirstArgChange(event)}
                    name='firstArg'
                    value={this.state.firstArg}
                />
                <input type='text'
                    size='3'
                    onChange={event => this.handerSecondArgChange(event)}
                    name='secondArg'
                    value={this.state.secondArg}
                />
                <p>
                    <b>Результат:</b> {this.state.value}
                </p>
            </div>
        );
    }
}

export { Calculator };
