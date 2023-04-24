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
	Title,
} from '../../styles/Container-styles';

const API_URL = 'https://check-text-api-two.vercel.app';

const WhiteListPage = () => {
	const [whitelist, setWhitelist] = useState<string[]>([]);
	const [word, setword] = useState<string>('');

	const handleAddWord = async () => {
		try {
			await axios.post(`${API_URL}/whitelist/add`, { word: word });
			setWhitelist([...whitelist, word]);
			setword('');
			console.log(`${word} adicionada com sucesso!`);
		} catch (error) {
			console.error(error);
			toast.error(`${word} já é uma palavra permitida`);
		}
	};

	const handleRemoveWord = async (word: string) => {
		try {
			await axios.post(`${API_URL}/whitelist/remove`, { word });
			setWhitelist(whitelist.filter((w) => w !== word));
			toast.success(`${word} foi removido da lista de palavras permitidas`);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const getWords = async () => {
			try {
				const response = await axios.get(`${API_URL}/whitelist`);
				setWhitelist(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		getWords();
	}, []);

	return (
		<>
			<Container style={{ backgroundColor: '#c5deb4' }}>
				<ToastContainer autoClose={2000} />
				<Title style={{ paddingTop: '100px', color: '#103f0b' }}>
					Cadastrar Exceção
				</Title>
				<Input
					type="text"
					value={word}
					onChange={(e) => setword(e.target.value)}
				/>
				<Button onClick={handleAddWord}>Adicionar</Button>
				<List>
					{whitelist.map((word) => (
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

export default WhiteListPage;
