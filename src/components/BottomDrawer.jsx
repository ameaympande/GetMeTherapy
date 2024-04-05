import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BottomDrawer = ({ isOpen }) => {
    return (
        <View style={[styles.drawerContainer, isOpen ? styles.openDrawer : null]}>
            <Text>Drawer Content</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    openDrawer: {

    },
});

export default BottomDrawer;
