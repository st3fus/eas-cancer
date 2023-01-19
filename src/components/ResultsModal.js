// import React, { useEffect, useState } from "react"
// import { Dimensions, Modal, StyleSheet, Text, View } from "react-native"
// import CustomButton from "./CustomButton"
// var { width, height } = Dimensions.get("window")
// import { PieChart } from "react-native-chart-kit"
// import i18n from "i18n-js"
// import useDropdownData from "../redux/hooks/useDropdownData"
// import { checkLabel } from "../utils/functions"
// import ProfileLevelIcon0 from "../icons/ProfileLevelIcon0"
// import ProfileLevelIcon1 from "../icons/ProfileLevelIcon1"
// import ProfileLevelIcon2 from "../icons/ProfileLevelIcon2"
// import ProfileLevelIcon3 from "../icons/ProfileLevelIcon3"
// import ProfileLevelIcon4 from "../icons/ProfileLevelIcon4"
// import ProfileLevelIcon5 from "../icons/ProfileLevelIcon5"

// const ResultsModal = ({ colors }) => {
//     const [modalVisible, setModalVisible] = useState(false)

//     const hookDd = useDropdownData()

//     const [data, setData] = useState(null)
//     const [pieData, setPieData] = useState([])
//     const [level, setLevel] = useState("")
//     const [monthlyPoints, setMonthlyPoints] = useState("")
//     const [annualPoints, setAnnualPoints] = useState("")

//     const colorsArray = ["rgba(131, 167, 234, 1)", "#ffafcc", "#560bad", "#52b69a", "#ccd5ae"]

//     useEffect(() => {
//         if (hookDd.graphData) {
//             const generatedArray = []
//             const arrays = hookDd.graphData.monthly_pie_data
//             arrays.labels.map((label, i) =>
//                 generatedArray.push({
//                     name: checkLabel(label),
//                     population: arrays.series[i],
//                     color: colorsArray[i],
//                     legendFontColor: "#7F7F7F",
//                     legendFontSize: 14,
//                 })
//             )
//             setPieData(generatedArray)
//             setMonthlyPoints(hookDd.graphData.points_current_month)
//             setAnnualPoints(hookDd.graphData.points_current_year)
//             setLevel(hookDd.graphData.level)
//         }
//     }, [hookDd.graphData])

//     const styles = StyleSheet.create({
//         overlay: {
//             flex: 1,
//             position: "absolute",
//             left: 0,
//             top: 0,
//             opacity: 0.5,
//             backgroundColor: "black",
//             width: width,
//             alignItems: "center",
//             justifyContent: "center",
//         },
//         modal: {
//             marginTop: 20,
//             alignItems: "center",
//             justifyContent: "space-between",
//             alignSelf: "center",
//             width: width - 20,
//             height: height - 60,
//             backgroundColor: colors.bg,
//             opacity: 0.9,
//             borderRadius: 12,
//             paddingVertical: 8,
//             paddingHorizontal: 2,
//         },
//         title: {
//             fontSize: 14,
//             fontFamily: `${companyFontName}-Regular`,
//             color: colors.dark,
//             textTransform: "uppercase",
//             marginTop: 20,
//             textAlign: "center",
//         },
//         levelsWrapper: {
//             // width: 190,
//             alignItems: "center",
//         },
//         levelsRow: {
//             flexDirection: "row",
//             marginTop: 20,
//             justifyContent: "space-between",
//             width: 190,
//         },
//         chartWrapper: {},
//         btnWrapper: {
//             alignItems: "flex-end",
//             justifyContent: "flex-end",
//             width: "100%",
//         },
//         btn: {
//             backgroundColor: colors.red,
//             width: 190,
//             height: 38,
//             borderRadius: 12,
//         },
//         profileBtn: {
//             backgroundColor: colors.medium,
//         },
//     })

