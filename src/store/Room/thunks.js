import axios from "axios";
import { setCategories, setQuestions } from "./slice";

export const getQuestions =
  (limit, categories, diff) => async (dispatch, getState) => {
    const response = await axios.get(
      `https://the-trivia-api.com/api/questions?categories=${categories}&limit=${limit}&region=NL&difficulty=${diff}`
    );
    dispatch(setQuestions(response.data));
  };

export const getCategories = () => async (dispatch, getState) => {
  const response = await axios.get(`https://the-trivia-api.com/api/categories`);
  dispatch(setCategories(response.data));
};
