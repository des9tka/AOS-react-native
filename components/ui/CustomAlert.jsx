import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { CustomButton } from "../CustomButton";

const CustomAlert = ({ handleOnClick, title, subTitle, buttonText }) => {
    return (
        <View className="w-2/3 h-[100px] bg-bgprimary border border-gray-500 rounded-md justify-center items-center">
            <Text className="text-red-500 font-pextrabold text-xl">
                {title}
            </Text>

            <Text className="text-white font-pregular opacity-50">
                {subTitle}
            </Text>

            <TouchableOpacity>
                <CustomButton
                    title={buttonText}
                    textStyles={"text-white font-semibold"}
                    handleOnClick={() => handleOnClick()}
                    buttonStyles={"mt-2 border rounded-md border-gray-500 p-1"}
                />
            </TouchableOpacity>
        </View>
    );
};

export { CustomAlert };
