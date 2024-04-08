import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '../components/TextInput';
import PrimaryButton from '../components/Button';
import CheckBox from 'react-native-check-box'
import google from "../assets/images/google.png"
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { createEvent } from '../helper/createEvent';
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';



const SignUp = () => {
    const [userAuth, setUserAuth] = useState(null);
    const navigation = useNavigation();
    const [form, setForm] = useState({
        email: "",
        userName: "",
        password: "",
        isSelected: false,
    });
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [isCheckError, setisCheckError] = useState("");

    const handleEmailChange = (email) => {
        setForm({ ...form, email });
        setEmailError("");
    };

    const handlePasswordChange = (password) => {
        setForm({ ...form, password });
        setPasswordError("");
    };

    const handleUsernameChange = (username) => {
        setForm({ ...form, userName: username });
        setUsernameError("");
    };

    const handleSignUp = async () => {
        let hasError = false;

        if (!validateEmail(form.email)) {
            setEmailError("Please enter a valid email address.");
            hasError = true;
        }

        if (form.userName.length < 6) {
            setUsernameError("Username should be 6 characters long.");
            hasError = true;
        }

        if (form.userName === "") {
            setUsernameError("Please enter a username.");
            hasError = true;
        }

        if (form.password === "") {
            setPasswordError("Please enter a password.");
            hasError = true;
        }
        if (form.password.length <= 7) {
            setPasswordError("Password should be 8 characters long.");
            hasError = true;
        }

        if (!form.isSelected) {
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const credential = await auth().createUserWithEmailAndPassword(form.email, form.password);
            const userData = {
                email: form.email,
                userName: form.userName,
                password: form.password,
            };
            await firestore().collection('users').doc(credential.user.uid).set(userData);
            console.log('User signed up with email:', credential.user);
            if (credential.user.uid) {
                Toast.show({
                    type: 'success',
                    text1: 'Account created successfully.'
                });
                const tokens = await GoogleSignin.getTokens();

                const res = await createEvent(tokens.accessToken, userData.email, userData.userName)
                if (res.status === 'confirmed') navigation.replace('Login')
            }
        } catch (error) {
            console.error('Email Sign-Up error:', error);
            if (error.code === 'auth/email-already-in-use') {
                Toast.show({
                    type: 'error',
                    text1: 'The email address is already in use by another account.'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'An error occurred. Please try again later.'
                });
            }
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const { idToken, user } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const data = await auth().signInWithCredential(googleCredential);

            const userData = {
                email: user.email,
                userName: form.userName,
                photo: user.photo
            };
            await firestore().collection('users').doc(data.user.uid).set(userData);
            console.log('User signed up with Google:', user);

            const tokens = await GoogleSignin.getTokens();
            setUserAuth(user);

            const res = await createEvent(tokens.accessToken, user.email, user.name)
            console.log("----------Event response-----------------", res)
            if (res.status === 'confirmed') navigation.replace('Login')
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled Google sign-in');
            } else {
                console.error('Google Sign-Up error:', error);
            }
        }
    };



    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
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
                            value={form.userName}
                            onChangeText={handleUsernameChange}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            isError={!!usernameError}
                        />
                        {usernameError ? <Text style={styles.helperText}>{usernameError}</Text> : null}

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
                                error={form.isChecked}
                                style={styles.checkbox}
                                onClick={() => setForm({ ...form, isSelected: !form.isSelected })}
                                isChecked={form.isSelected}

                            />
                            <View>
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
                        </View>
                        <View style={styles.btncontainer}>
                            <PrimaryButton label="Register" onPress={handleSignUp} />
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
                    <TouchableOpacity onPress={handleGoogleSignUp}>
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
            </ScrollView>
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
        marginTop: 18,
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
    btncontainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "3%"
    }
});
