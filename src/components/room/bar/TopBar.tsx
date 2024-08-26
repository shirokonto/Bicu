import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface TopBarProps {
    onClose: () => void;
}

const TopBar = ({ onClose }: TopBarProps) => (
    <View style={styles.topBar}>
        <Pressable onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={28} color="#FFFFFF" />
        </Pressable>
    </View>
);

const styles = StyleSheet.create({
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    closeButton: {
        position: 'absolute',
        top: 95,
        right: 30,
        backgroundColor: '#000',
        borderRadius: 999,
        padding: 5,
    },
});

export default TopBar;
