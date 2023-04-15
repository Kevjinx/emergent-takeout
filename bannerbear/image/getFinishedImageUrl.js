import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const getFinishedImageUrl = async (url) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.BANNERBEAR_API_KEY}`,
    },
  });
  console.log('response: ', response.data['image_url']);
  return response.data['image_url'];
};

export default getFinishedImageUrl;
