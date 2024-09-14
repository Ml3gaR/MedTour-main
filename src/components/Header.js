import React from 'react';
import { View, StyleSheet } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import AppText from './AppText';
import colors from '../config/colors';

function Header({ title }) {
    return (
        <View style={styles.header}>
            <MaterialCommunityIcons name="arrow-left" color={colors.black} size={35}/>
            <AppText style={styles.title}> {title} </AppText>
            <MaterialCommunityIcons name="dots-vertical" size={35}/>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        marginBottom: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        margin: "auto",
        marginTop: -3,
    }
})
export default Header;