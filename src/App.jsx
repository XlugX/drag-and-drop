import {useState} from 'react';

import s from './app.module.css';


const App = () => {
   const [ cardList, setCardList ] = useState([
        { id: 1, order:3, text: 'КАРТОЧКА 3'},
        { id: 2, order:2, text: 'КАРТОЧКА 2'},
        { id: 3, order:1, text: 'КАРТОЧКА 1'},
        { id: 4, order:4, text: 'КАРТОЧКА 4'},
    ]);
   const [currentCard, setCurrentCard] = useState(null);

    function dragStartHandler(e, card) {
        setCurrentCard(card);
    }

    function dragEndHandler(e) {
        e.target.style.background ='#c98cd3';
    }

    function dragOverHandler(e, card) {
        e.preventDefault()
        e.target.style.background ='lightgrey';
    }

    function dropHandler(e, card) {
        e.preventDefault();
        setCardList(cardList.map(c => {
            if(c.id === card.id) {
                return {...c, order: currentCard.order}
            }
            if(c.id === currentCard.id) {
                return {...c, order: card.order}
            }
            return c;
        }))
        e.target.style.background ='#c98cd3';
    }
    const sortCard = (a, b) => {
        if(a.order > b.order) {
            return 1
        }else {
            return -1
        }

    }
    return <div className={s.app}>
        { cardList.sort(sortCard).map( card =>
            <div
                key={card.id}
                className={s.card}
                onDragStart={ e => dragStartHandler(e,card)}
                onDragLeave={e => dragEndHandler(e)}
                onDragEnd={e => dragEndHandler(e)}
                onDragOver={e => dragOverHandler(e)}
                onDrop={e => dropHandler(e, card)}
                draggable={true}
            > {card.text} </div>
        ) }
    </div>
};

export default App;