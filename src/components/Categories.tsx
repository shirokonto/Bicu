import {Image, ImageStyle, ScrollView, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import React, {useState} from "react";
import {categories} from "../constants";

const Categories = () => {

    const [activeCategory, setActiveCategory] = useState<number | null>(null);

    return (
        <View style= {{marginTop: 15}}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style= {{overflow: "visible"}}
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
            >
                {
                    categories.map((category, index)=> {
                        let isActive = category.id == activeCategory;
                        const btnStyle: ViewStyle = {
                            padding: 8,
                            borderRadius: 9,
                            alignItems: "center",
                            backgroundColor: isActive ? '#757575' : '#D1D5DB'
                        };
                        const textStyle: TextStyle = {
                            fontSize: 15,
                            lineHeight: 20,
                            fontWeight: isActive ? '600' : '400'
                        };
                        const imgStyle : ImageStyle = {
                            width: 48,
                            height: 48
                        }
                        return (
                            <View key={index} style= {{display: "flex", flex: 1, justifyContent: "center", alignItems: "center", marginRight: 10}}>
                                <TouchableOpacity
                                    onPress={() => setActiveCategory(category.id)}
                                    style={btnStyle}>
                                    <Image source={category.image} style={imgStyle}/>
                                </TouchableOpacity>
                                <Text style={textStyle}>{category.name}</Text>
                            </View>
                        )

                })
                }
            </ScrollView>
        </View>
    )
}

export default Categories;