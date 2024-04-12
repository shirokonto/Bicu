import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";

interface ButtonProps {
    label: string;
    icon: string;
    onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, icon, onPress }) => {
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
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        flex: 1
    },
    button: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    buttonIcon: {
        paddingBottom: 8,
        color: '#fff',
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Button;
