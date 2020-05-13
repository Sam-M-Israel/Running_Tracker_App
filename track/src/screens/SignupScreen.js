import React, { useContext } from 'react';
import { StyleSheet, View} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink'

const SignupScreen = ({ navigation }) =>{
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    return (
    <View style={styles.container}>
        <NavigationEvents 
            onWillBlur={clearErrorMessage}
        />
        <AuthForm
            headerText="Sign up for Tracker"
            errorMessage={state.errorMessage}
            buttonTitle="Sign Up!"
            onSubmit={signup}
        />
        <NavLink 
            routeName="Signin"
            text="Already have an account? Sign in instead!"
        />
    </View>
    );
};
SignupScreen.navigationOptions = () => {
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

export default SignupScreen;