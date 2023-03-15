import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: [],
    categories: [],
    players: [],
    currentQuestion: {},
    playerCount: 0,
    room: null,
};

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoom: (state, action) => {
            state.room = action.payload;
        },
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setPlayers: (state, action) => {
            state.players = action.payload;
        },
        setCurrentQuestion: (state, action) => {},
        setPlayerCount: (state, action) => {
            state.playerCount = action.payload;
        },
    },
});

export const { setQuestions, setCategories, setRoom } = roomSlice.actions;
export default roomSlice.reducer;
