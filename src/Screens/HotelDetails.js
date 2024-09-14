import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppText from '../components/AppText';
import Header from '../components/Header';
import HotelMinicard from '../components/cards/HotelMinicard';
import Screen from "../components/Screen";
import App from '../../App';
import colors from '../config/colors';


function HotelDetails( {image, name, rating, price, about, facilities} ) {
    return (
        <Screen>
            <View styles={styles.container}>
                <Header title="Hotel Details"/>
                <HotelMinicard
                image={image}
                name={name}
                rating={rating}
                price={price}
                />

                <View style={styles.aboutContainer}>
                    <AppText style={styles.aboutHeader}> About </AppText>
                    <AppText style={styles.aboutBody}> {about} </AppText>
                </View>

                <View style={styles.facilitiesContainer}>
                    <AppText style={styles.facilitiesHeader}> Facilites </AppText>
                    <AppText style={styles.facilities}> {facilities} </AppText>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    aboutContainer: {
        marginTop: 50,
        padding: 10,
    },
    aboutHeader: {
        fontWeight: "bold",
    },
    aboutBody: {
        color: colors.medium,
    },
    facilitiesContainer: {
        marginTop: 30,
        padding: 10,
    },
    facilitiesHeader: {
        fontWeight: "bold",
    },
    facilities: {
        color: colors.medium,
    },
});
export default HotelDetails;