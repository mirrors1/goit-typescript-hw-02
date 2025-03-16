import axios from 'axios';

const API_KEY = `oMM66UEk0wpDqn_BaKo8elZmKDGab7y7pjZ0NUhimDk`;

export const fetchImages = async (query, page, perPage = 16) => {
  const response = await axios.get(`https://api.unsplash.com/search/photos?`, {
    params: {
      client_id: API_KEY,
      query: query,
      page: page,
      per_page: perPage,
      order_by: `views`,
      orientation: `landscape`,
    },
  });
  return response.data;
};
