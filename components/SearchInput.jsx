import { TouchableOpacity } from "react-native";
import { View, TextInput } from "react-native";
import { Image } from "react-native";
import { router, usePathname } from "expo-router";
import { useState } from "react";

import { icons } from "../constants";

const SearchInput = ({
    formStyles,
    wrapperStyles,
    placeholder,
    initialQuery,
    ...props
}) => {
    const pathName = usePathname();
    const [query, setQuery] = useState(initialQuery ? initialQuery : "");

    return (
        <View className={wrapperStyles}>
            <View className="flex-row">
                <TextInput
                    value={query}
                    className={formStyles}
                    onChangeText={(e) => setQuery(e)}
                    placeholder={placeholder}
                    placeholderTextColor={"#797d7f"}
                />
                <TouchableOpacity
                    onPress={() => {
                        if (!query && pathName != "/home") {
                            router.push("/home");
                        } else if (pathName.startsWith("/search") && query) {
                            router.setParams({ query });
                        } else {
                            querySearch = query;
                            if (query.startsWith("#")) {
                                querySearch = querySearch.replace("#", "@");
                            }
                            router.push(`/search/${querySearch}`);
                        }
                    }}
                    className="absolute right-3 top-3"
                >
                    <Image className="w-5 h-5" source={icons.search} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export { SearchInput };
