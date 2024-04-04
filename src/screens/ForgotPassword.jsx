import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '../components/TextInput';
import PrimaryButton from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState({
        email: "",
    });
    const [emailError, setEmailError] = useState("");

    const handleEmailChange = (email) => {
        setForm({ ...form, email });
        setEmailError("");
    };


    const handleLogin = () => {
        let hasError = false;

        if (!validateEmail(form.email)) {
            setEmailError("Please enter a valid email address.");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        navigation.navigate("OTPchange", { email: form.email })

    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.maincontainer}>
                    <View style={styles.titlecontainer}>
                        <Text style={styles.titleText}>
                            Forgot password?
                        </Text>
                        <Text style={styles.signinText}>
                            Enter your email address and we’ll send you confirmation code to reset your password
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


                    </View>
                </View>
            </ScrollView>
            <View style={styles.btncontainer}>
                <PrimaryButton label="Continue" onPress={handleLogin} />
            </View>
        </SafeAreaView>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffefe",
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    maincontainer: {
        marginTop: 76,
        marginLeft: 24,
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
    btncontainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10%"
    }
});
