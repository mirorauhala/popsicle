import {Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Settings from './pages/Settings';

function App() {
  return (
    <>
      <Navbar />

      <div id="routes">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/settings" element={<Settings />}/>
        </Routes>
      </div>
      
    </>
  );
}

export default App;
