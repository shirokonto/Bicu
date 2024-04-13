import {ButtonProps, Pressable, StyleSheet, Text} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from "react";

interface IconButtonProps {
    icon: string;
    label: string;
    onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label, onPress }) => {
    return (
        <Pressable style={styles.iconButton} onPress={onPress}>
            <MaterialIcons name={icon as any} size={28} color="#fff" style={styles.iconButtonIcon}/>
            <Text style={styles.iconButtonLabel}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonIcon: {
        marginTop: 4,
    },
    iconButtonLabel: {
        color: '#fff',
        marginTop: 12,
    },
});

export default IconButton;