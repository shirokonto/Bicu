import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation";
import { categories, ItemCardProps } from "../../../constants";

const ItemCard = ({ item, index }: ItemCardProps) => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const categoryName = item.category ?? "No Category";
    const category = categories.find(cat => cat.name === categoryName);
    const categoryImage = category ? category.image : null;

    // onPress={() => navigation.navigate("Room", { room })}

    return (
        <TouchableWithoutFeedback >
            <View style={{
                marginBottom: 10,
                backgroundColor: "#fff",
                borderRadius: 15,
                elevation: 12,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 6},
                shadowOpacity: 0.1,
                shadowRadius: 10,
            }}>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingBottom: 14,
                    marginTop: 8,
                }}>
                    <Image source={categoryImage}
                           style={{
                               height: 60,
                               width: 60,
                               borderRadius: 15,
                               marginHorizontal: 15
                           }}/>
                    <View>
                        <Text style={{
                            fontWeight: "bold",
                            paddingTop: 8,
                            fontSize: 18,
                            lineHeight: 30,
                        }}>{item.name}</Text>
                        <Text style={{color: "#6B7280", fontSize: 15, lineHeight: 16}}>{item.category}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ItemCard;