import React, { Component } from 'react';

class Note extends Component {
    constructor(props) {
        super(props);
    }

    handlerCloseClick(event) {
        let _newEvent = Object.assign({}, event, {
            idNote: this.props.id
        });
        this.props.onClose(_newEvent);
    }

    render() {
        return (
            <div 
                style={{
                    backgroundColor: this.props.bgColor
                }}
                className="appNotes_note">
                <div className="appNotes_note_text">
                    {this.props.children.split('\n').map((item, i) => {
                        return <span key={i}>{item}<br/></span>
                    })}
                </div>
                <button 
                    className="appNotes_note_close" 
                    type="button"
                    onClick={event => {this.handlerCloseClick(event)}}
                >x</button>
            </div>
        );
    }
}

class NoteGrid extends Component {
    constructor(props) {
        super(props);
    }

    handlerCloseClick(event) {
        this.props.onClose(event);
    }

    render() {
        return (
            <div className="appNotes_container">
                <div className="appNotes_row">
                    {
                        this.props.notes.map(item => {
                            return <div key={item.id} className="appNotes_i">
                                <Note id={item.id}
                                    bgColor={item.bgColor}
                                    onClose={event => {this.handlerCloseClick(event)}}
                                >{item.text}</Note>
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
}

class NoteColor extends Component {
    constructor(props) {
        super(props);

        this.activeColor = '#ff897d';
        this.state = {
            color: ['#ff897d', '#ffd27a', '#ffff85', 
                '#cfd8dc', '#7cd7ff', '#a4ffeb', '#cbff8a']
        }
    }

    handlerColorChange(event) {
        this.activeColor = event.target.value;
    }

    render() {
        return (
            <div className="appNotes_color">
                {
                    this.state.color.map((item, i) => {
                        return (
                            <div key={i} className="appNotes_color_i">
                                <input type="radio" 
                                    name="noteeditcolor" 
                                    defaultChecked={this.activeColor == item ? true : false} 
                                    value={item}
                                    id={'color_'+i}
                                    onChange={event => this.handlerColorChange(event)}/>
                                <label htmlFor={'color_'+i}
                                    style={{backgroundColor: item}}
                                ></label>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

class NoteEdit extends Component {
    constructor(props) {
        super(props);

        this.noteColor = null;
        this.textArea = null;
    }

    handlerAddClick(event) {
        if (this.textArea.value) {
            this.props.onAdd({
                value: this.textArea.value,
                bgColor: this.noteColor.activeColor
            });
            this.textArea.value = '';
        }
    }

    render() {
        return (
            <div className="appNotes_space">
                <textarea 
                    name="appNotes" 
                    placeholder="Enter your note here..."
                    ref={i => (this.textArea = i)}
                ></textarea>
                <NoteColor ref={i => this.noteColor = i}/>
                <button 
                    className="appNotes_add" 
                    type="button"
                    onClick={event => {this.handlerAddClick(event)}}
                >Add</button>
            </div>
        );
    }
}

class AppNotes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idNotes: 0,
            notes: []
        }
    }

    componentDidMount() {
        let localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes && localNotes.length) {
            this.setState({
                notes: localNotes,
                idNotes: localNotes[0].id + 1
            });
        }
    }

    componentDidUpdate() {
        this.updateLocalStorage();
    }

    handlerAdd(objValue) {
        if (objValue.value) {
            let _newnotes = this.state.notes;
            _newnotes.unshift({
                id: this.state.idNotes,
                text: objValue.value,
                bgColor: objValue.bgColor
            });
            this.setState({
                idNotes: this.state.idNotes + 1,
                notes: _newnotes
            });
        }
    }

    handlerCloseClick(event) {
        let _newnotes = this.state.notes;
        _newnotes = _newnotes.filter(item => item.id !== event.idNote);
        this.setState({
            notes: _newnotes
        });
    }

    updateLocalStorage() {
        let notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }

    render() {
        return (
            <div className="appNotes">
                <h3 className="appNotes_title">AppNotes</h3>
                <NoteEdit onAdd={value => this.handlerAdd(value)} />
                {
                    this.state.notes.length ?
                    <NoteGrid 
                        notes={this.state.notes} 
                        onClose={event => this.handlerCloseClick(event)}
                    />
                    :
                    ''
                }
            </div>
        );
    }
}

export default AppNotes;