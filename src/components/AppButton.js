import React from "react";
import { TouchableOpacity, StyleSheet, Text} from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        width: '100%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },

    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.white,
        textTransform: 'uppercase',
    },
})

export default AppButton;