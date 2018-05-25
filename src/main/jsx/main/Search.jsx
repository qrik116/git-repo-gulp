import React, { PureComponent } from 'react';

class Search extends PureComponent {
    static defaultProps = {
        data: [],
        error: false,
        errorMessage: 'Not found!!!',
        onSearch: () => {}
    };

    constructor(props) {
        super(props)
        this.state = {
            searchQuery: '',
            data: this.props.data || [],
            isNotFound: false
        }
    }

    search() {
        const result = this.state.data.filter(el => {
            const searchValue = el.text.toLowerCase();

            return searchValue.indexOf(this.state.searchQuery) !== -1;
        });

        if (!result.length) {
            this.setState({
                isNotFound: true
            })
        }

        this.props.onSearch(result);
    }

    handlerSubmit(event) {
        event.preventDefault();

        this.search();
    }

    handlerChange(event) {
        this.setState({
            searchQuery: event.target.value.toLowerCase(),
            isNotFound: false
        }, () => {
            this.search();
        })
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={event => this.handlerSubmit(event)}
                >
                    <input type='text' placeholder='Search...' onChange={event => this.handlerChange(event)}/>
                    <button type='submit'>x</button>
                </form>
                {(this.state.isNotFound && this.props.error) &&
                    <p>{this.props.errorMessage}</p>
                }
            </div>
        )
    }
}

export default Search;
