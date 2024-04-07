import { ImageBackground, SafeAreaView, StyleSheet, Image, View, StatusBar, TouchableOpacity, ScrollView, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import bg from "../assets/images/bg-onBoarding1.png"
import { useNavigation } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import success from "../assets/images/success.png"
import PrimaryButton from '../components/Button';

const PostLogin = ({ route }) => {
    const { userAuth } = route.params;
    console.log("userAuth", userAuth);
    const refRBSheet = useRef();
    const navigation = useNavigation();

    useEffect(() => {
        if (userAuth.email && userAuth.name) refRBSheet.current.open();
    }, [])

    const handleLogOut = () => {
        navigation.navigate("Login")
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground source={bg} style={styles.background}>
                <View style={styles.content}>
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
                                    Login Successful
                                </Text>
                                <Text style={styles.signinText}>
                                    An event has been created and the invite has been sent to you on mail.
                                </Text>
                                <View style={styles.btncontainer}>
                                    <PrimaryButton label="Log out" onPress={handleLogOut} />
                                </View>
                            </View>
                        </View>
                    </RBSheet>

                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default PostLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    content: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 30
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
})
