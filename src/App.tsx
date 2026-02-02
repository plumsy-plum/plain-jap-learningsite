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

function App() {
  const [user, setUser] = useState<any>(null);

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
          <Route path="/hiragana" element={<Hiragana />} />
          <Route path="/katakana" element={<Katakana />} />
          <Route path="/kanji" element={<Kanji />} />
          <Route path="/quiz/:level" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;