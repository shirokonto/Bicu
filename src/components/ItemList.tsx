import React, {useState} from 'react';
import {FlatList, Image, ImageSourcePropType, Platform, Pressable, StyleSheet} from 'react-native';

interface ItemListProps {
    onSelect: (item: ImageSourcePropType) => void;
    onCloseModal: () => void;
}

const ItemList = ({ onSelect, onCloseModal } : ItemListProps) => {
    const [item] = useState([
        require('../assets/images/bicuicon.png'),
        require('../assets/images/bicuicon.png'),
        require('../assets/images/bicuicon.png'),
        require('../assets/images/bicuicon.png'),
        require('../assets/images/bicuicon.png'),
        require('../assets/images/bicuicon.png'),
    ]);

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            data={item}
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