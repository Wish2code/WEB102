import { useState } from 'react';
import Flashcard from './flashcard';
import cards from '../data/cards';
import '../styles.css';

function FlashcardList() {
  const [index, setIndex] = useState(Math.floor(Math.random() * cards.length));
  const [flipped, setFlipped] = useState(false);

  const showRandomCard = () => {
    if (flipped) {
      // Flip back first, then after animation delay, load a new card
      setFlipped(false);
      setTimeout(() => {
        loadNewCard();
      }, 100); // matches CSS transition duration
    } else {
      loadNewCard();
    }
  };

  const loadNewCard = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * cards.length);
    } while (newIndex === index);

    setIndex(newIndex);
  };

  return (
    <div>
      <h2>Flashcard Set: General Knowledge</h2>
      <p>A basic quiz for random knowledge facts.</p>
      <br></br>
      <p>Total Cards: {cards.length}</p>

      <Flashcard card={cards[index]} flipped={flipped} setFlipped={setFlipped} />

      <button className ="nextCard" onClick={showRandomCard}>⭢</button>
    </div>
  );
}

export default FlashcardList;

