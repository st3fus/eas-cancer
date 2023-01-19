import React, { useState, useEffect } from "react"
import {
    Button,
    Image,
    View,
    Platform,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Dimensions,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import CustomButton from "./CustomButton"
import { IMAGE_PREFIX } from "../utils/constants"
import i18n from "i18n-js"
import { Text } from "react-native-elements"
import useConfig from "../utils/config"
var { width, height } = Dimensions.get("window")

export default function ImagePickerComponent({ handleUpload, imageSelected }) {
    const colors = useConfig().colors

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.cancelled) {
            // setImage(result.uri)
            handleUpload(result)
        }
        // setModalVisible(false)
    }

    const styles = StyleSheet.create({
        btn: {
            backgroundColor: colors.dark,
            width: 190,
            height: 38,
            borderRadius: 12,
            marginVertical: 8,
        },
    })

    return (
        <CustomButton
            style={styles.btn}
            bg={colors.medium}
            text={imageSelected ? i18n.t("imageSelected") : i18n.t("choosePicture")}
            onPress={pickImage}
        />
    )
}
