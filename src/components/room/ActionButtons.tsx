import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface ActionButtonsProps {
    onBackPress: () => void;
    onMarkerPress: () => void;
    onAddPhotoPress: () => void;
}

const ActionButtons= ({ onBackPress, onMarkerPress, onAddPhotoPress } : ActionButtonsProps) => {
    return (
        <View style={styles.buttonsContainer}>
            <TouchableOpacity
                onPress={onBackPress}
                style={styles.button}>
                <MaterialIcons name={"arrow-back"} size={28} color={'#D97706'} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onAddPhotoPress}
                style={styles.button}>
                <MaterialIcons name={"add-photo-alternate"} size={28} color={'#D97706'} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        position: "absolute",
        top: 50,
        left: 15,
        right: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: '#FFFF',
        borderRadius: 999,
        padding: 5,
    }
});

export default ActionButtons;
