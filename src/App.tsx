import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/Global-styles';
import Home from './pages/Home';
import BlackListPage from './pages/Black-list';
import WhiteListPage from './pages/White-list';
import Navbar from './components/Navbar';



function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blacklist" element={<BlackListPage />} />
        <Route path="/whitelist" element={<WhiteListPage />} />
      </Routes>
    </>
  );
}

export default App;
