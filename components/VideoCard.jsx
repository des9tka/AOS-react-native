import { View, Text, Image } from "react-native";
import { icons } from "../constants";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Video, ResizeMode } from "expo-av";

const VideoCard = ({
    loop,
    video: {
        title,
        thumbnail,
        video,
        uploader: { username, avatar },
    },
}) => {
    const [play, setPlay] = useState(false);
    return (
        <View className="flex-col items-center justify-center ml-4 mr-4 mb-4">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[45px] h-[45px] items-center justify-center">
                        <Image
                            resizeMode="cover"
                            className="w-[50px] h-[50px] rounded-lg"
                            source={{ uri: avatar }}
                        />
                    </View>
                    <View className="justify-center flex-1 ml-3">
                        <Text className="text-xs text-white font-pextrabold">
                            {title}
                        </Text>
                        <Text className="text-xs text-gray-400 font-pmedium">
                            {username}
                        </Text>
                    </View>
                </View>
                <View className="pt-4 mr-4">
                    <Image
                        source={icons.menu}
                        className="w-4 h-4"
                        resizeMode="contain"
                    />
                </View>
            </View>
            {play ? (
                <View className="w-full bg-black items-center">
                    <Video
                        source={{ uri: video }}
                        className="w-52 h-72 rounded-[35px]"
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls
                        shouldPlay
                        isLooping={loop}
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish && !loop) {
                                setPlay(false);
                            }
                        }}
                    />
                    <TouchableOpacity
                        className="absolute top-4 right-4"
                        onPress={() => setPlay(false)}
                    >
                        <Image className="w-4 h-4" source={icons.cross} />
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="w-[100vw] h-[35vh] m-2 mr-6 ml-6 justify-center items-center">
                    <Image
                        source={{ uri: thumbnail }}
                        className="w-full h-full rounded-xl"
                    />
                    <TouchableOpacity
                        onPress={() => setPlay(true)}
                        className="absolute"
                    >
                        <Image source={icons.play} className="w-8 h-8" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export { VideoCard };
