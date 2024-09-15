import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface ColorPaletteProps {
    selectedColor: string | null;
    onSelectColor: (color: string | null) => void;
}

const colors = [
    { name: 'WHITE', hex: '#FFFFFF' },
    { name: 'YELLOW', hex: '#FFFF00' },
    { name: 'ORANGE', hex: '#FFA500' },
    { name: 'PINK', hex: '#FFC0CB' },
    { name: 'MAGENTA', hex: '#FF00FF' },
    { name: 'RED', hex: '#FF0000' },
    { name: 'GREEN', hex: '#00FF00' },
    { name: 'OlIVE', hex: '#808000' },
    { name: 'BLUE', hex: '#0000FF' },
    { name: 'NAVY', hex: '#000080' },
    { name: 'BROWN', hex: '#A52A2A' },
    { name: 'GRAY', hex: '#808080' },
    { name: 'BLACK', hex: '#000000' },
];

const ColorPalette = ({ selectedColor, onSelectColor } : ColorPaletteProps) => {
    return (

        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                    {colors.map((color) => {
                        const isSelected = selectedColor === color.name;
                        return (
                            <TouchableOpacity
                                key={color.name}
                                style={[
                                    styles.colorCircle,
                                    { backgroundColor: color.hex },
                                    isSelected && styles.selectedColorCircle,
                                ]}
                                onPress={() => {
                                    if (isSelected) {
                                        onSelectColor(null);
                                    } else {
                                        onSelectColor(color.name);
                                    }
                                }}
                            />
                        );
                    })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    scrollView: {
        overflow: "visible",
    },
    scrollViewContent: {
        paddingHorizontal: 15,
    },
    paletteContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
        paddingHorizontal: 15,
    },
    colorCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    selectedColorCircle: {
        borderWidth: 3,
        borderColor: '#050303',
    },
});

export default ColorPalette;
