import { useState } from "react";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import { View, FlatList } from "react-native";

import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";

const zooms = {
    In: {
        0: {
            scale: 0.9,
        },
        1: {
            scale: 1,
        },
    },
    Out: {
        0: {
            scale: 1,
        },
        1: {
            scale: 0.9,
        },
    },
};

const RecomendsItem = ({ activeItem, item, loop }) => {
    const [play, setPlay] = useState(false);

    return (
        <Animatable.View
            duration={500}
            animation={activeItem === item.$id ? zooms.In : zooms.Out}
        >
            {play ? (
                <View>
                    <Video
                        source={{ uri: item.video }}
                        className="w-52 h-72 rounded-[35px] bg-black"
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls
                        isLooping={loop}
                        shouldPlay
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
                <View className="justify-center relative items-center">
                    <ImageBackground
                        className="w-52 h-72 rounded-[35px] overflow-hidden shadow-lg shadow-black/40"
                        source={{ uri: item.thumbnail }}
                    />
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => setPlay(true)}
                        className="absolute"
                    >
                        <Image source={icons.play} className="w-10 h-10" />
                    </TouchableOpacity>
                </View>
            )}
        </Animatable.View>
    );
};

const Recomends = ({ posts, loop }) => {
    const [activeItem, setActiveItem] = useState(posts[0]);

    const viewbleItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    };

    return (
        <FlatList
            className="ml-2 mr-2"
            data={posts}
            horizontal
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <RecomendsItem
                    activeItem={activeItem}
                    item={item}
                    loop={loop}
                />
            )}
            onViewableItemsChanged={viewbleItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
            }}
        />
    );
};

export { Recomends };