//     return (
//         <>
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => {
//                     setModalVisible(!modalVisible)
//                 }}
//             >
//                 <View style={[styles.overlay, { height: height }]} />
//                 <View style={styles.modal}>
//                     <View>
//                         <Text style={styles.title}>{i18n.t("result")}</Text>
//                         <View style={styles.levelsWrapper}>
//                             <View style={styles.levelsRow}>
//                                 <ProfileLevelIcon0
//                                     width={25}
//                                     height={40}
//                                     fill={level === 1 ? colors.dark : colors.medium}
//                                 />
//                                 <ProfileLevelIcon1
//                                     width={25}
//                                     height={40}
//                                     fill={level === 2 ? colors.dark : colors.medium}
//                                 />
//                                 <ProfileLevelIcon2
//                                     width={25}
//                                     height={40}
//                                     fill={level === 3 ? colors.dark : colors.medium}
//                                 />
//                                 <ProfileLevelIcon3
//                                     width={25}
//                                     height={40}
//                                     fill={level === 4 ? colors.dark : colors.medium}
//                                 />
//                                 <ProfileLevelIcon4
//                                     width={25}
//                                     height={40}
//                                     fill={level === 5 ? colors.dark : colors.medium}
//                                 />
//                                 <ProfileLevelIcon5
//                                     width={25}
//                                     height={40}
//                                     fill={level === 6 ? colors.dark : colors.medium}
//                                 />
//                             </View>
//                             {level === 1 ? (
//                                 <ProfileLevelIcon0 fill={colors.medium} width={90} height={120} />
//                             ) : level === 2 ? (
//                                 <ProfileLevelIcon1 fill={colors.medium} width={90} height={120} />
//                             ) : level === 3 ? (
//                                 <ProfileLevelIcon2 fill={colors.medium} width={90} height={120} />
//                             ) : level === 4 ? (
//                                 <ProfileLevelIcon3 fill={colors.medium} width={90} height={120} />
//                             ) : level === 5 ? (
//                                 <ProfileLevelIcon4 fill={colors.medium} width={90} height={120} />
//                             ) : level === 6 ? (
//                                 <ProfileLevelIcon5 fill={colors.medium} width={90} height={120} />
//                             ) : null}
//                             <View
//                                 style={{
//                                     flexDirection: "column",
//                                     marginTop: 8,
//                                 }}
//                             >
//                                 <View style={{ flexDirection: "row" }}>
//                                     <Text
//                                         style={{
//                                             color: colors.medium,
//                                             fontFamily: `${companyFontName}-Regular`,
//                                             textTransform: "uppercase",
//                                             marginRight: 5,
//                                         }}
//                                     >
//                                         {i18n.t("monthlyPoints")}
//                                     </Text>
//                                     <Text style={{ color: colors.dark, fontFamily: `${companyFontName}-Regular` }}>
//                                         {monthlyPoints}
//                                     </Text>
//                                 </View>
//                                 <View style={{ flexDirection: "row" }}>
//                                     <Text
//                                         style={{
//                                             color: colors.medium,
//                                             fontFamily: `${companyFontName}-Regular`,
//                                             textTransform: "uppercase",
//                                             marginRight: 5,
//                                         }}
//                                     >
//                                         {i18n.t("annualPoints")}
//                                     </Text>
//                                     <Text style={{ color: colors.dark, fontFamily: `${companyFontName}-Regular` }}>
//                                         {annualPoints}
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>
//                     </View>

//                     <View style={styles.chartWrapper}>
//                         <PieChart
//                             data={pieData}
//                             width={width - 6}
//                             height={140}
//                             chartConfig={{
//                                 backgroundColor: "#e26a00",
//                                 backgroundGradientFrom: "#fb8c00",
//                                 backgroundGradientTo: "#ffa726",
//                                 decimalPlaces: 2, // optional, defaults to 2dp
//                                 color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                                 labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                                 style: {
//                                     borderRadius: 16,
//                                 },
//                                 propsForDots: {
//                                     r: "6",
//                                     strokeWidth: "2",
//                                     stroke: "red",
//                                 },
//                             }}
//                             accessor={"population"}
//                             backgroundColor={"transparent"}
//                             paddingLeft={"-84"}
//                             center={[60, 0]}
//                             absolute
//                         />
//                     </View>
//                     <View style={styles.btnWrapper}>
//                         <CustomButton
//                             style={[styles.btn, { maxWidth: 140, marginHorizontal: 14 }]}
//                             text={i18n.t("close")}
//                             onPress={() => setModalVisible(false)}
//                             bg={colors.red}
//                         />
//                     </View>
//                 </View>
//             </Modal>
//             <CustomButton
//                 w={190}
//                 bg={colors.medium}
//                 text={i18n.t("result")}
//                 onPress={() => setModalVisible(true)}
//                 style={[styles.btn, styles.profileBtn]}
//             />
//         </>
//     )
// }

// export default ResultsModal
