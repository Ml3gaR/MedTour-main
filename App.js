import React from 'react';
import HotelDetails from './Screens/HotelDetails';
import LoginScreen from './Screens/LoginScreen';
import MyAccountScreen from './Screens/MyAccountScreen';
import RegisterScreen from './Screens/RegisterScreen';
import PermissionRequestsListScreen from './Screens/PermissionRequestsListScreen';

const hotel = {
    image: require("./assets/Hotel1.png"),
    name: "Marriot Resorts..",
    rating: 4.1,
    price: 300,
    about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    facilities: "wifi",
};

export default function App() {
    // Uncomment the screen you want to view
    // return <LoginScreen />;
    // return <MyAccountScreen />;
     return <RegisterScreen />;
    // return <PermissionRequestsListScreen />;
    
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
