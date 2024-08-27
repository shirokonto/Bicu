import { Marker } from "types/Marker";

export interface Item {
    id: string | number[];
    name: string;
    category: string;
    marker: Marker | undefined;
    markers?: Marker[];
}