import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

import { images } from "../constants";
import { CustomButton } from "../components";
import { useGlobalContext } from "../context";

// import { useEffect, useState } from "react";
// import { useOpacityAnimation } from "../components/OpacityDelayHook";

export default function App() {
    const { isLoading, isLoggedIn } = useGlobalContext();
    const [card, setCard] = useState(1);

    // As tailwind doesnt work properly (in my case), should comment and use state for immidiate swap cards.
    // const [isSwapped, setIsSwapped] = useState(false);

    // const {
    //     opacity: firstImagesOpacity,
    //     opacityDecrease: firstImagesOpacityDecrease,
    //     opacityIncrease: firstImagesOpacityIncrease,
    //     delay,
    // } = useOpacityAnimation();
    // const {
    //     opacity: secondImagesOpacity,
    //     opacityDecrease: secondImagesOpacityDecrease,
    //     opacityIncrease: secondImagesOpacityIncrease,
    // } = useOpacityAnimation();

    // ?As transition-opacity isn`t working should make base on state animate function.
    // const swapeCards = async () => {
    //     if (!isSwapped) {
    //         firstImagesOpacityDecrease();
    //         await delay(500);
    //         secondImagesOpacityIncrease();
    //     } else {
    //         secondImagesOpacityDecrease();
    //         await delay(500);
    //         firstImagesOpacityIncrease();
    //     }
    //     setIsSwapped(!isSwapped);
    // };

    if (!isLoading && isLoggedIn) router.replace("/home");

    return (
        <SafeAreaView className="h-full bg-bgprimary">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                {isLoading ? (
                    <View className="w-full h-full justify-center">
                        <View className="flex-row justify-center">
                            <Image
                                source={images.logo}
                                className="w-16 h-16 m-1"
                            />
                            <Text className="font-black text-7xl m-1 text-yellow-300 text-center">
                                AOS
                            </Text>
                            <Image
                                source={images.logo}
                                className="w-16 h-16 m-1"
                            />
                        </View>
                    </View>
                ) : (
                    <View className="flex h-full items-center">
                        <Image
                            source={images.authBackground}
                            className="w-full h-full absolute inset-0 object-cover z-0"
                        />
                        <View className="flex-row  mt-[6vh]">
                            <Image
                                source={images.logo}
                                className="w-16 h-16 m-1"
                            />
                            <Text className="font-black text-7xl m-1 text-yellow-300 text-center">
                                AOS
                            </Text>

                            <Image
                                source={images.logo}
                                className="w-16 h-16 m-1"
                            />
                        </View>

                        <Text className="text-3xl text-orange-300"></Text>
                        <Text className="text-lg mb-8 text-white font-plight ml-5 mr-5 text-center">
                            Place where you find hustle images & videos for your
                            ideas and inspiration. Whether you're an
                            entrepreneur, artist, or just someone looking to
                            stay motivated, our platform offers a curated
                            collection of high-energy visuals to fuel your
                            passion. Here also you can find people, that have
                            same ideas and think way as you. This great ability
                            to find someone for your startapp/buisness.
                        </Text>

                        <View className="w-full flex-row justify-evenly">
                            <CustomButton
                                title={"Continue with Email"}
                                handleOnClick={() => router.push("/sign-in")}
                                buttonStyles={
                                    "bg-yellow-300 rounded-lg p-1 m-2 w-2/4"
                                }
                                textStyles={"text-center font-psemibold pt-1"}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                if (card == 3) {
                                    setCard(1);
                                } else {
                                    setCard(card + 1);
                                }
                            }}
                            className="mt-4 relative w-full h-40"
                        >
                            {card == 1 && (
                                <View>
                                    <Image
                                        source={images.firstCard}
                                        className={`w-[80px] h-[120px] -rotate-12 rounded-2xl absolute top-2 left-[32vw] transition-opacity duration-500`}
                                    />
                                    <Image
                                        source={images.secondCard}
                                        className={`w-[80px] h-[120px] rotate-12 rounded-2xl absolute top-4 right-[32vw] transition-opacity duration-500`}
                                    />
                                </View>
                            )}
                            {card == 2 && (
                                <View>
                                    <Image
                                        source={images.thirdCard}
                                        className={`w-[80px] h-[120px] -rotate-12 rounded-2xl absolute top-2 left-[32vw] transition-opacity duration-500`}
                                    />
                                    <Image
                                        source={images.fourthCard}
                                        className={`w-[80px] h-[120px] rotate-12 rounded-2xl absolute top-4 right-[32vw] transition-opacity duration-500}`}
                                    />
                                </View>
                            )}
                            {card == 3 && (
                                <View>
                                    <Image
                                        source={images.sixthCard}
                                        className={`w-[80px] h-[120px] -rotate-12 rounded-2xl absolute top-2 left-[32vw] transition-opacity duration-500`}
                                    />
                                    <Image
                                        source={images.fifthCard}
                                        className={`w-[80px] h-[120px] rotate-12 rounded-2xl absolute top-4 right-[32vw] transition-opacity duration-500}`}
                                    />
                                </View>
                            )}
                        </TouchableOpacity>

                        <View className="flex-row">
                            <View
                                className={`w-2 h-2 rounded-3xl ${
                                    card == 1 ? "bg-yellow-300" : "bg-white"
                                }`}
                            ></View>
                            <View
                                className={`w-2 h-2 ml-1 rounded-3xl ${
                                    card == 2 ? "bg-yellow-300" : "bg-white"
                                }`}
                            ></View>
                            <View
                                className={`w-2 h-2 ml-1 rounded-3xl ${
                                    card == 3 ? "bg-yellow-300" : "bg-white"
                                }`}
                            ></View>
                        </View>

                        <Text className="mt-4 font-pregular text-white opacity-50">
                            App was made by SIA
                        </Text>
                    </View>
                )}
            </ScrollView>
            <StatusBar style="light" />
        </SafeAreaView>
    );
}
