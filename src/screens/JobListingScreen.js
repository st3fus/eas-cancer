import { useFocusEffect } from "@react-navigation/native"
import { format } from "date-fns"
import I18n from "i18n-js"
import { Box, Button, FlatList, HStack, Stack, Text, VStack } from "native-base"
import React, { useCallback } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { BackHandler, RefreshControl, TouchableOpacity } from "react-native"
import Location from "../icons/Location"
import useJob from "../redux/hooks/useJob"
import useConfig from "../utils/config"

export default function JobListingScreen({ navigation }) {
    const hook = useJob()
    const colors = useConfig().colors

    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => true)
        return () => BackHandler.removeEventListener("hardwareBackPress", () => true)
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            setRefreshing(true)
            hook.cleanDetail()
            hook.cleanData()
            hook.fetchPage(hook.defaultSize, 1).then(() => setRefreshing(false))
        }, [])
    )

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        hook.cleanData()
        hook.fetchPage(hook.defaultSize, 1).then(() => setRefreshing(false))
    }, [])

    // const renderLoadMore = () => {
    //     if (hook.data && hook.data.length >= hook.defaultSize) {
    //         return (
    //             <View>
    //                 <CustomButton
    //                     // style={[styles.changeDataBtn, styles.btns]}
    //                     text={I18n.t("loadMore")}
    //                     onPress={() =>
    //                         hook.fetchPage(
    //                             hook.defaultSize,
    //                             parseInt(hook.pagination.current_page) + 1,
    //                             true
    //                         )
    //                     }
    //                 />
    //             </View>
    //         )
    //     } else {
    //         return null
    //     }
    // }

    return (
        <Box
            w={{
                base: "100%",
                md: "50%",
            }}
            background={colors.bg}
            flex={1}
        >
            <FlatList
                data={hook.data}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("JobDetailScreen", { id: item.id })}
                    >
                        <Box p={2} shadow={3} borderRadius={4} background={colors.bg} m={2}>
                            <VStack space={1}>
                                <Text color={colors.black} bold>
                                    {item.company_name}
                                </Text>
                                <Text
                                    color={colors.dark}
                                    fontSize={18}
                                    textTransform="uppercase"
                                    bold
                                >
                                    {item.title}
                                </Text>
                                <Text noOfLines={5} h="100" lineHeight={16}>
                                    {item.summary_text}
                                </Text>
                            </VStack>

                            <HStack
                                space={3}
                                justifyContent="space-between"
                                alignItems="flex-end"
                                mt={4}
                            >
                                <VStack space={1}>
                                    <HStack space={0.5} alignItems="center">
                                        <Location width={20} height={20} fill={colors.black} />
                                        <Text textTransform="uppercase">{item.city_name}</Text>
                                    </HStack>
                                    <Stack space={0}>
                                        <Text color={colors.black} bold>
                                            {I18n.t("applicationDeadline")}:
                                        </Text>
                                        <Text>
                                            {format(
                                                new Date(item.application_deadline),
                                                "dd-MM-yyyy hh:SS"
                                            )}
                                        </Text>
                                    </Stack>
                                </VStack>

                                <Button
                                    bg={item.is_registered ? colors.red : colors.medium}
                                    h={10}
                                    onPress={() =>
                                        navigation.navigate("JobDetailScreen", { id: item.id })
                                    }
                                >
                                    <Text color={colors.bg} textTransform="uppercase">
                                        {item.is_registered ? I18n.t("applied") : I18n.t("apply")}
                                    </Text>
                                </Button>
                            </HStack>
                        </Box>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                // ListFooterComponent={<View style={{ height: 0, marginBottom: 130 }}></View>}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                // ListFooterComponent={renderLoadMore}
            />
        </Box>
    )
}
