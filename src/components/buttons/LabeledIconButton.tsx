import {Pressable, StyleSheet, Text} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from "react";

interface LabeledIconButtonProps {
    icon: string;
    label: string;
    onPress: () => void;
}

const LabeledIconButton = ({icon, label, onPress}: LabeledIconButtonProps) => {
    return (
        <Pressable style={styles.iconButton} onPress={onPress}>
            <MaterialIcons name={icon as any} size={28} color="#D97706" style={styles.iconButtonIcon}/>
            <Text style={styles.iconButtonLabel}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    iconButtonIcon: {
        marginTop: 4,
    },
    iconButtonLabel: {
        color: '#D97706',
        marginTop: 12,
    },
});

export default LabeledIconButton;