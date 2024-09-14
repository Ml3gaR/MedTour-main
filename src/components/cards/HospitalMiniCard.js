import React from 'react';
import { View, StyleSheet, Image, } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';


import AppText from '../AppText';


import colors from '../../config/colors';

function HospitalMiniCard({ image, name,  specialist, distance, rating }) {
    return (
        <View style={styles.card}>

            <Image source={image} style={styles.image}/>

            <View style={styles.details}>
                    
                <AppText style={styles.name}> {name} </AppText>

                <View style={styles.specialistAndDistence}>
                    <View style={styles.specialist}>
                        <AppText style={styles.specialistAndDistenceText}> {specialist} </AppText>
                    </View>    
                            
                    <MaterialCommunityIcons name="map-marker-outline" size={14} color={colors.medium} style={styles.locationIcon}/>
                    <AppText style={styles.specialistAndDistenceText}>{distance}m from airport</AppText>
                </View>

                <View style={styles.ratingContainer}>
                    <MaterialCommunityIcons name="star" size={17} color={colors.rating}/>
                    <AppText style={styles.rating}> {rating} </AppText>
                </View>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    card: {
        width: 400,
        height: 100,
        borderColor: colors.light,
        borderWidth: 1,
        flexDirection: "row",
        alignContent: "center",
        borderRadius:10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    details: {
        flexDirection: "column",
        marginLeft: 5,
    },
    name:{
        fontWeight: "bold",
    },
    specialistAndDistence:{
        flexDirection: "row",
        marginVertical: 2,
    },
    specialistAndDistenceText: {
        fontSize: 14,
        color: colors.medium,
    },
    specialist: {
        marginRight: 20,
    },
    ratingContainer: {
        marginTop: 10,
        flexDirection: "row",
        backgroundColor: colors.ratingBackground,
        alignContent: "center",
        justifyContent: "center",
        width: 53,
        height: 20,
        borderRadius: 10
    },
    rating: {
        color: colors.rating,
        size: 16,
    }
});

export default HospitalMiniCard;