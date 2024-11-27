import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import SearchHotelsScreen from './src/Screens/SearchHotelsScreen';
import HotelsListScreen from './src/Screens/HotelsListScreen';
import HotelBookingDetails from './src/Screens/HotelBookingDetails';
import LoginScreen from './src/Screens/LoginScreen';
import MyAccountScreen from './src/Screens/MyAccountScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import PermissionRequestsListScreen from './src/Screens/PermissionRequestsListScreen';
import Test1Screen from './src/Screens/Test1Screen';
import MedicalProcedureScreen from './src/Screens/MedicalProcedureScreen';
import HospitalListScreen from './src/Screens/HospitalListScreen';
import HospitalDetailsScreen from './src/Screens/HospitalDetailsScreen';
import BookFlightScreen from './src/Screens/BookFlightScreen';
import FlightsListScreen from './src/Screens/FlightsListScreen';
import FlightBookingDetails from './src/Screens/FlightBookingDetails';
import MyHotelBookings from './src/Screens/MyHotelBookings';
import HotelBookingConfirmation from './src/Screens/HotelBookingConfirmation';
import FlightBookingConfirmation from './src/Screens/FlightBookingConfirmation';
import MyFlightBookings from './src/Screens/MyFlightBookings';
import HospitalSignUpScreen from './src/Screens/HospitalSignUpScreen';
import HospitalLoginScreen from './src/Screens/HospitalLoginScreen';
import SignUpSelectionScreen from './src/Screens/SignUpSelectionScreen';
import AddDoctorScreen from './src/Screens/AddDoctorScreen';
import HospitalHomeScreen from './src/Screens/HospitalHomeScreen';
import CompleteFacilityProfileScreen from './src/Screens/CompleteHospitalProfileScreen';
import BookDoctorScreen from './src/Screens/BookDoctorScreen';
import AppointmentScheduleScreen from './src/Screens/AppointmentScheduleScreen';
import MyAppointmentsBookings from './src/Screens/MyAppointmentsBookings';
import AppointmentConfirmationScreen from './src/Screens/AppointmentConfirmationScreen';
import AddMedicalRecordScreen from './src/Screens/AddMedicalRecordScreen';
import MedicalRecordSummaryScreen from './src/Screens/MedicalRecordSummaryScreen';
import MedicalRecordsVaultScreen from './src/Screens/MedicalRecordsVaultScreen';
import XRayScreen from './src/Screens/XRayScreen';
import TestResultsScreen from './src/Screens/Test ResultsScreen';
import PrescriptionsScreen from './src/Screens/PrescriptionsScreen';
import ImagingScreen from './src/Screens/ImagingScreen';
import TreatmentHistoryScreen from './src/Screens/TreatmentHistoryScreen';
import DiagnosisScreen from './src/Screens/DiagnosisScreen';
import HomeScreen from './src/Screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        {/* Search Hotels */}
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ title: 'Search Hotels', headerShown: false }} 
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ title: 'Hotel Details' }} 
        />
        <Stack.Screen 
          name="MedicalProcedureScreen" 
          component={MedicalProcedureScreen} 
          options={{ title: 'Hotel Details' }} 
        />
       
      
         <Stack.Screen 
          name="HospitalListScreen" 
          component={HospitalListScreen} 
          options={{ title: 'Hotel Details' }} 
        />


<Stack.Screen 
          name="HospitalDetailsScreen" 
          component={HospitalDetailsScreen} 
          options={{ title: 'Hotel Details' }} 
        />

<Stack.Screen 
          name="BookDoctorScreen" 
          component={BookDoctorScreen} 
          options={{ title: 'Hotel Details' }} 
        />

<Stack.Screen 
          name="AppointmentScheduleScreen" 
          component={AppointmentScheduleScreen} 
          options={{ title: 'Hotel Details' }} 
        />

<Stack.Screen 
          name="SignUpSelectionScreen" 
          component={SignUpSelectionScreen} 
          options={{ title: 'Hotel Details' }} 
        />

<Stack.Screen 
          name="CompleteFacilityProfileScreen" 
          component={CompleteFacilityProfileScreen} 
          options={{ title: 'Hotel Details' }} 
        />

<Stack.Screen 
          name="HospitalSignUpScreen" 
          component={HospitalSignUpScreen} 
          options={{ title: 'Hotel Details' }} 
        />

<Stack.Screen 
          name="RegisterScreen" 
          component={RegisterScreen} 
          options={{ title: 'Hotel Details' }} 
        />

      
<Stack.Screen 
          name="AddMedicalRecordScreen" 
          component={AddMedicalRecordScreen} 
          options={{ title: 'Available Flights' }} 
        />

        <Stack.Screen 
          name="AddDoctorScreen" 
          component={AddDoctorScreen} 
          options={{ title: 'Available Flights' }} 
        />
        <Stack.Screen 
          name="FlightBookingDetails" 
          component={FlightBookingDetails} 
          options={{ title: 'Flight Details' }} 
        />

<Stack.Screen 
          name="HospitalHomeScreen" 
          component={HospitalHomeScreen} 
          options={{ title: 'Flight Booking Confirmed' }} 
        />


<Stack.Screen 
          name="MyAppointmentsBookings" 
          component={MyAppointmentsBookings} 
          options={{ title: 'Flight Booking Confirmed' }} 
        />



<Stack.Screen 
          name="MedicalRecordsVaultScreen" 
          component={MedicalRecordsVaultScreen} 
          options={{ title: 'Flight Booking Confirmed' }} 
        />

<Stack.Screen 
          name="XRayScreen" 
          component={XRayScreen} 
          options={{ title: 'Flight Booking Confirmed' }} 
        />


<Stack.Screen 
          name="TestResultsScreen" 
          component={TestResultsScreen} 
          options={{ title: 'Flight Booking Confirmed' }} 
        />


<Stack.Screen 
          name="PrescriptionsScreen" 
          component={PrescriptionsScreen} 
          options={{ title: 'Flight Booking Confirmed' }} 
        />

<Stack.Screen 
          name="ImagingScreen" 
          component={ImagingScreen} 
          options={{ title: 'Flight Booking Confirmed' }} 
        />
        
        <Stack.Screen 
          name="TreatmentHistoryScreen" 
          component={TreatmentHistoryScreen} 
          options={{ title: 'Flight Booking Confirmed' }} 
        />
        
        <Stack.Screen 
          name="DiagnosisScreen" 
          component={DiagnosisScreen} 
          options={{ title: 'Flight Booking Confirmed' }} 
        />
<Stack.Screen 
          name="MedicalRecordSummaryScreen" 
          component={MedicalRecordSummaryScreen} 
          options={{ title: 'Flight Booking Confirmed' }} 
        />


<Stack.Screen 
          name="AppointmentConfirmationScreen" 
          component={AppointmentConfirmationScreen} 
          options={{ title: 'Flight Booking Confirmed' }} 
        />

        <Stack.Screen 
  name="MyFlightBookings" 
  component={MyFlightBookings} 
  options={{ title: 'My Flight Bookings' }} 
/>
<Stack.Screen 
  name="SearchHotelsScreen" 
  component={SearchHotelsScreen} 
  options={{ title: 'Search For Hotels' }} 
/>


      </Stack.Navigator>
    </NavigationContainer>
  );
}
