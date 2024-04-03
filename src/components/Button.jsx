import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const PrimaryButton = ({ onPress, label }) => {
    return (
        <View style={styles.btncontainer}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.text}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    btncontainer: {
        marginTop: 30,
        width: 327,
        height: 52,
        backgroundColor: "#FE8C00",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    text: {
        fontSize: 14,
        fontFamily: "Inter-SemiBold",
        color: "white",
        fontWeight: "600"
    }
})