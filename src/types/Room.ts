import {Item} from "../types/Item";
import {ImageSourcePropType} from "react-native";

export interface Room {
    id: string | number[];
    name: string;
    image: ImageSourcePropType;
    items: Item[] | [];
}