import './App.css';
import {Routes, Route} from "react-router-dom"

import Home from './pages/Home';
import Wallet from './pages/Wallet'
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
    </div>
  );
}

export default App;
