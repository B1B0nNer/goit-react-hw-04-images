import axios from 'axios'; //
const API_KEY = '37799453-78811c6f09fe99e1b830b1318';
axios.defaults.baseURL = 'https://pixabay.com/api/';
export default async function getImages(query, page) {
  try {
    const response = await axios.get(
      `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}