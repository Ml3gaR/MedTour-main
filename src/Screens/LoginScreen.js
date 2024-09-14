import React from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Yup from 'yup';


import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton } from '../components/forms'

const validationSchema = Yup.object().shape({   //rules for the forms
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password")
});

function LoginScreen() {

    return (
        <Screen style={styles.container}>
            <Image 
            style={styles.logo}
            source={require("../../assets/MedTourLogo.png")}/>

            <AppForm
            initialValues={{ email: "", password: ""}}
            onSubmit={values => console.log(values)}
            validationSchema={validationSchema}
            >
            
                <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="email"
                placeholder="Email"
                textContetType="emailAdress"
                />

                <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                name="password"
                placeholder="Password"
                secureTextEntry
                textContetType="password"
                />


                <SubmitButton title="Login" />
                
            
            </AppForm>

            
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    logo: {
        width: 190,
        height: 100,
        alignSelf: "center",
        marginTop: 50,
        marginBottom:20,
    },
})
export default LoginScreen;