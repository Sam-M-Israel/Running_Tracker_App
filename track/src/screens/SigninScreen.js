import React, { useContext } from 'react';
import { StyleSheet, View} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';


const SigninScreen = () =>{
    const { state, signin, clearErrorMessage } = useContext(AuthContext);

    return (
    <View style={styles.container}>
        <NavigationEvents 
            onWillBlur={clearErrorMessage}
        />
        <AuthForm
            headerText="Sign In to Your Account"
            errorMessage={state.errorMessage}
            buttonTitle="Sign In!"
            onSubmit={signin}
        />
        <NavLink 
            routeName="Signup"
            text="Don't have an account? Sign up now!"
        />
    </View>
    );
};
SigninScreen.navigationOptions = () => {
    return {
        header: null
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250
    }
});

export default SigninScreen;