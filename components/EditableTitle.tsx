import {View, TextInput, StyleSheet} from "react-native";
import React from "react";
import Button from "./Button";

interface EditableTitleProps {
    onPress: () => void;
}

const EditableTitle: React.FC<EditableTitleProps> = ({ onPress }) => {

    const [value, onChangeText] = React.useState('Basement01');

    return (
        <View style={styles.titleRow}>
            <TextInput style={styles.titleLabel}
                       maxLength={12}
                       onChangeText={text => onChangeText(text)}
                       value={value}/>
            <Button icon="refresh" label="Reset" onPress={onPress} />
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