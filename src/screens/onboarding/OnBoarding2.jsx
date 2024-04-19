import { ImageBackground, SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import bg from "../../assets/images/bg-onBoarding2.png"
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const OnBoarding2 = () => {
    const navigation = useNavigation();
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
                                <View style={[styles.hug, { backgroundColor: "white" }]} />
                                <View style={styles.hug} />
                            </View>
                        </View>
                        <View style={styles.btncontainer}>
                            <TouchableOpacity style={styles.leftbtn}>
                                <Text style={styles.btnText}>Skip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rightbtn} onPress={() => navigation.replace("Onboarding3")}>
                                <Text style={styles.btnText}>Next</Text>
                                <Icon name="arrowright" size={20} color="white" style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default OnBoarding2

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
    btncontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leftbtn: {
        paddingHorizontal: 10,
        paddingVertical: 35,
    },
    rightbtn: {
        flexDirection: "row",
        paddingVertical: 35,
        alignItems: "center",
    },
    btnText: {
        fontFamily: "Inter-SemiBold",
        fontSize: 16,
        color: "white",
    },
    arrow: {
        fontSize: 20,
        marginLeft: 5,
    },
})
