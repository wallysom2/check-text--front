import React, { useState } from 'react';
import { checkForProfanity } from './../../repositories/check-repository';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Title, Input, Button } from '../../styles/Container-styles';

const App: React.FC = () => {
const [text, setText] = useState<string>('');
const [containsProfanity, setContainsProfanity] = useState<boolean>(false);

const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setText(event.target.value);
};


const handleButtonClick = async () => {
  if (!text.trim()) {
    toast.error('Por favor, insira um texto válido');
    return;
  }
try {
const containsProfanity: boolean = await checkForProfanity(text);
setContainsProfanity(containsProfanity);
if (containsProfanity) {
    const messages: string[] = [
      "Não pode falar assim!",
      "Isso não é legal!",
      "Palavras Inapropriadas!",
      "Essas palavras não são legais!"
    ];
    const randomIndex: number = Math.floor(Math.random() * messages.length);
    toast.error(messages[randomIndex]);
  } else {
    const messages: string[] = [
      "Parabéns! Sem xingamentos!",
      "Muito bem, sem palavrões!",
      "Continue assim, sem ofensas!",
      "Boa! Você é uma pessoa educada!"
    ];
    const randomIndex: number = Math.floor(Math.random() * messages.length);
    toast.success(messages[randomIndex]);
  }

} catch (error) {
  console.error(error);
}
};

return (
<>
<Container style={{ 
    backgroundColor: containsProfanity ? '#FFE7E7' : '#E6F5FF', 
    }}>

<ToastContainer autoClose={3000} />

<Title style={{ 
    color: containsProfanity ? '#FF4545' : '#0072C6' }}
    >Verifique seu Texto</Title>

<Input type="text" value={text} onChange={handleTextChange}/>

<Button onClick={handleButtonClick} 
style={{ 
    backgroundColor: containsProfanity ? '#FF4545' : '#0072C6', 
    cursor: 'pointer' }}> Send</Button>
</Container>
</>
);
};

export default App;