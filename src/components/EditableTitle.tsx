import {StyleSheet, TextInput, View} from "react-native";
import React from "react";
import LabeledIconButtonFa from "../components/buttons/LabeledIconButtonFa";
import {EditableTitleProps} from "../constants";


const EditableTitle = ({defaultTitle, onReset, onAddMarker} : EditableTitleProps) => {

    const [value, onChangeText] = React.useState(defaultTitle);

    return (
        <View style={styles.titleRow}>
            <LabeledIconButtonFa icon="map-marker" label="Marker" onPress={onAddMarker}/>
            <TextInput style={styles.titleLabel}
                       maxLength={12}
                       onChangeText={text => onChangeText(text)}
                       value={value}/>
            <LabeledIconButtonFa icon="refresh" label="Reset" onPress={onReset}/>
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