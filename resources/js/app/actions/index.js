export const GET_ALL_FORUMS = 'GET_ALL_FORUMS';

import ForumsPage from '../apis/ForumsPage';


export const getAllForumsAction = () => async dispatch => {
    let response = await ForumsPage.get('/');
    dispatch({
        type: GET_ALL_FORUMS,
        payload: response.data,
    });
}