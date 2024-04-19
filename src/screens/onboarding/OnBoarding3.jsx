import { ImageBackground, SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import React, { useState } from 'react';
import bg from "../../assets/images/bg-onBoarding2.png";
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const OnBoarding3 = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const handleButtonClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate("Login")
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground source={bg} style={styles.background}>
                <View style={styles.content}>
                    <View style={styles.card}>
                        <View style={styles.textcontainer}>
                            <Text style={styles.mainText}>
                                We serve incomparable delicacies
                            </Text>
                            <Text style={styles.infotext}>
                                All the best restaurants with their top menu waiting for you, they can't wait for your order!!
                            </Text>
                            <View style={styles.hugcontainer}>
                                <View style={styles.hug} />
                                <View style={styles.hug} />
                                <View style={[styles.hug, { backgroundColor: "white" }]} />
                            </View>
                            {loading &&
                                <ActivityIndicator color="white" size={120} style={styles.loading} />
                            }
                            <View style={styles.circleButton}>
                                <TouchableOpacity onPress={handleButtonClick}>


                                    <Icon name="arrowright" size={24} color="#FE8C00" />

                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default OnBoarding3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: "repeat",
        justifyContent: "center",
    },
    content: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 30
    },
    card: {
        backgroundColor: "#FE8C00",
        height: 400,
        width: 311,
        paddingHorizontal: 20,
        borderRadius: 48,
    },
    textcontainer: {
        flex: 1,
        alignSelf: "center",
        marginTop: 40
    },
    mainText: {
        color: "white",
        fontFamily: "Inter-SemiBold",
        fontSize: 32,
        textAlign: 'center',
    },
    infotext: {
        marginTop: 20,
        color: "white",
        fontFamily: "Inter-Regular",
        fontSize: 14,
        textAlign: 'center',
    },
    hugcontainer: {
        justifyContent: "center",
        flexDirection: "row",
        gap: 4,
        marginTop: 20
    },
    hug: {
        width: 30,
        height: 5,
        backgroundColor: "#c9c9c9",
    },
    loading: {
        position: "absolute",
        bottom: 2,
        left: 75,
    },
    circleButton: {
        marginTop: 45,
        backgroundColor: "white",
        width: 62,
        height: 62,
        borderRadius: 84,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
});