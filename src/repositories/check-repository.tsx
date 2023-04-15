import axios from 'axios';

const API_URL = 'https://check-text-api-bfkg.vercel.app';

const checkForProfanity = async (text: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/check`, { params: { text } });
    return data.containsProfanity;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const returnProfanity = async (text: string) => {
    try {
      const { data } = await axios.get(`${API_URL}/return`, { params: { text } });
      console.log(data.containsProfanity);
      console.log(text);
      return data.containsProfanity;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export { checkForProfanity, returnProfanity };