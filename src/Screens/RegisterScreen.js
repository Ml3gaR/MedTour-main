import React from 'react';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import {AppForm, AppFormField, SubmitButton} from '../components/forms';


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    username: Yup.string().required().min(4).label("Username"),
    mobileNumber:Yup.string().required()
    .matches(/^[0-9]{10,15}$/, "Mobile number is not valid").label("Mobile Number"),
    password: Yup.string().required().min(6).label("Password")
});

function RegisterScreen() {
    return (
        <Screen>
            <AppForm
            initialValues={{
                email: "",
                username: "",
                mobileNumber: "",
                passwrod: "",
            }}
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
                autoCapatiliz="none"
                autoCorrect={false}
                icon="account"
                name="username"
                placeholder="Name"
                textContetType="username"
                />

                <AppFormField
                autoCorrect={false}
                icon="phone"
                keyboardType="phone-pad"
                name="mobileNumber"
                placeholder="Mobile Number"
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

                <SubmitButton title="Register"/>
            </AppForm>
        </Screen>
    );
}

export default RegisterScreen;