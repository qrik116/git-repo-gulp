import React, { Component } from 'react';
import { render } from 'react-dom';
import Article from './main/Article';
import HelloWorld from './main/HelloWorld';
import ContactList from './main/Contact';
import { Calculator } from './main/Calculator';
import AppNotes from './main/AppNotes';

let _root = document.getElementById('root'),
    _linkStyle = {
        textDecoration: 'underline'
    },
    issue3Style = `
        .contacts {
          width: 300px;
        }

        .search-field {
          width: 100%;
          padding: 10px;
          font-size: 16px;
        }

        .contacts-list {
          padding: 0;
          width: 100%;
          list-style: none;
        }

        .contact {
            cursor: pointer;
            user-select: none;
        }

        .contact-row {
          display: flex;
          align-items: center;
          font-family: sans-serif;
          width: 100%;
          padding: 5px;
          border-bottom: 1px dotted grey;
        }

        .contact-image {
            border-radius: 50%;
            margin: 5px;
            object-fit: cover;
        }

        .contact-name {
          font-size: 20px;
          font-weight: bold;
        }

        .contact-number {
          font-size: 18px;
          color: grey;
        }`;

import(__dirname + '/main/Article.jsx').then(Article => {
    console.log(Article);
    // render(
    //     <Article>
    //         sadsadas
    //     </Article>,
    //     _root
    // )
}).catch('Error');

if (_root) {
    render(
        <div>

            <section id="issue1">
                <a 
                    className="h3"
                    href="#issue1"
                    style={_linkStyle}>
                    Задание 1: Сделать компонент для отображения статьи
                </a>
                <Article
                    title="Статья про жизнь"
                    authorName="Евген">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto magnam vitae harum voluptate dolorem, alias obcaecati quas. Ipsa non, laudantium, aliquid nesciunt debitis fugiat facere suscipit, libero inventore et natus.
                </Article>
            </section>

            <section id="issue2">
                <a 
                    className="h3"
                    href="#issue2"
                    style={_linkStyle}>
                    Задание 2: Написать динамический Hello World.
                </a>
                <HelloWorld />
            </section>

            <section id="issue3">
                <a 
                    className="h3"
                    href="#issue3"
                    style={_linkStyle}>
                    Задание 3: Дополнительная информация о контактах
                </a>
                <style>{issue3Style}</style>
                <ContactList />
            </section>

            <section id="issue4">
                <a 
                    className="h3"
                    href="#issue4"
                    style={_linkStyle}>
                    Задание 4: Простой калькулятор
                </a>
                <Calculator />
            </section>

            <hr style={{
                height: '1px',
                backgroundColor: '#cecece',
                margin: '15px 0',
                display: 'block',
                border: 'none'
            }}/>

            <section id="issue5">
                <a 
                    className="h3"
                    href="#issue5"
                    style={_linkStyle}>
                    Задание 5: Заметки, реализация. Сделать выбор цвета для заметки
                </a>
                <AppNotes />
            </section>
            
        </div>, 
        _root
    );
}
