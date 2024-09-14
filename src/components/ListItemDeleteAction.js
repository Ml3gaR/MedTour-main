import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

function ListItemDeleteAction({ onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>

            </View>
            
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        width: 70,
    }
});

export default ListItemDeleteAction;