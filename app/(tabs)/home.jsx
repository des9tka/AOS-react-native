import { useState } from "react";
import {
    View,
    SafeAreaView,
    FlatList,
    Text,
    Image,
    RefreshControl,
} from "react-native";
import { Redirect } from "expo-router";

import { images } from "../../constants";
import { useGlobalContext } from "../../context";
import { useAppwrite, getAllVideoPosts, getRecomendedPosts } from "../../lib";
import {
    SearchInput,
    Recomends,
    EmptyState,
    LoadingScreen,
    VideoCard,
    OnOffButton,
} from "../../components";

const Home = () => {
    const { user } = useGlobalContext();

    if (!user) return <Redirect href="/home" />;

    const [loop, setLoop] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const {
        data: videoPosts,
        isLoading,
        refetchData,
    } = useAppwrite(getAllVideoPosts);

    const { data: latestVideoPosts, refetchData: latestRefetchData } =
        useAppwrite(getRecomendedPosts);

    const onRefresh = () => {
        setRefreshing(true);
        refetchData();
        latestRefetchData();
        setRefreshing(false);
    };

    const changeLopping = () => {
        setLoop(!loop);
    };

    return (
        <SafeAreaView className="bg-bgprimary h-full">
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                data={videoPosts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) =>
                    !isLoading && <VideoCard loop={loop} video={item} />
                }
                ListHeaderComponent={() => (
                    <View className="mt-[4vh]">
                        <View className="flex-row justify-between">
                            <View className="ml-4 mt-4">
                                <Text className="text-gray-500">
                                    Welcome back
                                </Text>
                                <Text className="font-psemibold text-xl text-orange-300">
                                    {user && user?.username
                                        ? user.username
                                        : user["_j"]?.username
                                        ? user["_j"]?.username
                                        : "Loading..."}
                                </Text>
                            </View>
                            <Image
                                source={images.logo}
                                className="w-12 h-12 mt-4 mr-2"
                            />
                        </View>
                        <SearchInput
                            wrapperStyles="m-4"
                            formStyles="w-full h-12 text-xl border-gray-800 pt-2 pl-2 pb-1 text-sm font-psemibold rounded-lg border bg-slate-800 placeholder-white"
                            placeholder={"Search some that you need..."}
                        />
                        {!isLoading ? (
                            <View className="mb-4 mt-4">
                                <View className="flex-row justify-between">
                                    <Text className="text-gray-500 font-pregular ml-4">
                                        Recomends for you
                                    </Text>
                                    <OnOffButton
                                        title={"Replay"}
                                        fn={changeLopping}
                                        state={loop}
                                    />
                                </View>

                                <Recomends
                                    posts={latestVideoPosts ?? []}
                                    loop={loop}
                                />
                            </View>
                        ) : (
                            <View className="mt-[30vh]">
                                <LoadingScreen loaderColor={"gold"} />
                            </View>
                        )}
                    </View>
                )}
                ListEmptyComponent={() =>
                    !isLoading && (
                        <EmptyState
                            title={"Be the first one to upload a content"}
                            subtitle={"No Uploads Found"}
                        />
                    )
                }
            />
        </SafeAreaView>
    );
};

export default Home;
