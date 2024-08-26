import React from 'react';
import { StyleSheet, View } from 'react-native';
import CircleButton from '../../buttons/CircleButton';

interface BottomBarProps {
    onSetMarker: () => void;
}

const BottomBar = ({ onSetMarker }: BottomBarProps) => (
    <View style={styles.bottomBar}>
        <View style={styles.optionsRow}>
            <CircleButton icon={"bookmark-add"} onPress={onSetMarker} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    bottomBar: {
        flex: 1,
        alignItems: 'center',
        position: 'absolute',
        bottom: 40,
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default BottomBar;
