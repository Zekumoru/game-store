import PrimaryHeader from './PrimaryHeader';
import PrimaryNavigation from './primary-navigation/PrimaryNavigation';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <PrimaryHeader />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <PrimaryNavigation />
    </div>
  );
}

export default App;
