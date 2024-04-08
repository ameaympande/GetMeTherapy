import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import PrimaryButton from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import OTPInput from '../components/OTPinput';
import IconE from 'react-native-vector-icons/Entypo';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

const OTPchange = ({ route }) => {
    const navigation = useNavigation();
    const { email } = route.params;
    const numberOfInputs = 4;
    const [otp, setOTP] = useState(Array(numberOfInputs).fill(''));
    const [timer, setTimer] = useState(600);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 0) {
                    clearInterval(interval);
                    setTimer(0)
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const resendOTP = () => {
        if (timer === 0)
            setTimer(600);
    };

    const onComplete = () => {
        navigation.navigate("ResetPassword", { email });
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <IconE name="chevron-small-left" size={30} color="#101010" />
                        </TouchableOpacity>
                        <Text style={styles.otpText}>
                            OTP
                        </Text>
                        <View style={styles.rightbtn}></View>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.maincontainer}>
                        <View style={styles.titlecontainer}>
                            <Text style={styles.titleText}>
                                Email verification
                            </Text>
                            <Text style={styles.signinText}>
                                Enter the verification code we sent you on:
                                {email && email}|</Text>
                        </View>
                        <View style={styles.formcontainer}>
                            <OTPInput numberOfInputs={numberOfInputs} otp={otp} setOTP={setOTP} onComplete={onComplete} />
                        </View>
                        <View style={styles.registercontainer}>
                            <Text style={{ ...styles.dontHaveText, marginRight: 0 }}>
                                Didn’t receive code?
                            </Text>
                            <Text onPress={resendOTP} style={{ ...styles.forgotText, marginLeft: 8, fontWeight: "600" }}>
                                Resend
                            </Text>
                        </View>
                        <View style={styles.registercontainer}>
                            <IconM name="clock-time-five-outline" size={26} color="#101010" />
                            <Text style={{ ...styles.dontHaveText, marginTop: 3, marginLeft: 10 }}>
                                {formatTime(timer)}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.btncontainer}>
                    <PrimaryButton label="Continue" onPress={onComplete} />
                </View>
            </SafeAreaView>
        </>
    );
};

export default OTPchange;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffefe",
    },
    header: {
        marginHorizontal: 24,
        marginTop: 65,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circleButton: {
        backgroundColor: "white",
        width: 36,
        height: 36,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#EDEDED"
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    maincontainer: {
        marginTop: 30,
        marginHorizontal: 24,
        flex: 1
    },
    titlecontainer: {
        width: 300
    },
    titleText: {
        color: "black",
        fontFamily: "Inter-SemiBold",
        fontSize: 32,
        textAlignVertical: "bottom",
        fontWeight: "600",

    },
    otpText: {
        color: "black",
        fontFamily: "Inter-SemiBold",
        fontSize: 16,
        textAlignVertical: "bottom",
        fontWeight: "600",
        marginRight: 50
    },
    signinText: {
        marginTop: 5,
        fontSize: 14,
        color: "#878787"
    },
    formcontainer: {
        marginTop: 20,
    },
    labelText: {
        color: "black",
        fontFamily: "Inter-Bold",
        fontWeight: "500",
        fontSize: 14
    },
    input: {
        borderColor: "#EDEDED",
        borderWidth: 2,
        height: 40,
        margin: 12,
        borderWidth: 1,

    },
    errorInput: {
        borderColor: 'red',
    },
    helperText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 12,
    },
    btncontainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10%"
    },
    rightbtn: {
        backgroundColor: "white"
    },
    registercontainer: {
        margin: 20,
        flexDirection: "row",
        alignSelf: "center",
        alignContent: "center",
        justifyContent: "center"
    },
    dontHaveText: {
        textAlign: "center",
        marginTop: 20,
        marginRight: 20,
        color: "black",
        fontWeight: "500",
        fontFamily: "Inter-Medium",
        fontSize: 14,
        color: "#878787"
    },
    forgotText: {
        textAlign: "right",
        marginTop: 20,
        color: "#FE8C00",
        fontWeight: "500",
        fontFamily: "Inter-Medium",
        fontSize: 14
    },
});
