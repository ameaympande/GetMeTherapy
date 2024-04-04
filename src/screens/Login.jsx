import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomTextInput from '../components/TextInput';
import PrimaryButton from '../components/Button';
import google from "../assets/images/google.png"
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const Login = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: "81273183034-rsp1ekvpn0n25anajedbvshuv5v1o8fa.apps.googleusercontent.com"
        })
    }, []);

    const handleGoogleSignIN = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            console.log("userInfo", userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled the login flow');
            } else {
                console.error('Google Sign-In error:', error);
            }
        }

    }

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
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.maincontainer}>
                    <View style={styles.titlecontainer}>
                        <Text style={styles.titleText}>
                            Login to your account.
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
                        <Text onPress={() => navigation.navigate("ForgotPassword")} style={styles.forgotText}>
                            Forgot password ?
                        </Text>
                        <View style={styles.btncontainer}>
                            <PrimaryButton label="Sign in" onPress={handleLogin} />
                        </View>
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
                    <TouchableOpacity onPress={handleGoogleSignIN}>
                        <Image source={google} style={{ height: 24, width: 24 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.registercontainer}>
                    <Text style={{ ...styles.dontHaveText, marginRight: 0 }}>
                        Don't have an account?
                    </Text>
                    <Text onPress={() => navigation.navigate("Signup")} style={{ ...styles.forgotText, marginRight: 0, fontWeight: "600" }}>
                        Register
                    </Text>
                </View>
            </SafeAreaView>
        </>
    );
};

export default Login;

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
        marginTop: 35,
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
    forgotText: {
        textAlign: "right",
        marginTop: 20,
        marginRight: 20,
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
    btncontainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "5%"
    }

});
