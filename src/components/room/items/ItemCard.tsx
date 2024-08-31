import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useRef, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation";
import { categories, ItemCardProps } from "../../../constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

const ItemCard = ({ item, index, onPress, onEdit }: ItemCardProps) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const categoryName = item.category ?? "No Category";
    const category = categories.find(cat => cat.name === categoryName);
    const categoryImage = category ? category.image : null;
    const [actionItemsVisible, setActionItemsVisible] = useState(false);

    const swipeableRef = useRef<Swipeable>(null);

    const renderRightActions = () => (
            <View style={styles.actionContainer}>
                <MaterialIcons
                    name="mode-edit"
                    size={28}
                    color="#000"
                    style={styles.actionIcon}
                    onPress={() => onEdit(item)}
                />
                <MaterialIcons
                    name="delete"
                    size={28}
                    color="red"
                    style={styles.actionIcon}
                />
            </View>
    );

    const handleSwipeableOpen = () => {
        setActionItemsVisible(true);
    };

    const handleSwipeableClose = () => {
        setActionItemsVisible(false);
    };

    // Open/Close the Swipeable with press on chevron icon
    const handleChevronPress = () => {
        if (!actionItemsVisible) {
            swipeableRef.current?.openRight();
        } else {
            swipeableRef.current?.close();
        }
    };


    return (
        <GestureHandlerRootView>
            <Swipeable
                ref={swipeableRef} // to open/close swipeable with press
                renderRightActions={renderRightActions}
                onSwipeableOpen={handleSwipeableOpen}
                onSwipeableClose={handleSwipeableClose}
            >
                <TouchableWithoutFeedback onPress={onPress}>
                    <View style={styles.cardContainer}>
                        <View style={styles.cardContent}>
                            <View style={styles.imageWrapper}>
                                <Image source={categoryImage} style={styles.categoryImage} />
                            </View>
                            <View>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemCategory}>{item.category}</Text>
                            </View>
                            <MaterialIcons
                                name={!actionItemsVisible ? "chevron-right" : "chevron-left"}
                                size={28} color="#000"
                                onPress={handleChevronPress}
                                style={styles.arrowIcon} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Swipeable>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingBottom: 14,
        marginTop: 8,
    },
    imageWrapper: {
        height: 60,
        width: 60,
        borderRadius: 15,
        marginHorizontal: 15,
        overflow: 'hidden',
    },
    categoryImage: {
        height: "100%",
        width: "100%",
    },
    itemName: {
        fontWeight: "bold",
        paddingTop: 8,
        fontSize: 18,
        lineHeight: 30,
    },
    itemCategory: {
        color: "#6B7280",
        fontSize: 15,
        lineHeight: 16,
    },
    arrowIcon: {
        marginLeft: "auto",
    },
    actionContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    actionIcon: {
        marginHorizontal: 10,
    },
});

export default ItemCard;