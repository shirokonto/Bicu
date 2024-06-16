import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from "react";

interface CircleButtonProps {
    onPress: () => void;
    icon: string;
}

const CircleButton = ({ icon, onPress } : CircleButtonProps) => {
    return (
        <>
            <View style={styles.bar} />
            <View style={styles.container}>
                <View style={styles.circleButtonContainer}>
                    <TouchableOpacity style={styles.circleButton} onPress={onPress}>
                        <MaterialIcons name={icon as any} size={38} color="#25292e" />
                    </TouchableOpacity>
                </View>
            </View>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleButtonContainer: {
        width: 84,
        height: 84,
        marginHorizontal: 60,
        borderWidth: 4,
        borderColor: '#ffd33d',
        borderRadius: 42,
        padding: 3,
        backgroundColor: '#25292e',
        zIndex: 1,
    },
    bar: {
        position: 'absolute',
        top: 35,
        width: '100%',
        height: 100,
        borderRadius: 4,
        backgroundColor: '#6d6b62',
    },
    circleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 42,
        backgroundColor: '#fff',
    },
});

export default CircleButton;
