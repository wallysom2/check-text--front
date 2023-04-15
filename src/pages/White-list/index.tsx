import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Title, Input, Button, List, ListItem, ButtonList } from '../../styles/Container-styles';
import axios from 'axios';

type WhitelistProp = {};

const API_URL = 'http://localhost:3000';

const WhiteListPage: React.FC<WhitelistProp> = () => {
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [newWord, setNewWord] = useState<string>('');

  useEffect(() => {
    const storedWhitelist = localStorage.getItem('whitelist');
    if (storedWhitelist) {
      setWhitelist(JSON.parse(storedWhitelist));
    }
  }, []);

  const handleAddWord = async () => {
    if (!newWord.trim()) {
      return toast.error('Por favor, digite uma palavra válida');
    }
    try {
      const response = await axios.post(`${API_URL}/whitelist/add`, { word: newWord });
      console.log(response);
      const updatedWhitelist = [...whitelist, newWord];
      setWhitelist(updatedWhitelist);
      localStorage.setItem('whitelist', JSON.stringify(updatedWhitelist));

      setNewWord('');
      toast.success(`${newWord} agora é uma palavra permitida!`);
    } catch (error) {
      console.error(error);
      toast.error(`Não foi possível adicionar ${newWord}`);
    }
  };

  const handleRemoveWord = async (word: string) => {
    try {
      const response = await axios.post(`${API_URL}/whitelist/remove`, { word });
      console.log(response);
      const updatedWhitelist = whitelist.filter((item) => item !== word);
      setWhitelist(updatedWhitelist);
      localStorage.setItem('whitelist', JSON.stringify(updatedWhitelist));

      toast.success(`${word} foi removido da lista branca`);
    } catch (error) {
      console.error(error);
      toast.error(`Não foi possível remover ${word}`);
    }
  };

  return (
    <>
      <Container style={{ backgroundColor: '#c5deb4' }}>
        <ToastContainer autoClose={3000} />
        <Title style={{ paddingTop: '100px', color: '#103f0b' }}>Cadastrar Exceção</Title>
        <Input
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="Digite uma palavra"
        />
        <Button onClick={handleAddWord}>Adicionar</Button>
        <List>
          {whitelist.map((word) => (
            <ListItem key={word}>
              <ButtonList onClick={() => handleRemoveWord(word)}>{word}</ButtonList>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default WhiteListPage;
