import axios from 'axios';

const API_KEY = '32250551-625e2bee036e3bd3a420787dd';
const BASE_URL = 'https://pixabay.com/api/';

export const PicsApi = async (searchQuery, page) => {
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&per_page=12&image_type=photo&orientation=horizontal`;
  const { data } = await axios.get(url);
  return data;
};
