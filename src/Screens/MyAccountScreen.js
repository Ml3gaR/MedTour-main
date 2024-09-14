import React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'

import Screen from '../components/Screen';
import colors from '../config/colors';
import AppText from '../components/AppText';

function MyAccountScreen(props) {
    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.MyInfo}>
                    <Image style={styles.image}source={require('../../assets/Raied.png')}/>
                    <View style={styles.MyInfoDetails}>
                        <AppText style={styles.username}>Osama</AppText>
                        <AppText style={styles.email}>Osama18111@gmail.com</AppText>
                    </View>
                </View>

                <View style={styles.list}>

                    <View style={styles.myListContainer}>
                        <MaterialCommunityIcons 
                        name='format-list-bulleted'
                        size={20}
                        color={colors.primary}
                        />
                        <AppText style={styles.MyList}>My Listing</AppText>
                    </View>

                    <View style={styles.myListContainer}>
                        <MaterialCommunityIcons 
                        name='email'
                        size={20}
                        color={colors.secondary}
                        />
                        <AppText style={styles.MyList}>My Messages</AppText>
                    </View>

                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
    },
    MyInfo:{
        flexDirection: 'row',
        backgroundColor: colors.white,
        width: '100%',
        marginTop: 40,
    },
    image: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
    username: {
        fontWeight: 'bold',
        margin: 5,
    },
    email: {
        marginLeft: 5,
        color: colors.medium
    },
    list: {
        backgroundColor: colors.white,
        marginTop: 50,
    },
    myListContainer: {
        flexDirection: 'row'
    }
})
export default MyAccountScreen;