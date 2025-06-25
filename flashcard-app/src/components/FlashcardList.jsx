import { useState } from 'react';
import Flashcard from './flashcard';
import cards from '../data/cards';
import '../styles.css';

// Fisher-Yates shuffle
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Utility to normalize strings: lowercase, remove punctuation, trim spaces
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // remove punctuation
    .replace(/\s{2,}/g, ' ') // collapse multiple spaces
    .trim();
}

// Utility to check if guess is a partial match of the answer
function isPartialMatch(guess, answer) {
  const normGuess = normalize(guess);
  const normAnswer = normalize(answer);
  // Accept if guess is a substring of answer or vice versa and at least 3 chars
  return (
    normGuess.length >= 3 &&
    (normAnswer.includes(normGuess) || normGuess.includes(normAnswer))
  );
}

function FlashcardList() {
  const [cardOrder, setCardOrder] = useState([...Array(cards.length).keys()]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [history, setHistory] = useState([]);
  const [shuffled, setShuffled] = useState(false);

  // Streak state
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(null); // Start as empty

  const goToNextCard = () => {
    if (index < cardOrder.length - 1) {
      setHistory((prev) => [...prev, index]);
      setIndex(index + 1);
      setFlipped(false);
      setFeedback('');
      setGuess('');
    }
  };

  const goToPrevCard = () => {
    if (index > 0) {
      setIndex(index - 1);
      setFlipped(false);
      setFeedback('');
      setGuess('');
    }
  };

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    const userGuess = guess.trim();
    const cardAnswer = cards[cardOrder[index]].answer.trim();

    if (
      normalize(userGuess) === normalize(cardAnswer) ||
      isPartialMatch(userGuess, cardAnswer)
    ) {
      setFeedback('✅ Correct!');
      setCurrentStreak((prev) => prev + 1);
    } else {
      setFeedback('❌ Try again!');
      setLongestStreak((prevLongest) =>
        currentStreak > (prevLongest ?? 0) ? currentStreak : prevLongest
      );
      setCurrentStreak(0);
    }
  };

  const handleShuffle = () => {
    const newOrder = shuffleArray(cardOrder);
    setCardOrder(newOrder);
    setIndex(0);
    setFlipped(false);
    setFeedback('');
    setGuess('');
    setShuffled(true);
  };

  const handleResetOrder = () => {
    setCardOrder([...Array(cards.length).keys()]);
    setIndex(0);
    setFlipped(false);
    setFeedback('');
    setGuess('');
    setShuffled(false);
  };

  return (
    <div>
      <h2>Flashcard Set: General Knowledge</h2>
      <p>A basic quiz for random knowledge facts.</p>
      <br />
      <p>Total Cards: {cards.length}</p>

      {/* Streak counters */}
      <div style={{ margin: '1rem 0', color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>
        Current Streak: <span style={{ color: '#ffd600' }}>{currentStreak}</span>
        {' '}| Longest Streak: <span style={{ color: '#00e676' }}>
          {longestStreak === null ? '' : longestStreak}
        </span>
      </div>

      <Flashcard card={cards[cardOrder[index]]} flipped={flipped} setFlipped={setFlipped} />

      <form onSubmit={handleGuessSubmit} style={{ marginTop: '1rem' }}>
        <label htmlFor="guess-input" style={{ color: 'white', fontWeight: 'bold' }}>
          Your Guess:
        </label>
        <input
          id="guess-input"
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          style={{ marginLeft: '0.5rem', padding: '0.5rem', fontSize: '1rem' }}
        />
        <button type="submit" style={{ marginLeft: '0.5rem' }}>Submit</button>
      </form>
      {feedback && (
        <div style={{ marginTop: '0.5rem', fontWeight: 'bold', color: 'white', textShadow: '1px 1px 4px #000' }}>
          {feedback}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '1rem 0' }}>
        <button
          className="nextCard"
          onClick={goToPrevCard}
          disabled={index === 0}
          style={{
            opacity: index === 0 ? 0.5 : 1,
            pointerEvents: index === 0 ? 'none' : 'auto',
            backgroundColor: index === 0 ? '#bbb' : undefined,
            minWidth: '48px',
            minHeight: '48px',
            fontSize: '2rem'
          }}
        >
          ⭠
        </button>
        <button
          className="nextCard"
          onClick={goToNextCard}
          disabled={index === cardOrder.length - 1}
          style={{
            opacity: index === cardOrder.length - 1 ? 0.5 : 1,
            pointerEvents: index === cardOrder.length - 1 ? 'none' : 'auto',
            backgroundColor: index === cardOrder.length - 1 ? '#bbb' : undefined,
            minWidth: '48px',
            minHeight: '48px',
            fontSize: '2rem'
          }}
        >
          ⭢
        </button>
        {!shuffled ? (
          <button
            className="nextCard"
            onClick={handleShuffle}
            style={{
              minWidth: '48px',
              minHeight: '48px',
              fontSize: '1.2rem',
              backgroundColor: '#777171',
              color: 'white'
            }}
          >
            Shuffle
          </button>
        ) : (
          <button
            className="nextCard"
            onClick={handleResetOrder}
            style={{
              minWidth: '48px',
              minHeight: '48px',
              fontSize: '1.2rem',
              backgroundColor: '#1976d2',
              color: 'white'
            }}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default FlashcardList;

