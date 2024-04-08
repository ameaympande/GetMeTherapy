import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import PrimaryButton from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import IconE from 'react-native-vector-icons/Entypo';
import CustomTextInput from '../components/TextInput';
import auth from "@react-native-firebase/app"
import success from "../assets/images/success.png"
import { sendOTPByEmail } from '../helper/sendOTPByemail';
import Toast from 'react-native-toast-message';
import RBSheet from 'react-native-raw-bottom-sheet';

const ResetPassword = ({ route }) => {
    const navigation = useNavigation();
    const { email } = route?.params ? route.params : "example@gmail.com"
    const [newPassword, setNewPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [cpasswordError, setCPasswordError] = useState("");
    const refRBSheet = useRef();

    const handlePasswordChange = (value) => {
        setNewPassword(value);
        setNewPasswordError("");
    };

    const handleConfirmPasswordChange = (value) => {
        setCPassword(value);
        setCPasswordError("");
    };

    const handleSubmit = async () => {
        if (newPassword === "") {
            setNewPasswordError("Please enter a new password.");
            return;
        }
        if (newPassword.length < 8) {
            setNewPasswordError("Must be at least 8 characters.");
            return;
        }
        if (cpassword === "") {
            setCPasswordError("Please confirm your password.");
            return;
        }
        if (newPassword !== cpassword) {
            setCPasswordError("Passwords do not match.");
            return;
        }


        refRBSheet.current.open();

    };


    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <SafeAreaView style={styles.container}>
                <RBSheet
                    height={492}
                    ref={refRBSheet}
                    useNativeDriver={false}
                    draggable={true}
                    customStyles={{
                        wrapper: {

                        },
                        draggableIcon: {
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            width: 58.13,
                            height: 4
                        },
                        container: {
                            borderTopRightRadius: 50,
                            borderTopLeftRadius: 50,
                        },
                    }}
                    customModalProps={{
                        animationType: 'slide',
                        statusBarTranslucent: true,
                    }}
                    customAvoidingViewProps={{
                        enabled: true,
                    }}>

                    <View style={styles.sheetContainer}>
                        <Image source={success} style={styles.sucessImg} />
                        <View style={styles.titlecontainer}>
                            <Text style={styles.titleText}>
                                Password Changed
                            </Text>
                            <Text style={styles.signinText}>
                                Password changed successfully, you can login again with a new password
                            </Text>
                            <View style={styles.btncontainer}>
                                <PrimaryButton label="Go to Login" onPress={() => navigation.navigate("Login")} />
                            </View>
                        </View>
                    </View>
                </RBSheet>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <IconE name="chevron-small-left" size={30} color="#101010" />
                    </TouchableOpacity>
                    <Text style={styles.otpText}>Reset Password</Text>
                    <View style={styles.rightbtn} />
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.maincontainer}>
                        <View style={styles.titlecontainer}>
                            <Text style={styles.titleText}>Reset Password</Text>
                            <Text style={styles.signinText}>Your new password must be different from the previously used password</Text>
                        </View>
                        <View style={styles.formcontainer}>
                            <Text style={[styles.labelText, { marginTop: 10 }]}>New Password</Text>
                            <CustomTextInput
                                placeholder="New Password"
                                value={newPassword}
                                onChangeText={handlePasswordChange}
                                keyboardType="default"
                                autoCapitalize="none"
                                secureTextEntry={true}
                                isError={!!newPasswordError}
                            />
                            {newPasswordError ? <Text style={styles.helperText}>{newPasswordError}</Text> : null}
                            <Text style={[styles.labelText, { marginTop: 30 }]}>Confirm Password</Text>
                            <CustomTextInput
                                placeholder="Confirm Password"
                                value={cpassword}
                                onChangeText={handleConfirmPasswordChange}
                                keyboardType="default"
                                autoCapitalize="none"
                                secureTextEntry={true}
                                isError={!!cpasswordError}
                            />
                            {cpasswordError ? <Text style={styles.helperText}>{cpasswordError}</Text> : null}
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.btncontainer}>
                    <PrimaryButton label="Verify Account" onPress={handleSubmit} />
                </View>
            </SafeAreaView>
        </>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffefe",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 24,
        marginTop: 65,
    },
    otpText: {
        color: "black",
        fontFamily: "Inter-SemiBold",
        fontSize: 16,
        textAlignVertical: "bottom",
        fontWeight: "600",
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
    errorInput: {
        borderColor: 'red',
    },
    helperText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 0,
        marginTop: 8
    },
    btncontainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10%"
    },
    rightbtn: {
        backgroundColor: "white"
    },
    sheetContainer: {
        alignItems: "center",
        borderRadius: 50,

    },
    sucessImg: {
        marginTop: 32,
        width: 203,
        height: 168
    },
    titlecontainer: {
        marginTop: 32,
        alignItems: "center",
        width: 300,
        gap: 10
    },
    titleText: {
        color: "black",
        fontFamily: "Inter-SemiBold",
        fontSize: 32,
        textAlignVertical: "bottom",
        fontWeight: "600"
    },
    signinText: {
        marginTop: 20,
        textAlign: "center",
        marginTop: 5,
        fontSize: 14,
        color: "#878787"
    },
});
