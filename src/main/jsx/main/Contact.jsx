import React, { Component } from 'react';

const CONTACTS = [
    {
        id: 1,
        name: 'Darth Vader',
        phoneNumber: '+250966666666',
        image: 'http://cs7.pikabu.ru/images/big_size_comm_an/2014-03_7/13962622876915.gif',
        address: 'Адрес 1',
        email: 'qwerty@gmail.com'
    }, {
        id: 2,
        name: 'Princess Leia',
        phoneNumber: '+250966344466',
        image: 'http://images6.fanpop.com/image/photos/33100000/CARRIE-FISHER-anakin-vader-and-princess-leia-33186069-190-149.gif',
        address: 'Адрес 1',
        email: 'qwerty@gmail.com'
    }, {
        id: 3,
        name: 'Luke Skywalker',
        phoneNumber: '+250976654433',
        image: 'https://media.gq.com/photos/56da0101062ab67b27facbd2/3:2/w_560/luke-skywalker-gay-.jpg',
        address: 'Адрес 1',
        email: 'qwerty@gmail.com'
    }, {
        id: 4,
        name: 'Chewbacca',
        phoneNumber: '+250456784935',
        image: 'https://media.giphy.com/media/RUUdVZqwpfTRS/giphy.gif',
        address: 'Адрес 1',
        email: 'qwerty@gmail.com'
    }
];

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    handlerClick() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        return (
            <li className='contact'
                role='button'
                aria-pressed={this.state.open ? 'true' : 'false'}
                onClick={event => this.handlerClick(event)}
            >
                <div className='contact-row'>
                    <img className='contact-image' src={this.props.image} width='60px' height='60px' />
                    <div className='contact-info'>
                        <div className='contact-name'> {this.props.name} </div>
                        <div className='contact-number'> {this.props.phoneNumber} </div>
                    </div>
                </div>
                {
                    this.state.open ?
                        <div className='contact-row'>
                            <div>
                                <div className='contact-address'><b>Адрес: </b>{this.props.address}</div>
                                <div className='contact-email'><b>Email: </b>{this.props.email}</div>
                            </div>
                        </div>
                    :
                    ''
                }
            </li>
        );
    }
}

class ContactList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayedContacts: CONTACTS
        }
    }

    handleSearch(event) {
        const searchQuery = event.target.value.toLowerCase();
        const displayedContacts = CONTACTS.filter(el => {
            const searchValue = el.name.toLowerCase();

            return searchValue.indexOf(searchQuery) !== -1;
        });

        this.setState({
            displayedContacts: displayedContacts
        });
    }

    render() {
        return (
            <div className='contacts'>
                <input
                    type='text'
                    placeholder='Search...'
                    className='search-field'
                    onChange={event => this.handleSearch(event)}
                />
                <ul className='contacts-list'>
                    {
                       this.state.displayedContacts.map(el => {
                            return (
                                <Contact
                                    key={el.id}
                                    name={el.name}
                                    phoneNumber={el.phoneNumber}
                                    image={el.image}
                                    address={el.address}
                                    email={el.email}
                                />
                            )
                       })
                    }
                </ul>
            </div>
        );
    }
}

export default ContactList;
