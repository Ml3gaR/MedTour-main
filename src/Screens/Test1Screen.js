import React from 'react';
import { View, Text, StyleSheet, Button,Alert } from 'react-native';


const Test1Screen = () => {
    return (
        <View style={styles.container}>
            <Text>This is Test1 Screen</Text>
            <Button title="click me" onPress={() => Alert.alert("tapped", "2", [{text:"yes", onPress:() => console.log("clicked on yes")}, {text:"no"}])} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Test1Screen;
