import './App.css';
import JokeDisplay from './components/JokeDisplay';

const appStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

function App() {

  return (
    <div className="App" style={appStyle}>
     <JokeDisplay/>
    </div>
  );
}

export default App;
