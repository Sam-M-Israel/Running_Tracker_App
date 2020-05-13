import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { errorMessage: '', token: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        case 'signout':
            return { token: null, errorMessage: '' };
        default:
            return state;
    }

};
const tryLocalSignIn = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if(token) {
        dispatch({ type: 'signin', payload: token});
        navigate('TrackList');
    } else {
        navigate('Signup');
    }

};

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message' });
};

const signup = (dispatch) => async ({ email, password }) => {
    try{
        //make api request to sign up with that email and password
        const response = await trackerApi.post('/signup', { email, password })
        await AsyncStorage.setItem('token', response.data.token);
        
        //if we sign up, modify our state, and say that we are authenticated
        dispatch({ type: 'signin', payload: response.data.token })

        //Navigate to main flow
        navigate('TrackList');
    } catch (err){
        //if signing up fails, we probably need to reflect error message somewhere
        dispatch({ 
            type: 'add_error', 
            payload: 'Something went wrong with sign up'
        });
    }
};

const signin = (dispatch) => async ({ email, password }) => {
    try {
        //try to sign in
        const response = await trackerApi.post('/signin', { email, password })
        await AsyncStorage.setItem('token', response.data.token);
       
        //if we sign in, modify our state, and say that we are authenticated
        dispatch({ type: 'signin', payload: response.data.token })

        //Navigate to main flow
        navigate('TrackList');
    } catch (err) {
        //handle error
        dispatch({ 
            type: 'add_error', 
            payload: 'Something went wrong with sign in'
        });
    }
}


const signout = (dispatch) => async () => {
    //somehow sign out
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('Signin');

}
export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignIn },
    { token: null, errorMessage: '' }
);