import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlackListPage from './pages/Black-list';
import Home from './pages/Home';
import WhiteListPage from './pages/White-list';
import GlobalStyles from './styles/Global-styles';

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
