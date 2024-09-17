import { View, Text, Image } from "react-native";

import { images } from "../../constants";

const EmptyState = ({ title, subtitle }) => {
    return (
        <View className="justify-center w-full items-center">
            <Image className="w-48 h-48" source={images.empty} />
            <Text className="font-psemibold text-lg text-white">
                {subtitle}
            </Text>
            <Text className="text-gray-500 text-xs font-medium mb-2">
                {title}
            </Text>
        </View>
    );
};

export { EmptyState };
