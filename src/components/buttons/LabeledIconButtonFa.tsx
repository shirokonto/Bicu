import {Pressable, StyleSheet, Text, View} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";

interface ButtonProps {
    label: string;
    icon: string;
    onPress: () => void;
}

const LabeledIconButtonFa = ({ label, icon, onPress } : ButtonProps) => {
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPress}>
                <FontAwesome
                    name={icon as any}
                    style={styles.buttonIcon}
                    size={18}
                />
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        //flex: 1
    },
    button: {
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    buttonIcon: {
        paddingBottom: 8,
        color: '#D97706',
    },
    buttonLabel: {
        color: '#D97706',
        fontSize: 16,
    },
});

export default LabeledIconButtonFa;
