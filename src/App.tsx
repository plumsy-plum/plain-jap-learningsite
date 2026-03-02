import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LevelPage from './pages/LevelPage';
import Quiz from './pages/Quiz';
import CategoryTable from './pages/CategoryTable';
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/level/:levelId" element={<LevelPage />} />
          <Route path="/quiz/:level" element={<Quiz />} />
          <Route path="/category/:type" element={<CategoryTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;