import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomTextInput from '../components/TextInput';
import PrimaryButton from '../components/Button';
import google from "../assets/images/google.png"
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { createEvent } from '../helper/createEvent';
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message"
import firestore from '@react-native-firebase/firestore';

const Login = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [userAuth, setUserAuth] = useState(null);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: "81273183034-rcm452vj26quld59v7b23g0naa50kv9a.apps.googleusercontent.com",
            scopes: ['https://www.googleapis.com/auth/calendar.events'],
        })

    }, []);

    const handleGoogleSignIn = async () => {
        try {
            const { idToken, user } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            console.log('User signed up with Google:', user);

            const tokens = await GoogleSignin.getTokens();
            setUserAuth(user);

            const res = await createEvent(tokens.accessToken, user.email, user.name)
            console.log("----------Event response-----------------", res.status)
            if (res.status === 'confirmed') navigation.replace("PostLogin", { userAuth: user });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled Google sign-in');
            } else {
                console.error('Google Sign-Up error:', error);
            }
        }
    };

    const handleEmailChange = (email) => {
        setForm({ ...form, email });
        setEmailError("");
    };

    const handlePasswordChange = (password) => {
        setForm({ ...form, password });
        setPasswordError("");
    };

    const handleLogin = async () => {
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

        try {
            const { user } = await auth().signInWithEmailAndPassword(form.email, form.password);
            console.log("user", user);
            const tokens = await GoogleSignin.getTokens();
            if (user.uid) {
                Toast.show({
                    type: 'success',
                    text1: 'Login successfully.'
                });
                const res = await createEvent(tokens.accessToken, user.email, user.name)
                console.log("----------Event response-----------------", res.status)
                if (res.status === 'confirmed') {
                    navigation.replace("PostLogin", { userEmail: user.email, userName: user.name });
                }
            }

        } catch (error) {
            console.error('Error while login: ', error);
            if (error.code === 'auth/invalid-credential') {
                Toast.show({
                    type: 'error',
                    text1: 'Please enter valid email or password',
                });

            } else {
                Toast.show({
                    type: 'error',
                    text1: error,
                    text2: 'An error occurred. Please try again later.'
                });
            }
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
                        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                            <Text style={styles.forgotText}>
                                Forgot password ?
                            </Text>
                        </TouchableOpacity>
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
                    <TouchableOpacity onPress={handleGoogleSignIn}>
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
