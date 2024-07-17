import axios from 'axios';

export const FETCH_DATA = 'FETCH_DATA';

export const fetchData = (symbol) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/data/${symbol}`);
    dispatch({
      type: FETCH_DATA,
      payload: res.data,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
