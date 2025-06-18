import './Flashcard.css';

function Flashcard({ card, flipped, setFlipped }) {
  return (
    <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
      <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`}>
        <div className="flashcard-front">
          {card.question}
        </div>
        <div className="flashcard-back">
          {card.answer}
        </div>
      </div>
    </div>
  );
}

export default Flashcard;



