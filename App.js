import React, { useState } from 'react';
import { View, Button, StyleSheet, SafeAreaView } from 'react-native';
import HotelDetails from './src/Screens/HotelDetails';
import LoginScreen from './src/Screens/LoginScreen';
import MyAccountScreen from './src/Screens/MyAccountScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import PermissionRequestsListScreen from './src/Screens/PermissionRequestsListScreen';
import Test1Screen from './src/Screens/Test1Screen';
import MedicalProcedureScreen from './src/Screens/MedicalProcedureScreen';
import HospitalListScreen from './src/Screens/HospitalListScreen';
import HospitalDetailsScreen from './src/Screens/HospitalDetailsScreen';



export default function App() {

    const hotel = {
        image: require("./assets/Hotel1.png"),
        name: "Marriot Resorts..",
        rating: 4.1,
        price: 300,
        about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        facilities: "wifi",
    };

    // State to keep track of which screen to show
    const [currentScreen, setCurrentScreen] = useState('HotelDetails');

    const renderScreen = () => {
        switch (currentScreen) {
            case 'Test1Screenst1':
                return <Test1Screen />;
                case 'HospitalListScreen' :
                    return <HospitalListScreen/> 
                    case 'HospitalDetailsScreen' :
                    return <HospitalDetailsScreen/> 
                case 'MedicalProcedureScreen':
                return <MedicalProcedureScreen />;
            case 'Login':
                return <LoginScreen />;
            case 'MyAccount':
                return <MyAccountScreen />;
            case 'Register':
                return <RegisterScreen />;
            case 'PermissionRequests':
                return <PermissionRequestsListScreen />;
            case 'HotelDetails':
            default:
                return (
                    <HotelDetails
                        image={hotel.image}
                        name={hotel.name}
                        rating={hotel.rating}
                        price={hotel.price}
                        about={hotel.about}
                        facilities={hotel.facilities}
                    />
                );
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            {renderScreen()}

            {/* Buttons to switch between screens */}
            <Button title="Go to Login" onPress={() => setCurrentScreen('Login')} />
            <Button title="Go to MedicalProcedureScreen" onPress={() => setCurrentScreen('MedicalProcedureScreen')} />
            <Button title="Go to Test1Screen" onPress={() => setCurrentScreen('Test1Screen1')} />
            <Button title="Go to My Account" onPress={() => setCurrentScreen('MyAccount')} />
            <Button title="Go to Register" onPress={() => setCurrentScreen('Register')} />
            <Button title="Go to Permission Requests" onPress={() => setCurrentScreen('PermissionRequests')} />
            <Button title="Go to Hotel Details" onPress={() => setCurrentScreen('HotelDetails')} />
            <Button title="Go to Hospital List Screen" onPress={() => setCurrentScreen('HospitalListScreen')} />
            <Button title="Go to Hospital Details Screen" onPress={() => setCurrentScreen('HospitalDetailsScreen')} />


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
});