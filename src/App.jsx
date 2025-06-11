import './App.css';
import ResourceCard from './components/ResourceCard';
import resources from './data/resources';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Community Resources Board</h1>
        <p><b>Helping you find the best tools to grow in tech 💻</b></p>
      </header>
      <main className="card-container">
        {resources.map((resource, index) => (
          <ResourceCard key={index} {...resource} />
        ))}
      </main>
    </div>
  );
}

export default App;

