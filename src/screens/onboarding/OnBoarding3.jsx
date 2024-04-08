import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, ActivityIndicator, Animated, Easing } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import bg from "../../assets/images/bg-onBoarding2.png";
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const OnBoarding3 = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const spinValue = useRef(new Animated.Value(0)).current;

    const startSpinner = () => {
        setLoading(true);
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
        setTimeout(() => {
            setLoading(false);
            navigation.replace("Login");
        }, 2000);
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.background}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" style={{ position: 'absolute' }}>
                    <Circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="1"
                    />
                </Svg>
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
                                <Animated.View style={[styles.loading, { transform: [{ rotate: spin }] }]}>
                                    <ActivityIndicator color="#FE8C00" size={30} />
                                </Animated.View>
                            }
                            <View >
                                <TouchableOpacity style={styles.circleButton} onPress={startSpinner}>
                                    <Icon name="arrowright" size={24} color="#FE8C00" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
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
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor: '#FE8C00'
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: "transparent",
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
        bottom: 70,
        alignSelf: "center"
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
