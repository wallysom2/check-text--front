import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Title, Input, Button, List, ListItem, ButtonList} from '../../styles/Container-styles';
import axios from 'axios';

type BlacklistProps = {};

const API_URL = 'https://check-text-api-bfkg.vercel.app';

const BlackListPage: React.FC<BlacklistProps> = () => {
const [blacklist, setBlacklist] = useState<string[]>([]);
const [newWord, setNewWord] = useState<string>('');

useEffect(() => {
const storedBlacklist = localStorage.getItem('blacklist');
if (storedBlacklist) {
setBlacklist(JSON.parse(storedBlacklist));
}
}, []);

const handleAddWord = async () => {
if (!newWord.trim()) {
return toast.error('Por favor, digite uma palavra válida');
}
try {
const response = await axios.post(`${API_URL}/blacklist/add`, { word: newWord });
console.log(response);
const updatedBlacklist = [...blacklist, newWord];
setBlacklist(updatedBlacklist);
localStorage.setItem('blacklist', JSON.stringify(updatedBlacklist));

setNewWord('');
toast.warning(`${newWord} agora é um xingamento!`);
} catch (error) {
console.error(error);
toast.dark(`Não foi possível adicionar ${newWord}`);
}
};

const handleRemoveWord = async (word: string) => {
try {
const response = await axios.post(`${API_URL}/blacklist/remove`, { word });
console.log(response);
const updatedBlacklist = blacklist.filter((item) => item !== word);
  setBlacklist(updatedBlacklist);
  localStorage.setItem('blacklist', JSON.stringify(updatedBlacklist));

  toast.success(`${word} foi removido da lista negra`);
} catch (error) {
  console.error(error);
  toast.dark(`Não foi possível remover ${word}`);
}
};

return (
<>
<Container>
<ToastContainer autoClose={3000} />
<Title style={{
paddingTop: '100px'}}
>Incluir como Inapropriada</Title>
<Input type="text" value={newWord} onChange={(e) => setNewWord(e.target.value)} />
<Button onClick={handleAddWord}>Adicionar</Button>
<List>
{blacklist.map((word) => (
<ListItem key={word}>
<ButtonList onClick={() => handleRemoveWord(word)}>{word}</ButtonList>
</ListItem>
))}
</List>
</Container>
</>
);
};

export default BlackListPage;