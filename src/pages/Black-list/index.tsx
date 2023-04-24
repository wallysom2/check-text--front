import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	Button,
	ButtonList,
	Container,
	Input,
	List,
	ListItem,
	Title
} from '../../styles/Container-styles';

const API_URL = 'https://check-text-api-git-main-wallysom2.vercel.app';

const App = () => {
	const [blacklist, setBlacklist] = useState<string[]>([]);
	const [word, setword] = useState<string>('');

	const handleAddWord = async () => {
		try {
			await axios.post(`${API_URL}/blacklist/add`, { word: word });
			setBlacklist([...blacklist, word]);
			setword('');
			console.log(`${word} adicionada com sucesso!`);
		} catch (error) {
			console.error(error);
			toast.error(`${word} já está na lista negra`);
		}
	};

	const handleRemoveWord = async (word: string) => {
		try {
			await axios.post(`${API_URL}/blacklist/remove`, { word });
			setBlacklist(blacklist.filter((w) => w !== word));
			toast.success(`${word} foi removido da lista negra`);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const getWords = async () => {
			try {
				const response = await axios.get(`${API_URL}/blacklist`);
				setBlacklist(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		getWords();
	}, []);

	return (
		<>
			<Container>
				<ToastContainer autoClose={2000} />
				<Title style={{ paddingTop: '100px' }}>
					Palavras Inapropriadas
				</Title>
				<Input
					type="text"
					value={word}
					onChange={(e) => setword(e.target.value)}
				/>
				<Button onClick={handleAddWord}>Adicionar</Button>
				<List>
					{blacklist.map((word) => (
						<ListItem key={word}>
							<ButtonList onClick={() => handleRemoveWord(word)}>
								{word}
							</ButtonList>
						</ListItem>
						
					))}
				</List>
			</Container>
		</>
	);
};

export default App;
