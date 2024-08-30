import { ImageSourcePropType } from "react-native";
import { Item, Room } from "types";

export type RoomScreenParams = {
    room: Room;
    itemId?: string;
};

export interface ImageViewerProps {
    selectedImage: ImageSourcePropType | null | undefined;
    maximized: boolean;
}

export interface ImageModalProps {
    visible: boolean;
    onClose: () => void;
    selectedImage: ImageSourcePropType | null | undefined;
    room: Room;
    onMarkerUpdate: (selectedItems: Item[]) => void;
    highlightedItemId?: string | number[] | null;
}

export interface AddItemModalProps {
    visible: boolean;
    onClose: () => void;
    onAddItem: (item: Item) => void;
}

export interface EditableTitleProps {
    defaultTitle: string;
    onReset: () => void;
    onAddMarker: () => void;
}

export type ItemRowProps = {
    room: Room;
    onItemPress: (itemId: string | number[] ) => void;
};

export type ItemCardProps = {
    item: Item;
    index: number;
    onPress: () => void;
};

export const categories = [
    {
        id: 1,
        name: 'Clothing',
        image: require('../assets/images/categories/clothing.png'),
    },
    {
        id: 2,
        name: 'Food',
        image: require('../assets/images/categories/food.png'),
    },
    {
        id: 3,
        name: 'Tech',
        image: require('../assets/images/categories/technology.png'),
    },
    {
        id: 4,
        name: 'Garden',
        image: require('../assets/images/categories/garden.png'),
    },
    {
        id: 5,
        name: 'Furniture',
        image: require('../assets/images/categories/furniture.png'),
    },
    {
        id: 6,
        name: 'Media',
        image: require('../assets/images/categories/media.png'),
    },
    {
        id: 7,
        name: 'Toys',
        image: require('../assets/images/categories/toy.png'),
    },
    {
        id: 8,
        name: 'Household',
        image: require('../assets/images/categories/household.png'),
    },
    {
        id: 9,
        name: 'Misc',
        image: require('../assets/images/categories/misc.png'),
    },
]