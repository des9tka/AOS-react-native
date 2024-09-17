import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

const OnOffButton = ({ fn, title, state }) => {
    const [isOn, setIsOn] = useState(state);

    const toggleSwitch = () => {
        setIsOn(!isOn);
    };

    return (
        <View className="flex-row">
            <Text className="text-gray-500 mr-1 text-sm font-plight">
                {title}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    toggleSwitch();
                    fn();
                }}
                className={`rounded-full h-6 w-10 justify-center content-center p-1 mr-2 ${
                    isOn ? "bg-yellow-300" : "bg-gray-700"
                }`}
            >
                <View
                    className={`h-4 w-4 rounded-full ${
                        isOn
                            ? "translate-x-4 bg-gray-700"
                            : "translate-x-0 bg-yellow-300"
                    }`}
                ></View>
            </TouchableOpacity>
        </View>
    );
};

export { OnOffButton };
