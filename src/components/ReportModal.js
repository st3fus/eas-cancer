import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"

const ReportModal = () => {
    const [modalVisible, setModalVisible] = useState(false)

    const styles = StyleSheet.create({
        overlay: {
            flex: 1,
            position: "absolute",
            left: 0,
            top: 0,
            opacity: 0.5,
            backgroundColor: "black",
            width: width,
            alignItems: "center",
            justifyContent: "center",
        },
        modal: {
            marginTop: 20,
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "center",
            width: width - 20,
            height: height - 60,
            backgroundColor: colors.bg,
            opacity: 0.9,
            borderRadius: 12,
            paddingVertical: 8,
            paddingHorizontal: 2,
        },
    })

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={[styles.overlay, { height: height }]} />
                <View style={styles.modal}>
                    <Text></Text>
                </View>
            </Modal>
        </>
    )
}

export default ReportModal
