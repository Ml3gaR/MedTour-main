import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'

import AppText from '../AppText';

import colors from '../../config/colors';

function hospitalCard({ image, name,  specialist, distance, price, rating, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>

                <Image source={image} style={styles.image}/>

                <View style={styles.detailes}>

                    <AppText style={styles.name}> {name} </AppText>
                    <AppText style={styles.specialist}> {specialist} </AppText>

                    <View style={styles.ratingContainer}>
                        <MaterialCommunityIcons name="star" size={17} color={colors.rating}/>
                        <AppText style={styles.rating}> {rating} </AppText>
                    </View>

                    <View style={styles.distanceAndPrice}>
                        
                        <MaterialCommunityIcons name="map-marker-outline" size={14} color={colors.medium} style={styles.locationIcon}/>
                        <AppText style={styles.distance}> {distance}m from airport</AppText>

                        <AppText style={styles.price}> ${price} </AppText>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback >
    );
}

const styles = StyleSheet.create({
    card:{
        width: "90%",
        height:130,
        flexDirection: "row",
        backgroundColor: colors.white,
        borderColor: colors.light,
        borderWidth:1,
        borderRadius: 10,
        paddingLeft: 10,
        paddingTop: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    image: {
        height: "90%",
        width: "30%",
        borderRadius: 10,
        marginRight: 10,
    },
    name: {
        fontWeight: "bold", 
    },
    specialist: {
        fontSize: 14,
        color: colors.medium,
    },
    ratingContainer: {
        flexDirection: "row",
        backgroundColor: colors.ratingBackground,
        marginTop: 8,
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
    distanceAndPrice: {
        flexDirection: "row",
    },
    distance: {
        fontSize: 14,
        color: colors.medium,
        marginTop: 3,
        marginLeft: -3,
    },
    locationIcon: {
        marginTop: 4,
    },
    price: {
        fontWeight: "bold",
        color: colors.primary,
        textAlign: "right",
        marginLeft: 35,
    },

})
export default hospitalCard;