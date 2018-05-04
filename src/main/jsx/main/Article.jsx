import React, { Component } from 'react';

class Article extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title || '',
            authorName: this.props.authorName || ''
        }
    }

    render() {
        return (
            <article>
                {this.state.title ? <h3 className="title">{this.state.title}</h3> : ''}
                <h4 className="author">Автор: {this.state.authorName}</h4>
                <p className="text">{this.props.children}</p>
            </article>
        );
    }

}

export default Article;