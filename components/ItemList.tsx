import React, { useState } from 'react';
import {StyleSheet, FlatList, Image, Platform, Pressable, ImageSourcePropType} from 'react-native';

interface ItemListProps {
    onSelect: (item: ImageSourcePropType) => void;
    onCloseModal: () => void;
}

const ItemList: React.FC<ItemListProps> = ({ onSelect, onCloseModal }) => {
    const [emoji] = useState([
        require('../assets/bicuicon.png'),
        require('../assets/bicuicon.png'),
        require('../assets/bicuicon.png'),
        require('../assets/bicuicon.png'),
        require('../assets/bicuicon.png'),
        require('../assets/bicuicon.png'),
    ]);

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            data={emoji}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => (
                <Pressable
                    onPress={() => {
                        onSelect(item);
                        onCloseModal();
                    }}>
                    <Image source={item} key={index} style={styles.image} />
                </Pressable>
            )}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
});

export default ItemList;