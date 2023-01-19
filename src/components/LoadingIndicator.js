import { StyleSheet, ActivityIndicator, View } from "react-native"
import React from "react"

const LoadingIndicator = ({ colors }) => {
    return (
        <View style={[loadingStyles.container, loadingStyles.horizontal]}>
            <ActivityIndicator
                size="large"
                animating={true}
                style={{ opacity: 1 }}
                color={colors.medium}
            />
        </View>
    )
}

export default LoadingIndicator

const loadingStyles = StyleSheet.create({
    container: {
        flex: 5,
        justifyContent: "center",
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
})
