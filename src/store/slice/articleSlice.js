import { createSlice } from '@reduxjs/toolkit';
// import { SET_LOADING } from '../../utils/actionType';

// const prevState = SET_LOADING


const initialState = {
    loading: false,
    articles: []
}


const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setArticle: (state, action) => {
            state.articles = action.payload;
        }
    }
})


export const { setLoading, setArticle } = articleSlice.actions;
export default articleSlice.reducer;