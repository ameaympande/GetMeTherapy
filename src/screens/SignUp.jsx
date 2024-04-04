import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '../components/TextInput';
import PrimaryButton from '../components/Button';
import CheckBox from 'react-native-check-box'
import google from "../assets/images/google.png"
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState({
        email: "",
        userName: "",
        password: "",
        isSelected: false,
    });
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleEmailChange = (email) => {
        setForm({ ...form, email });
        setEmailError("");
    };

    const handlePasswordChange = (password) => {
        setForm({ ...form, password });
        setPasswordError("");
    };

    const handleLogin = () => {
        let hasError = false;

        if (!validateEmail(form.email)) {
            setEmailError("Please enter a valid email address.");
            hasError = true;
        }

        if (form.password === "") {
            setPasswordError("Please enter a password.");
            hasError = true;
        }
        if (form.password.length <= 7) {
            setPasswordError("Password should be 8 letter.");
            hasError = true;
        }

        if (hasError) {
            return;
        }

    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.maincontainer}>
                <View style={styles.titlecontainer}>
                    <Text style={styles.titleText}>
                        Create your new account.
                    </Text>
                    <Text style={styles.signinText}>
                        Please sign in to your account
                    </Text>
                </View>
                <View style={styles.formcontainer}>
                    <Text style={styles.labelText}>
                        Email Address
                    </Text>
                    <CustomTextInput
                        placeholder="Enter Email"
                        value={form.email}
                        onChangeText={handleEmailChange}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        isError={!!emailError}
                    />
                    {emailError ? <Text style={styles.helperText}>{emailError}</Text> : null}


                    <Text style={[styles.labelText, { marginTop: 10 }]}>
                        User Name
                    </Text>
                    <CustomTextInput
                        placeholder="Enter Username"
                        value={form.email}
                        onChangeText={handleEmailChange}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        isError={!!emailError}
                    />
                    {emailError ? <Text style={styles.helperText}>{emailError}</Text> : null}

                    <Text style={[styles.labelText, { marginTop: 10 }]}>
                        Password
                    </Text>
                    <CustomTextInput
                        placeholder="Password"
                        value={form.password}
                        onChangeText={handlePasswordChange}
                        keyboardType="default"
                        autoCapitalize="none"
                        isError={!!passwordError}
                    />
                    {passwordError ? <Text style={styles.helperText}>{passwordError}</Text> : null}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            onClick={() => setForm({ ...form, isSelected: !form.isSelected })}
                            isChecked={form.isSelected}

                        />
                        <Text style={styles.label}>I Agree with{' '}
                            <Text style={{ ...styles.forgotText, marginLeft: 2, letterSpacing: 1, fontWeight: "600" }}>
                                Terms of Service
                            </Text>
                            {' '}and{' '}
                            <Text style={{ ...styles.forgotText, marginLeft: 0, fontWeight: "600" }}>
                                Privacy Policy
                            </Text>
                        </Text>

                    </View>
                    <PrimaryButton label="Register" />
                </View>
            </View>
            <View style={styles.speratorContainer}>
                <View style={styles.seprator} />
                <Text style={styles.sepratorText}>
                    Or sign in with
                </Text>
                <View style={styles.seprator} />
            </View>
            <View style={styles.circleButton}>
                <TouchableOpacity >
                    <Image source={google} style={{ height: 24, width: 24 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.registercontainer}>
                <Text style={{ ...styles.dontHaveText, marginRight: 0 }}>
                    have an account?
                </Text>
                <Text onPress={() => navigation.navigate("Login")} style={{ ...styles.forgotText, marginLeft: 8, fontWeight: "600" }}>
                    Sign in
                </Text>
            </View>

        </SafeAreaView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffefe",
    },
    maincontainer: {
        marginTop: 76,
        marginLeft: 24
    },
    titlecontainer: {
        width: 300
    },
    titleText: {
        color: "black",
        fontFamily: "Inter-SemiBold",
        fontSize: 32,
        textAlignVertical: "bottom",
        fontWeight: "600"
    },
    signinText: {
        marginTop: 5,
        fontSize: 14,
        color: "#878787"
    },
    formcontainer: {
        marginTop: 45,

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
    checkboxContainer: {
        flexDirection: 'row',
    },
    checkbox: {
        alignSelf: 'center',
        width: 20,
        height: 20,

    },
    label: {
        margin: 8,
        marginTop: 20,
        width: 340,
        fontSize: 14,
        fontFamily: "Inter-SemiBold",
        color: "black"
    },
    forgotText: {
        textAlign: "right",
        marginTop: 20,
        color: "#FE8C00",
        fontWeight: "500",
        fontFamily: "Inter-Medium",
        fontSize: 14
    },
    speratorContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    seprator: {
        width: 99,
        height: 0.5,
        borderColor: "#878787",
        borderWidth: 0.5
    },
    sepratorText: {
        color: "#878787",
        fontWeight: "500",
        fontFamily: "Inter-Medium",
        fontSize: 14
    },
    circleButton: {
        marginTop: 25,
        backgroundColor: "white",
        width: 40,
        height: 40,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderColor: "#878787",
        borderWidth: 1
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
        fontSize: 14
    },


});
