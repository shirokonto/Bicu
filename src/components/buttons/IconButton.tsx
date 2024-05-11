import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from "react";

interface IconButtonProps {
    icon: string;
    label: string;
    onPress: () => void;
}

const IconButton = ({icon, onPress}: IconButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <MaterialIcons name={icon as any} size={28} style={styles.iconButtonIcon} color={'#D97706'}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    iconButtonIcon: {
        paddingVertical: 12,
        paddingHorizontal: 5,
    },
});

export default IconButton;