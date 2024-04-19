import React, { useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPInput = ({ numberOfInputs, onComplete, otp, setOTP, error, setOtpError }) => {

    const inputs = useRef([]);

    useEffect(() => {
        if (inputs.current[0]) {
            inputs.current[0].focus();
        }
    }, []);

    const handleChangeText = (index, value) => {
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);
        setOtpError(false);
        if (value !== '' && index < numberOfInputs - 1) {
            inputs.current[index + 1].focus();
        }
        if (newOTP.every((digit) => digit !== '')) {
            inputs.current[0].focus();
            onComplete(newOTP.join(''));
        }
    };

    const handleKeyPress = (index, key) => {
        if (key === 'Backspace' && index > 0 && otp[index] === '') {
            inputs.current[index - 1].focus();
            const newOTP = [...otp];
            newOTP[index - 1] = '';
            setOTP(newOTP);
        }
    };

    return (
        <View style={styles.container}>
            {Array.from({ length: numberOfInputs }).map((_, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => (inputs.current[index] = ref)}
                    style={[styles.input, error && styles.errorInput]}
                    keyboardType="numeric"
                    maxLength={1}
                    value={otp[index]}
                    onChangeText={(value) => handleChangeText(index, value)}
                    onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: 5,
        width: 75,
        height: 72,
        marginHorizontal: 5,
        textAlign: 'center',
        fontSize: 32,
        fontFamily: "Inter-Regular",
        fontWeight: "400",
    },
    errorInput: {
        borderColor: 'red',
    },
});

export default OTPInput;
