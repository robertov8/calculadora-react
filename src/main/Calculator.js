import React, { Component } from 'react';
import './Calculator.css';

import Button from '../components/Button/Button';
import Display from '../components/Display/Display';
import Operation from '../components/Utils/Operation';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
};

export default class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = { ...initialState };
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory() {
        this.setState({ ...initialState });
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true });
        } else {
            const equals = operation === '=';
            const currentOperation = this.state.operation;

            const values = [...this.state.values];
            values[0] = Operation(values[0], values[1], currentOperation);
            values[1] = 0;

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            });
        }
    }

    addDigit(n) {
        const {
            displayValue,
            clearDisplay,
            current
        } = this.state;

        if (n === '.' && displayValue.includes('.')) {
            return;
        }

        const _clearDisplay = displayValue === '0' || clearDisplay;
        const currentValue = _clearDisplay ? '' : displayValue;
        const _displayValue = currentValue + n;
        this.setState({ displayValue: _displayValue, clearDisplay: false });

        if (n !== '.') {
            const i = current;
            const newValue = parseFloat(_displayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({ values });
        }
    }

    render() {
        return (
            <div className='calculator'>
                <Display value={this.state.displayValue} />
                <Button label='AC' triple onClick={this.clearMemory} />
                <Button label='/' operation onClick={this.setOperation} />
                <Button label='7' onClick={this.addDigit} />
                <Button label='8' onClick={this.addDigit} />
                <Button label='9' onClick={this.addDigit} />
                <Button label='*' operation onClick={this.setOperation} />
                <Button label='4' onClick={this.addDigit} />
                <Button label='5' onClick={this.addDigit} />
                <Button label='6' onClick={this.addDigit} />
                <Button label='-' operation onClick={this.setOperation} />
                <Button label='1' onClick={this.addDigit} />
                <Button label='2' onClick={this.addDigit} />
                <Button label='3' onClick={this.addDigit} />
                <Button label='+' operation onClick={this.setOperation} />
                <Button label='0' double onClick={this.addDigit} />
                <Button label='.' onClick={this.addDigit} />
                <Button label='=' operation onClick={this.setOperation} />
            </div>
        );
    }
}
