import { ActionSheetIOS } from "react-native";
import { useImageHandler } from "hooks/useImageHandler";
import { Room } from "types";

export const openActionSheet = async (room : Room) => {
    const { selectedImg, openGalleryAsync, openCameraAsync } = useImageHandler();

    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: ['Cancel', 'Camera', 'Gallery'],
            cancelButtonIndex: 0,
            userInterfaceStyle: 'dark',
        },
        buttonIndex => {
            if (buttonIndex === 0) {
                // cancel action
            } else if (buttonIndex === 1) {
                // openCameraAsync(room)
            } else if (buttonIndex === 2) {
                // openGalleryAsync(room)
            }
        },
    );
};
