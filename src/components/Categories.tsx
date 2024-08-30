import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { categories } from "../constants";

type CategoriesProps = {
    onCategorySelect: (category: string | null) => void; // Add onCategorySelect prop
};


const Categories = ({ onCategorySelect }: CategoriesProps) => {

    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const handleCategorySelect = (categoryId: string | null) => {
        const newCategory = activeCategory === categoryId ? null : categoryId; // Toggle selection
        setActiveCategory(newCategory);
        onCategorySelect(newCategory);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                {categories.map((category, index) => {
                    let isActive = category.name === activeCategory;
                    return (
                        <View key={index} style={styles.categoryContainer}>
                            <TouchableOpacity
                                onPress={() => handleCategorySelect(category.name)}
                                style={[
                                    styles.categoryButton,
                                    { backgroundColor: isActive ? "#757575" : "#D1D5DB" },
                                ]}
                            >
                                <Image source={category.image} style={styles.categoryImage} />
                            </TouchableOpacity>
                            <Text
                                style={[
                                    styles.categoryText,
                                    { fontWeight: isActive ? "600" : "400" },
                                ]}
                            >
                                {category.name}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

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
    categoryContainer: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    categoryButton: {
        padding: 8,
        borderRadius: 9,
        alignItems: "center",
    },
    categoryImage: {
        width: 48,
        height: 48,
    },
    categoryText: {
        fontSize: 15,
        lineHeight: 20,
    },
});

export default Categories;