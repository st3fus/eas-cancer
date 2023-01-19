import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { backgroundColor } from "styled-system"
import colors from "../assets/theme/colors"
import CheckIcon from "../icons/CheckIcon"
import XIcon from "../icons/XIcon"
import useConfig from "../utils/config"

export const CorrectIndicator = () => {
    const colors = useConfig().colors

    return (
        <View style={[styles.container, styles.correct, { backgroundColor: colors.dark }]}>
            <CheckIcon width={12} height={12} fill={colors.bg} />
        </View>
    )
}
export const WrongIndicator = () => {
    const colors = useConfig().colors
    return (
        <View style={[styles.container, styles.wrong, { backgroundColor: colors.red }]}>
            <XIcon width={16} height={16} fill={colors.bg} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 18,
        height: 18,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        margin: 3,
    },
    // correct: {
    //     backgroundColor: config.colors.dark,
    // },
    // wrong: {
    //     backgroundColor: config.colors.red,
    // },
})
