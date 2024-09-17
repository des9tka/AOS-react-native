import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({
    title,
    handleOnClick,
    buttonStyles,
    textStyles,
    isLoading,
}) => {
    return (
        <TouchableOpacity
            onPress={handleOnClick}
            className={`${buttonStyles} ${isLoading ? "opacity-50" : ""}`}
            disabled={isLoading}
        >
            <Text className={`${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    );
};

export { CustomButton };
