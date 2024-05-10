import {StyleSheet, TextInput, View} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const SearchBar = () => {
    return (
        <View style={styles.searchbarContainer}>
            <View style={styles.searchbarRow}>
                <MaterialIcons name={"search"} size={28} style={styles.searchIcon}/>
                <TextInput placeholder={'Rooms'} style={styles.searchField}/>
            </View>
            <View style={{padding:3, backgroundColor: '#D1D5DB', borderRadius: 999, marginLeft: 2,}}>
                <MaterialIcons name={"filter-list"}  size={28} style={{borderWidth: 2.5, borderColor:'#fff', borderRadius: 999,}}/>
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
    }
});

export default SearchBar;