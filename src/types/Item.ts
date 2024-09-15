import { Marker } from "types/Marker";
import { ImageSourcePropType } from "react-native";

export interface Item {
    id: string | number[];
    name: string;
    image?: ImageSourcePropType | string | undefined;
    dominantColor?: string;
    category: string;
    marker: Marker | undefined;
}