import React, { PureComponent } from 'react';

class Search extends PureComponent {
    static defaultProps = {
        data: [],
        value: '',
        filterList: [],
        onChange: () => {}
    };

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data || [],
            value: ''
        }
    }

    componentWillMount() {
        if (this.props.value) {
            this.setState({ value: this.props.value });
        } else {
            if (this.props.filterList.length) this.setState({ value: this.props.filterList[0].value });
        }
    }

    handlerChangeSelect = (event) => {
        const result = this.props.data.filter(item => item.status[event.target.value]);

        this.setState({ value: event.target.value });
        this.props.onChange(result);
    }

    render() {
        const options = this.props.filterList.map((item, i) => <option key={i} value={item.value}>{item.name}</option>);

        return (
            <div>
                <form>
                    <select name='filter-notes' id='filter-notes' value={this.state.value} onChange={this.handlerChangeSelect}>{options}</select>
                </form>
            </div>
        )
    }
}

export default Search;
