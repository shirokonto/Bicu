import {StyleSheet, TextInput, View} from "react-native";
import React from "react";
import Button from "./buttons/Button";

interface EditableTitleProps {
    onReset: () => void;
    onAddMarker: () => void;
}

const EditableTitle = ({onReset, onAddMarker} : EditableTitleProps) => {

    const [value, onChangeText] = React.useState('Basement01');

    return (
        <View style={styles.titleRow}>
            <Button icon="map-marker" label="Marker" onPress={onAddMarker}/>
            <TextInput style={styles.titleLabel}
                       maxLength={12}
                       onChangeText={text => onChangeText(text)}
                       value={value}/>
            <Button icon="refresh" label="Reset" onPress={onReset}/>
        </View>
    );
}

const styles = StyleSheet.create({
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleLabel: {
        color: '#fff',
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default EditableTitle;