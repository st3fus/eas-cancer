import DateTimePicker from "@react-native-community/datetimepicker"
import I18n from "i18n-js"
import { Button, Center, Flex, FormControl, KeyboardAvoidingView, Modal, Stack, Text } from "native-base"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import DatePicker from "../../icons/DatePicker"
import useDropdownData from "../../redux/hooks/useDropdownData"
import { forms } from "../../utils/constants"
import CustomInput from "../CustomInput"
import FilePicker from "../FilePicker"
import NewSelect from "../NewSelect"

const ModalForms = ({ showModal, setShowModal, colors, options, defaultValues, selectData, defaultSector }) => {
	const [selectedForm, setSelectedForm] = useState(null)
	const [selectedVerificationDoc, setSelectedVerificationDoc] = useState(null)
	const [selectedCvDoc, setSelectedCvDoc] = useState(null)
	const [selectedInitiativeDoc, setSelectedInitiativeDoc] = useState(null)
	const [selectedStatementDoc, setSelectedStatementDoc] = useState(null)
	const [selectedAbsenceDoc, setSelectedAbsenceDoc] = useState(null)
	const [mimeType, setMimeType] = useState("")

	const [showFirstDate, setShowFirstDate] = useState(false)
	const [showSecondDate, setShowSecondDate] = useState(false)

	const [firstDate, setFirstDate] = useState(new Date())
	const [secondDate, setSecondDate] = useState(new Date())

	const [firstDisplayDate, setFirstDisplayDate] = useState("")
	const [secondDisplayDate, setSecondDisplayDate] = useState("")

	const { handleSubmit, control, errors } = useForm({})

	const [disabled, setDisabled] = useState(false)

	const hookDd = useDropdownData()

	// useEffect(() => {

	// }, [hookDd.message, hookDd.loading])

	const onChange = (event, selectedDate, name) => {
		const currentDate = selectedDate

		let tempDate = new Date(currentDate)
		let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1 + "/" + tempDate.getFullYear())

		if (name === "date_from") {
			setShowFirstDate(false)
			setFirstDate(currentDate)
			setFirstDisplayDate(fDate)
		} else {
			setShowSecondDate(false)
			setSecondDate(currentDate)
			setSecondDisplayDate(fDate)
		}
	}

	const showDatepicker = (name) => {
		if (name === "date_from") {
			setShowFirstDate(true)
		} else {
			setShowSecondDate(true)
		}
	}

	const submit = (data) => {
		if (selectedForm) {
			hookDd.cleanMessage()
			let formData = new FormData()
			formData.append("form_id", selectedForm)

			Object.keys(data).map((key) => {
				if (key === "mpo") {
					formData.append(key, defaultSector.value)
				} else if (data[key]) {
					formData.append(key, data[key])
				} else {
					formData.append(key, "")
				}
			})

			if (selectedForm === 1) {
				if (selectedInitiativeDoc) {
					formData.append("first_attachment", {
						name: selectedInitiativeDoc.name,
						type: mimeType,
						uri: selectedInitiativeDoc.uri,
					})
				} else {
					formData.append("first_attachment", "")
				}
			} else if (selectedForm === 2) {
				if (selectedCvDoc) {
					formData.append("first_attachment", {
						name: selectedCvDoc.name,
						type: mimeType,
						uri: selectedCvDoc.uri,
					})
				} else {
					formData.append("first_attachment", "")
				}
			} else if (selectedForm === 3) {
				if (selectedAbsenceDoc) {
					formData.append("date_from", firstDisplayDate)
					formData.append("date_to", secondDisplayDate)
					formData.append("first_attachment", {
						name: selectedAbsenceDoc.name,
						type: mimeType,
						uri: selectedAbsenceDoc.uri,
					})
				} else {
					formData.append("first_attachment", "")
				}
			} else if (selectedForm === 4) {
				if (selectedVerificationDoc) {
					formData.append("first_attachment", {
						name: selectedVerificationDoc.name,
						type: mimeType,
						uri: selectedVerificationDoc.uri,
					})
				} else {
					formData.append("first_attachment", "")
				}

				if (selectedStatementDoc) {
					formData.append("second_attachment", {
						name: selectedStatementDoc.name,
						type: mimeType,
						uri: selectedStatementDoc.uri,
					})
				} else {
					formData.append("second_attachment", "")
				}
			}

			setDisabled(true)

			hookDd.submitFormular(formData).then((res) => {
				if (res !== undefined && res.status === 200) {
					handleClose()
					setSelectedForm("")
					setSelectedVerificationDoc(null)
					setDisabled(false)
				} else {
					setDisabled(false)
				}
			})
		}
	}

	const checkFileChange = (file, name, mimeType) => {
		if (name === "verification_doc") {
			setSelectedVerificationDoc(file)
		} else if (name === "cv_doc") {
			setSelectedCvDoc(file)
		} else if (name === "initiative_doc") {
			setSelectedInitiativeDoc(file)
		} else if (name === "statement_doc") {
			setSelectedStatementDoc(file)
		} else if (name === "absence_doc") {
			setSelectedAbsenceDoc(file)
		}

		setMimeType(mimeType)
	}

	const checkSelectedFile = (name) => {
		if (name === "verification_doc" && selectedVerificationDoc) {
			return { file: selectedVerificationDoc, name: selectedVerificationDoc.name }
		} else if (name === "cv_doc" && selectedCvDoc) {
			return { file: selectedCvDoc, name: selectedCvDoc.name }
		} else if (name === "initiative_doc" && selectedInitiativeDoc) {
			return { file: selectedInitiativeDoc, name: selectedInitiativeDoc.name }
		} else if (name === "statement_doc" && selectedStatementDoc) {
			return { file: selectedStatementDoc, name: selectedStatementDoc.name }
		} else if (name === "absence_doc" && selectedAbsenceDoc) {
			return { file: selectedAbsenceDoc, name: selectedAbsenceDoc.name }
		} else {
			return null
		}
	}

	const checkDate = (name) => {
		if (name === "date_from") {
			return { value: firstDate, display: firstDisplayDate, show: showFirstDate }
		} else {
			return { value: secondDate, display: secondDisplayDate, show: showSecondDate }
		}
	}

	// const checkShow = (name) => {
	// 	if(name === "date_from") {
	// 		return showFirstDate
	// 	}else{
	// 		return showSecondDate
	// 	}
	// }

	const handleClose = () => {
		hookDd.cleanMessage()
		setSelectedForm("")
		setShowModal(false)
		setSelectedVerificationDoc(false)
		setSelectedCvDoc(false)
		setSelectedInitiativeDoc(false)
		setSelectedStatementDoc(false)
		setSelectedAbsenceDoc(false)
	}

	const handleSelectForm = (value) => {
		hookDd.cleanMessage()
		setSelectedForm(value)
	}

	return (
		<Modal
			size={"lg"}
			isOpen={showModal}
			onClose={() => handleClose()}
			_backdrop={{
				bg: "_black",
				opacity: 0.7,
			}}
		>
			<KeyboardAvoidingView behavior="position">
				<Modal.Content maxWidth="450px" bg="_bg" alignSelf={"center"}>
					<Modal.CloseButton />
					<Modal.Header bg="_bg" borderBottomColor="_bg">
						{I18n.t("forms")}
					</Modal.Header>
					{hookDd.message && (
						<Center>
							<Text color="red.500" fontSize={"22px"}>
								{hookDd.message.text}
							</Text>
						</Center>
					)}
					<Modal.Body py={8}>
						<Stack space={6}>
							<NewSelect
								colors={colors}
								setSelectedItem={handleSelectForm}
								placeholder={I18n.t("select")}
								selectedItem={selectedForm}
								options={options}
							/>
							{forms.map((form, i) => {
								if (form.id === selectedForm) {
									return form.formFields.map((field, index) => {
										if (field.type === "input") {
											return (
												<Controller
													render={({ onChange, onBlur, value }) => (
														<CustomInput
															labelColor={colors.dark}
															label={`${I18n.t(field.label)} ${field.required ? "*" : ""}`}
															onBlur={onBlur}
															onChangeText={(value) => onChange(value)}
															value={value}
															editable={field.editable}
														/>
													)}
													control={control}
													name={field.fieldName}
													defaultValue={defaultValues[field.fieldName] ? defaultValues[field.fieldName] : ""}
												/>
											)
										} else if (field.type === "select") {
											return (
												<FormControl w="100%" maxW="400px">
													<FormControl.Label mb="0.5" _text={{ color: colors.dark, fontSize: 12 }}>
														{`${I18n.t(field.label)} ${field.required ? "*" : ""}`}
													</FormControl.Label>
													<Controller
														render={({ onChange, onBlur, value }) => (
															<NewSelect
																onBlur={onBlur}
																setSelectedItem={(value) => onChange(value)}
																options={!field.options ? selectData[field.selectDataName] : field.options}
																value={value}
																colors={colors}
																placeholder={I18n.t("choose")}
																defaultValue={!field.options ? defaultValues[field.fieldName].value : null}
																// defaultValue={!field.options ? defaultValues[field.fieldName].label : null}
																selectedItem={value}
															/>
														)}
														control={control}
														name={field.fieldName}
														defaultValue={!field.options ? defaultValues[field.fieldName].value : null}
														// selectedItem={!field.options ? defaultValues[field.fieldName] : null}
													/>
												</FormControl>
											)
										} else if (field.type === "file") {
											return (
												<FormControl w="100%" maxW="400px">
													<FormControl.Label mb="0.5" _text={{ color: colors.dark, fontSize: 12 }}>
														{`${I18n.t(field.label)} ${field.required ? "*" : ""}`}
													</FormControl.Label>
													{checkSelectedFile(field.fieldName) && (
														<FormControl.Label mb="0.5" _text={{ color: colors.dark, fontSize: 12 }}>
															{checkSelectedFile(field.fieldName).name}
														</FormControl.Label>
													)}

													<FilePicker
														handleFileSelect={checkFileChange}
														fileSelected={
															checkSelectedFile(field.fieldName) && checkSelectedFile(field.fieldName).file
														}
														fieldName={field.fieldName}
													/>
												</FormControl>
											)
										} else if (field.type === "date") {
											return (
												<FormControl w="100%" maxW="400px">
													<FormControl.Label mb="0.5" _text={{ color: colors.dark, fontSize: 12 }}>
														{`${I18n.t(field.label)} ${field.required ? "*" : ""}`}
													</FormControl.Label>
													<Button
														h="40px"
														bg="_medium"
														endIcon={<DatePicker width={22} height={22} fill={colors.bg} />}
														onPress={() => showDatepicker(field.fieldName)}
													>
														<Text mr={2} color="_bg" fontSize="11px">
															{checkDate(field.fieldName).display
																? `${checkDate(field.fieldName).display}`
																: I18n.t("choose")}
														</Text>
													</Button>
													{checkDate(field.fieldName).show && (
														<DateTimePicker
															testID="dateTimePicker"
															value={checkDate(field.fieldName).value}
															mode={"date"}
															is24Hour={true}
															onChange={(event, selectedDate) =>
																onChange(event, selectedDate, field.fieldName)
															}
														/>
													)}
												</FormControl>
											)
										}
									})
								}
							})}
						</Stack>
					</Modal.Body>

					<Modal.Footer w="100%" justifyContent={"flex-start"} bg="_bg" borderTopColor="_bg">
						<Flex flexDirection="row" w="100%" justifyContent="space-between">
							<Button
								variant="red"
								bg="_red"
								_text={{
									color: "_bg",
									fontSize: "11px",
									textTransform: "uppercase",
								}}
								// colorScheme="blueGray"
								onPress={() => {
									handleClose()
								}}
							>
								{I18n.t("close")}
							</Button>

							<Button
								bg="_dark"
								_text={{
									color: "_bg",
									fontSize: "11px",
									textTransform: "uppercase",
								}}
								onPress={handleSubmit(submit)}
								disabled={disabled}
								isLoading={hookDd.loading}
							>
								{I18n.t("confirm")}
							</Button>
						</Flex>
					</Modal.Footer>
				</Modal.Content>
			</KeyboardAvoidingView>
		</Modal>
	)
}

export default ModalForms
