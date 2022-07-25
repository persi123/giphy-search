import axios from 'axios';

export const getGiphy = async () => {
  try {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/trending?api_key=z1srBGg3BKllHuX7OkDMOO8etqcyImRu&limit=25&rating=g`
    );

    return response.data.data;
  } catch (err) {
    alert(err);
  }
};

export const getSearchGiphy = async ({ searchQuery, page }) => {
  try {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=z1srBGg3BKllHuX7OkDMOO8etqcyImRu&q=${searchQuery}&limit=20&offset=${
        page * 20
      }&rating=g&lang=en`
    );
    return response.data.data;
  } catch (err) {
    alert(err);
  }
};
