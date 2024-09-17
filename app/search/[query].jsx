import { useEffect } from "react";
import { View, SafeAreaView, FlatList, Text, Image, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { images } from "../../constants";
import { getSearchedPostsByParam, useAppwrite } from "../../lib";
import {
    LoadingScreen,
    VideoCard,
    SearchInput,
    EmptyState,
} from "../../components";

const Search = () => {
    const { query } = useLocalSearchParams();

    // Way of parse hashTag query with "#", as usual way of "/search/#query" cut "/" and have output "/search#query".
    const parsedQuery = query.replace("@", "#");

    const {
        data: videoPosts,
        isLoading,
        refetchData,
    } = useAppwrite(() =>
        !parsedQuery.includes("#")
            ? getSearchedPostsByParam("title", parsedQuery)
            : getSearchedPostsByParam("hashTags", parsedQuery)
    );

    useEffect(() => {
        refetchData();
    }, [query]);

    return (
        <SafeAreaView className="bg-bgprimary h-full">
            <FlatList
                data={videoPosts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) =>
                    !isLoading && <VideoCard loop={false} video={item} />
                }
                ListHeaderComponent={() => (
                    <View className="mt-[4vh]">
                        <View className="flex-row justify-between">
                            <View className="ml-4 mt-4">
                                <Text className="text-gray-500">
                                    Results by searching
                                </Text>
                                <Text className="font-psemibold text-xl text-orange-300">
                                    {parsedQuery}
                                </Text>
                            </View>
                            <Image
                                source={images.logo}
                                className="w-12 h-12 mt-4 mr-2"
                            />
                        </View>
                        <SearchInput
                            initialQuery={parsedQuery}
                            wrapperStyles="m-4"
                            formStyles="w-full h-12 text-xl border-gray-800 pt-2 pl-2 pb-1 text-sm font-psemibold rounded-lg border bg-slate-800 placeholder-white"
                            placeholder={"Search some that you need..."}
                        />
                        {isLoading && (
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
                            subtitle={"No Uploads Found for this Search Query"}
                        />
                    )
                }
            />
        </SafeAreaView>
    );
};

export default Search;
