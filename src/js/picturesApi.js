import axios from "axios";

export default class PicturesApi {
  constructor() {
    this.serchQuery = '';
    this.page = 1;
  }

  async fetchPictures() {
    const GET_URL = 'https://pixabay.com/api/';
    const API_KEY = 'key=29230228-70eed17d551abdaa1dfb16eb3';
    const IMAGE_TYPE = 'image_type=photo';
    const ORIENTATION = 'orientation=horizontal';
    const SAFESEARCH = 'safesearch=true';
    const PER_PAGE = 'per_page=40'

    const url = `${GET_URL}?${API_KEY}&q=${this.serchQuery.trim()}&${IMAGE_TYPE}&${ORIENTATION}&${SAFESEARCH}&${PER_PAGE}&page=${this.page}`;

    try {
      const response = await axios.get(url);
      this.page += 1;
      return response.data;
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  // * before async/await
  // fetchPictures() { 
  //   const GET_URL = 'https://pixabay.com/api/';
  //   const API_KEY = 'key=29230228-70eed17d551abdaa1dfb16eb3';
  //   const IMAGE_TYPE = 'image_type=photo';
  //   const ORIENTATION = 'orientation=horizontal';
  //   const SAFESEARCH = 'safesearch=true';
  //   const PER_PAGE = 'per_page=40'

  //   const url = `${GET_URL}?${API_KEY}&q=${this.serchQuery.trim()}&${IMAGE_TYPE}&${ORIENTATION}&${SAFESEARCH}&${PER_PAGE}&page=${this.page}`;

  // if (this.serchQuery.trim()) {
  //   return fetch(url)
  //     .then(response => {
  //       if (response.ok) {
  //         this.page += 1;
  //         return response.json();
  //       }
  //       throw new Error('Error fetching data');
  //     })
  //     .catch(error => {
  //       console.error('Error: ', error);
  //     })
  // }
  // }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.serchQuery;
  }

  set query(newQuery) {
    this.serchQuery = newQuery;
  }
}