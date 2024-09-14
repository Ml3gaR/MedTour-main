import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import AppText from '../AppText';

import colors from '../../config/colors';

function HotelMinicard({ image, name, rating, price }) {
    return (
        <View style={styles.card}>
            
            <Image source={image} style={styles.image}/>

            <View style={styles.details}>
                
                <View style={styles.nameAndRating}>
                    <AppText style={styles.name}> {name} </AppText>
                    
                    <View style={styles.ratingContainer}>
                        <MaterialCommunityIcons name="star" size={17} color={colors.rating}/>
                        <AppText style={styles.rating}> {rating} </AppText>
                    </View>

                </View>
                <AppText style={styles.price}> {price} <AppText style={styles.priceDetails}> / night</AppText></AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 400,
        height: 300,
        borderRadius: 20,
        justifyContent: "center",
        alignContent: "center",
    },
    image: {
        width: 400,
        height: 270,
        borderRadius: 20,
    },
    details: {
        backgroundColor: colors.white,
        borderColor: colors.light,
        borderWidth: 1,
        height: 80,
        width: 300,
        marginTop: -40,
        marginLeft: 50,
        borderRadius: 10,
        paddingLeft: 10,
    },
    nameAndRating: {
        flexDirection: "row",
        marginTop: 15,
    },
    name: {
        fontWeight: "bold",
    },
    ratingContainer: {
        flexDirection: "row",
        margin: "auto",
        backgroundColor: colors.ratingBackground,
        borderRadius: 10,
        marginLeft: 60,
    },
    price: {
        color: colors.primary,
        fontWeight: "bold",
        fontSize: 22,
    },
    priceDetails: {
        color: colors.medium,
        fontWeight: "100",
    }
})
export default HotelMinicard;