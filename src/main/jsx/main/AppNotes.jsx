import React, { Component, Fragment } from 'react';
import Search from './Search.jsx';

class OptionsNote extends Component {
    static defaultProps ={
        onComplete: () => {},
        onDelete: () => {}
    }

    constructor(props) {
        super(props);

        this.state = {
            isShowMenu: false
        };
        this.menu = null;
        this.buttonOptions = null;
    }

    componentDidMount() {
        document.addEventListener('click', this.closeMenu);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.closeMenu);
    }

    closeMenu = (event) => {
        if (this.menu.contains(event.target) || this.buttonOptions.contains(event.target)) {
            return false;
        }

        if (this.state.isShowMenu) {
            this.setState({
                isShowMenu: false
            })
        }
    }

    handlerOpenMenu = () => {
        this.setState({ isShowMenu: !this.state.isShowMenu });
    }

    handlerComplete = (event) => {
        this.setState({
            isShowMenu: false
        });
        this.props.onComplete(event);
    }

    render() {
        return (
            <Fragment>
                <button
                    className='appNotes_options'
                    type='button'
                    onClick={this.handlerOpenMenu}
                    ref={i => this.buttonOptions = i}
                />
                <div
                    className={`appNotes_options_menu${this.state.isShowMenu ? ' appNotes_options_menu-open' : ''}`}
                    ref={i => this.menu = i}
                >
                    <ul>
                        <li onClick={this.handlerComplete}>Выполнено</li>
                        <li style={{ color: 'red' }} onClick={this.props.onDelete}>Удалить</li>
                    </ul>
                </div>
            </Fragment>
        )
    }
}

class Note extends Component {
    constructor(props) {
        super(props);
    }

    handlerDelete = (event) => {
        const _newEvent = Object.assign({}, event, {
            idNote: this.props.id
        });

        this.props.onClose(_newEvent);
    }

    handlerComplete = (event) => {
        const _newEvent = Object.assign({}, event, {
            idNote: this.props.id
        });

        this.props.onComplete(_newEvent);
    }

    render() {
        return (
            <div
                style={{
                    backgroundColor: this.props.bgColor
                }}
                className='appNotes_note'
            >
                <div className='appNotes_note_text'>
                    {this.props.children.split('\n').map((item, i) => {
                        return <span key={i}>{item}<br/></span>
                    })}
                </div>
                <OptionsNote onComplete={this.handlerComplete} onDelete={this.handlerDelete} />
            </div>
        );
    }
}

class NoteGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inRowItem: 3
        }
        this.noteGrid = {
            elementNode: null,
            childrenNode: [],
            rowsCount: 0,
            rowsHeight: [],
            rowsOffset: []
        };
    }

    handlerCloseClick(event) {
        this.props.onClose(event);
    }

    /**
     * Устанавливает кол-во строк this.noteGrid.rowsCount
     */
    setCountRows() {
        this.noteGrid.rowsCount = Math.ceil(this.props.notes.length / this.state.inRowItem);
    }

    /**
     * Возвращает интервал строки
     * @return {Array} массив
     */
    rowsInterval() {
        const _interval = [];

        for (let i = 0; i < this.noteGrid.rowsCount; i++) {
            _interval.push({
                from: i * this.state.inRowItem,
                to: (i * this.state.inRowItem) + this.state.inRowItem
            });
        }
        return _interval;
    }

    /**
     * Возвращает текущий индекс строки
     * @param {integer} value
     *
     * @return {integer} index
     */
    currentRow(value) {
        let index = 0;

        this.rowsInterval().forEach((item, i) => {
            if (item.from <= value && value < item.to) {
                index = i;
            }
        });
        return index;
    }

    /**
     * Устанавливает высоты каждой строки this.noteGrid.rowsHeight
     */
    setHeightRows() {
        this.noteGrid.rowsHeight[0] = 0;

        let maxHeight = 0;
        let currRow = 0;

        this.noteGrid.childrenNode.forEach((item, i) => {
            if (item) {
                if (!(this.currentRow(i) === currRow)) {
                    currRow = this.currentRow(i);
                    maxHeight = 0;
                }

                if (maxHeight < item.offsetHeight) {
                    maxHeight = item.offsetHeight;
                    this.noteGrid.rowsHeight[currRow + 1] = maxHeight;
                }
            }
        });
    }

    /**
     * Устанавливает сдвиги для строк в this.noteGrid.rowsOffset
     */
    setRowsOffset() {
        let offset = 0;

        for (let i = 0; i < this.noteGrid.rowsCount; i++) {
            offset += this.noteGrid.rowsHeight[i];
            this.noteGrid.rowsOffset[i] = offset;
        }
    }

    /**
     * Обновить сетку
     */
    updateNoteGrid() {
        const containerWidth = this.noteGrid.elementNode.offsetWidth;
        const childWidth = containerWidth / this.state.inRowItem;

        this.noteGrid.elementNode.style.height = `${this.noteGrid.rowsHeight.reduce((prev, curr) => {
            return prev + curr;
        }, 0)}px`;

        this.noteGrid.childrenNode.forEach((item, i) => {
            if (item) {
                const offset = {
                    top: this.noteGrid.rowsOffset[this.currentRow(i)],
                    left: (i % this.state.inRowItem) * childWidth
                }

                item.style.width = `${childWidth}px`;
                item.style.transform = `translate(${offset.left}px, ${offset.top}px)`;
            }
        })
    }

    componentDidMount() {
        this.setCountRows();
        this.setHeightRows();
        this.setRowsOffset();
        this.updateNoteGrid();
    }

    componentDidUpdate() {
        this.setCountRows();
        this.setHeightRows();
        this.setRowsOffset();
        this.updateNoteGrid();
    }

    render() {
        return (
            <div className='appNotes_container'>
                <div className='appNotes_row'
                    ref={i => this.noteGrid.elementNode = i}
                >
                    {
                        this.props.notes.map((item, index) => {
                            return (
                                <div key={item.id} className='appNotes_i'
                                    ref={i => this.noteGrid.childrenNode[index] = i}
                                >
                                    <Note id={item.id}
                                        bgColor={item.bgColor}
                                        onClose={event => this.handlerCloseClick(event)}
                                        onComplete={this.props.onComplete}
                                    >{item.text}</Note>
                                </div>
                            )
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
            color: ['#ff897d', '#ffd27a', '#ffff85', '#cfd8dc', '#7cd7ff', '#a4ffeb', '#cbff8a']
        }
    }

    handlerColorChange(event) {
        this.activeColor = event.target.value;
    }

    render() {
        return (
            <div className='appNotes_color'>
                {
                    this.state.color.map((item, i) => {
                        return (
                            <div key={i} className='appNotes_color_i'>
                                <input type='radio'
                                    name='noteeditcolor'
                                    defaultChecked={this.activeColor === item}
                                    value={item}
                                    id={`color_${i}`}
                                    onChange={event => this.handlerColorChange(event)}
                                />
                                <label htmlFor={`color_${i}`} style={{ backgroundColor: item }} />
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

    handlerAddClick() {
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
            <div className='appNotes_space'>
                <textarea
                    name='appNotes'
                    placeholder='Enter your note here...'
                    ref={i => (this.textArea = i)}
                />
                <NoteColor ref={i => this.noteColor = i}/>
                <button
                    className='appNotes_add'
                    type='button'
                    onClick={event => this.handlerAddClick(event)}
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
            notes: [],
            activeFilter: 'all'
        };
        this.tempNotes = [];
        this.filterList = [
            {
                name: 'Все',
                value: 'all'
            }, {
                name: 'Завершенные',
                value: 'complete'
            }, {
                name: 'Новые',
                value: 'new'
            }
        ];
    }

    componentWillMount() {
        const localNotes = JSON.parse(localStorage.getItem('notes'));

        if (localNotes && localNotes.length) {
            this.setState({
                notes: localNotes,
                idNotes: localNotes[0].id + 1
            });
            this.tempNotes = localNotes;
        }
    }

    componentDidUpdate() {
        this.updateLocalStorage();
    }

    handlerAdd(objValue) {
        if (objValue.value) {
            const _newnotes = this.tempNotes;
            const _state = {};

            this.filterList.forEach(item => {
                _state[item.value] = ['all', 'new'].indexOf(item.value) !== -1
            });

            _newnotes.unshift({
                id: this.state.idNotes,
                text: objValue.value,
                bgColor: objValue.bgColor,
                status: _state
            });
            this.setState({
                idNotes: this.state.idNotes + 1,
                notes: _newnotes
            });
            this.tempNotes = _newnotes;
        }
    }

    handlerCloseClick(event) {
        let _newnotes = this.state.notes.slice();

        _newnotes = _newnotes.filter(item => item.id !== event.idNote);
        this.setState({
            notes: _newnotes
        });
        this.tempNotes = _newnotes;
    }

    handlerComplete = (event) => {
        const _notes = this.state.notes.slice();

        _notes.forEach(item => {
            if (item.id === event.idNote) {
                if (!item.status.complete) {
                    item.status.complete = true;
                    item.status.new = false
                }
            }
        });
        this.setState({
            notes: _notes
        });
    }

    updateLocalStorage() {
        const notes = JSON.stringify(this.state.notes);

        localStorage.setItem('notes', notes);
    }

    handerChangeSeach = (result) => {
        this.setState({
            notes: result
        })
    }

    render() {
        return (
            <div className='appNotes'>
                <Search
                    data={this.tempNotes}
                    value={this.state.activeFilter}
                    filterList={this.filterList}
                    onChange={this.handerChangeSeach}
                />
                <h3 className='appNotes_title'>AppNotes</h3>
                <NoteEdit onAdd={value => this.handlerAdd(value)} />
                {this.state.notes.length > 0 &&
                    <NoteGrid
                        notes={this.state.notes}
                        onClose={event => this.handlerCloseClick(event)}
                        onComplete={this.handlerComplete}
                    />
                }
            </div>
        );
    }
}

export default AppNotes;
