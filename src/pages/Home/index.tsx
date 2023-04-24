import React, { useState } from 'react';
import { checkForProfanity } from './../../repositories/check-repository';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Title, Input, Button } from '../../styles/Container-styles';

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [containsProfanity, setContainsProfanity] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    if (!text.trim() || isLoading) {
      toast.error('Por favor, insira um texto válido');
      return;
    }
    setIsLoading(true);

    try {
      const profanityResult = await checkForProfanity(text);
      const containsProfanity = !!profanityResult.length; // Verifica se o array retornado pela API é vazio
      setContainsProfanity(containsProfanity);
      console.log(containsProfanity);
      
      if (!containsProfanity) {
        toast.success("Parabéns! Sem xingamentos!");
      } else {
        toast.error("Não pode falar assim!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container style={{ backgroundColor: containsProfanity ? '#FFE7E7' : '#E6F5FF' }}>
        <ToastContainer autoClose={3000} />
        <Title style={{ color: containsProfanity ? '#FF4545' : '#0072C6' }}>Verifique seu Texto</Title>
        <Input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <Button
          onClick={handleButtonClick}
          style={{ backgroundColor: containsProfanity ? '#FF4545' : '#0072C6', cursor: 'pointer' }}
          disabled={!text.trim() || isLoading}
        >
          {isLoading ? "Verificando..." : "Send"}
        </Button>
      </Container>
    </>
  );
}

export default App;
