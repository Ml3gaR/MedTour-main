import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'

import AppText from '../AppText';

import colors from '../../config/colors';

function HotelCard({ image, name, distance, price, rating, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={() => console.log(name,distance,price,rating)}>
            <View style={styles.card}>

                <View style={styles.imageContainer}>
                    <Image source={image} style={styles.image}/>
                </View>

                <View style={styles.details}>
                    <View style={styles.nameAndRating}>

                        <AppText style={styles.name}> {name} </AppText>

                        <View style={styles.ratingContainer}>
                            <MaterialCommunityIcons name="star" size={17} color={colors.rating}/>
                            <AppText style={styles.rating}> {rating} </AppText>

                        </View>
                    </View>

                    <View style={styles.distanceContainer}>
                        <MaterialCommunityIcons name="map-marker-outline" size={14} color={colors.medium} style={styles.locationIcon}/>
                        <AppText style={styles.distance}> {distance}m from airport </AppText>
                    </View>

                    <AppText style={styles.priceText}><AppText style={styles.price}>${price} </AppText>/ night</AppText>

                </View>   

            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card:{
        width: "100%",
        height:300,
        backgroundColor: colors.white,
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "95%",
        height: 200,
        borderRadius: 10,
    },
    details: {
        paddingLeft: 10,
    },
    nameAndRating: {
        marginTop: 5,
        flexDirection: "row",
    },
    name: {
        fontWeight: "bold",
    },
    ratingContainer: {
        marginLeft: 170,
        flexDirection: "row",
        backgroundColor: colors.ratingBackground,
        borderRadius: 15,
        width: 60,
        height:30,
        justifyContent:"center",
        alignItems: "center",
    },
    rating: {
        fontSize: 16,
        color: colors.rating,
    },
    distanceContainer: {
    flexDirection: "row",
    },
    distance: {
        fontSize: 14,
        color: colors.medium,
        marginTop: -1,
        marginLeft: -2
    },
    price: {
        fontWeight: "bold",
        color: colors.primary,
    },
    priceText: {
        color: colors.medium,
    }
})
export default HotelCard;