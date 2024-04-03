import React, { useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const CustomTextInput = ({ placeholder, value, onChangeText, keyboardType, autoCapitalize, isError }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder={placeholder}
                secureTextEntry={!isPasswordVisible && placeholder === "Password"}
                style={[styles.input, isError && styles.errorInput]}
                onChangeText={onChangeText}
                value={value}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
            />
            {placeholder === "Password" && (
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
                    <Icon name={isPasswordVisible ? "eye" : "eye-with-line"} size={20} color="black" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        marginRight: 18,
        flex: 1,
        borderColor: "#EDEDED",
        borderWidth: 2,
        height: 52,
        marginTop: 12,
        fontSize: 14,
        color: "black",
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        padding: 16
    },
    errorInput: {
        borderColor: 'red',
    },
    eyeIconContainer: {
        position: 'absolute',
        right: 35,
        bottom: 12
    },
});
