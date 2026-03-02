import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Hiragana from './pages/Hiragana';
import Katakana from './pages/Katakana';
import Kanji from './pages/Kanji';
import Quiz from './pages/Quiz';
import { initSession } from './utils/session';
import { loginAnonymously } from './utils/firebase';
import { APP_DATA } from './data/levels';
import type { LevelItem } from './data/levels';

function App() {
  const [user, setUser] = useState<any>(null);
  const [currentLevel, _setCurrentLevel] = useState<number>(1);

  // derive items for the level
  const getLevelItems = (): LevelItem[] => {
    const levelId = `L${currentLevel}`;
    const lvl = APP_DATA.find(l => l.levelId === levelId);
    return lvl ? lvl.items : [];
  };

  const currentItems = getLevelItems();

  useEffect(() => {
    // Firebase login
    loginAnonymously().then((u) => {
      setUser(u);
      console.log("User:", u?.uid);
    });

    initSession();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hiragana" element={<Hiragana items={currentItems} />} />
          <Route path="/katakana" element={<Katakana items={currentItems} />} />
          <Route path="/kanji" element={<Kanji items={currentItems} />} />
          <Route path="/quiz/:level" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;