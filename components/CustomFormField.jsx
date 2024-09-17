import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, TextInput } from "react-native";
import { Image } from "react-native";

import { icons } from "../constants";

const CustomFormField = ({
    value,
    title,
    titleStyles,
    formStyles,
    wrapperStyles,
    placeholder,
    handleChangeText,
    secure,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    // new RegExp("password").test(title.toLowerCase()) extraOne

    return (
        <View className={wrapperStyles}>
            <Text className={`${titleStyles} w-full`}>{title}</Text>

            <View className="flex-row">
                <TextInput
                    value={value}
                    className={formStyles}
                    onChangeText={handleChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={"#797d7f"}
                    secureTextEntry={secure && !showPassword}
                />
                {secure && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3"
                    >
                        <Image
                            className="w-6 h-6"
                            source={showPassword ? icons.eye : icons.eyeHide}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export { CustomFormField };
