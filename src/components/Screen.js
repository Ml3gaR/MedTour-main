import React from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import constants from 'expo-constants'

function Screen({ children}) {
    return (
        <ScrollView>
            <View style={styles.screen}>
                {children}
            </View >
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: constants.statusBarHeight,
        height: '100%'
    }
})

export default Screen;