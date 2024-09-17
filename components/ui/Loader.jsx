import { View, ActivityIndicator } from "react-native";

const LoadingScreen = ({ loaderColor }) => {
    return (
        <View
            style={`flex-1 items-center justify-center bg-gray-100 container`}
        >
            <ActivityIndicator size="large" color={loaderColor} />
        </View>
    );
};

export { LoadingScreen };
