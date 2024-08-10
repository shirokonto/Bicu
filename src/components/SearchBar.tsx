import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";

const SearchBar = () => {

    const onFilterPress  = () => {
        alert("pressed")
    }
    return (
        <View style={styles.searchbarContainer}>
            <View style={styles.searchbarRow}>
                <MaterialIcons name={"search"} size={28} style={styles.searchIcon}/>
                <TextInput placeholder={'Rooms'} style={styles.searchField}/>
            </View>
            <View style={styles.filterButtonContainer}>
                <TouchableOpacity
                    onPress={onFilterPress}
                    >
                <MaterialIcons name={"filter-list"}  size={28} style={styles.filterButton}/>
                </TouchableOpacity>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchbarContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginHorizontal: 8,
        marginTop: 5,
        paddingHorizontal: 8,
        paddingBottom: 2,
    },
    searchbarRow: {
        flexDirection:"row",
        flex: 1,
        alignItems: 'center',
        padding: 5,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#D1D5DB'
    },
    searchIcon: {
        color: "gray"
    },
    searchField: {
        marginLeft: 2,
        flex: 1
    },
    filterButtonContainer: {
        padding:3,
        backgroundColor: '#D1D5DB',
        borderRadius: 999,
        marginLeft: 2,
    },
    filterButton: {
        borderWidth: 2.5,
        borderColor:'#fff',
        borderRadius: 999,
    }
});

export default SearchBar;