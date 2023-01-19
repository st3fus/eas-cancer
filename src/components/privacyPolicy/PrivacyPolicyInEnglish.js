import React from "react"
import { StyleSheet, Text } from "react-native"
import colors from "../../assets/theme/colors"
import useConfig from "../../utils/config"

const PrivacyPolicyInEnglish = ({ config }) => {
	const companyFontName = useConfig().companyFontName

	const styles = StyleSheet.create({
		content: {
			alignItems: "center",
			paddingHorizontal: 10,
			fontFamily: `${companyFontName}-Regular`,
			lineHeight: 20,
			color: colors.dark,
		},
	})

	return (
		<Text style={styles.content}>
			{`${config.companyName} LLC`} Kraljevo (hereinafter: {config.companyName}), based in Kraljevo, ul. Ribnička br. 26,{" "}
			{config.companyInfo}, in the course of its activities, processes personal data in compliance with all relevant laws and
			regulations.
			{"\n"}
			{"\n"}Please read the following information carefully!{"\n"}
			{"\n"}
			Personality data controller {"\n"}
			{"\n"}
			{config.companyName} is a personal data controller in accordance with the law and regulations on personal data protection.{" "}
			{config.companyName}, as the Personal Data Handler, determines the purpose and means of personal data processing and is
			responsible for storing and using personal data in written and / or electronic form. {"\n"}
			{"\n"}Personality data processor{"\n"}
			{"\n"}
			{config.companyName}, in its business, may process personal data on behalf of the Personal Data Manager, or in accordance with
			its written instructions in which case it has the status of Personal Data Processor. {"\n"}
			{"\n"}What personal information does {config.companyName} collect? {"\n"}
			{"\n"}Personal data that {config.companyName} collects personal data of its clients, ie users of the {config.policyAppName}{" "}
			internet application, as well as visitors to the internet presentation located on the internet domain: {config.website}. These
			are, first of all, personal data without which {config.companyName} cannot perform the service, and include the least data
			related to the use of the website located on the mentioned internet domain, as well as other personal data necessary to exercise
			the client's rights based on legal provisions, and shall include at least:{"\n"}basic personal data (name and surname)
			{"\n"}- contact information (e-mail address, telephone number) {"\n"}data related to the use of the internet presentation
			located on the internet domain {config.website} (IP address){"\n"}- other personal data necessary for the exercise of the
			client's rights based on legal consumer protection provisions. {"\n"}
			{"\n"}Collection and use of personal information{"\n"}
			{"\n"}
			{config.companyName} collects and manages personal data for the purpose of providing services in the field of its business, as
			well as in order to fulfill legal and regulatory obligations and for the purpose of realizing its own legitimate interests in
			lawful business. If we are required to do so by the relevant legal regulations, for certain reasons we will additionally ask the
			user for his (your) explicit consent. {"\n"}The reasons why we process personal data for the purpose of concluding and
			fulfilling contractual obligations are: {"\n"}• Internet application administration {config.policyAppName} {"\n"}• managing and
			receiving complaints, grievances and complaints; {"\n"}• other legal obligations arising from the operations of{" "}
			{config.companyName}. {"\n"}The reasons why we process your personal information based on our legitimate business interests are:{" "}
			{"\n"}- notification of changes related to business conditions; {"\n"}- prevention and detection of fraud. {"\n"}For all other
			purposes, not listed for the purposes listed above, {config.companyName} will ask for your additional consent. You can withdraw
			your consent at any time. {"\n"}
			{"\n"}Access to personal data {"\n"}
			{"\n"}
			{config.companyName} undertakes technical and organizational measures in order to process the collected personal data only in a
			manner that is in accordance with the stated purpose. If necessary for the purpose of carrying out our business activities,
			access to personal data will be provided to third parties, as follows: {"\n"}• state bodies and public authorities that have the
			right to access personal data for the purpose of enforcing legal obligations; {"\n"}• lawyers, {"\n"}• service departments,
			printing house, financial institutions and other business partners. {"\n"}All, except state and public authorities, process
			personal data exclusively according to the instructions of {config.companyName}. {"\n"}
			{"\n"}Processing of personal data{"\n"}
			{"\n"}User data will be processed by the processors listed in the chapter Access to personal data, and whose responsibility and
			obligation to protect personal data and maintain their confidentiality is defined by the contractual relationship and in
			accordance with all technical and organizational measures and legal regulations regulate data protection. Your data, collected
			by {config.companyName} for the purposes stated in the chapter Collection and use of personal data, will not be available to
			anyone who does not have the authorization of {config.companyName}. {"\n"}
			{"\n"}Exercise of rights{"\n"}
			{"\n"}When it is a legally prescribed person whose data {`${config.companyName} `}
			processes has the right to information on the processing of his personal data; withdraw your consent at any time if
			{` ${config.companyName}`} processes personal data with your consent; correction or supplementation of personal data in order to
			always be accurate; deleting personal data when they are no longer needed for the above purposes; filing a complaint with{" "}
			{config.companyName}
			or the competent state authority. {"\n"}Persons to whom personal data refer can exercise their rights by submitting requests,
			through the following communication channels: {"\n"}• in person at the business premises of {config.companyName} - Str. Ribnička
			No. 26, Kraljevo {"\n"}• by e-mail sent from the e-mail address registered in the
			{config.companyName} system: {config.support} {"\n"}Regardless of the chosen communication channel, the request is submitted in
			person and in such a way that the employees and / or authorized persons of {config.companyName}are enabled to identify the
			applicant. {"\n"}
			{"\n"}The right to object to the supervisory authority {"\n"}
			{"\n"}In addition to the objection to the processing of personal data submitted to {config.companyName}, the objection to the
			processing of personal data can also be submitted to the Office of the Commissioner for Information of Public Importance and
			Personal Data Protection, str. Bulevar kralja Aleksandra 15, 11 000 Belgrade, Republic of Serbia, mail office@poverenik.rs or
			phone number: +381 11 3408 900. {"\n"}
			{"\n"}Storing personal data{"\n"}
			{"\n"}
			The time period for storing personal data of the user depends on the purpose for which {config.companyName} processes. {"\n"}•
			Data collected for the purpose of administering the internet application {config.policyAppName} - ntil the moment of deleting
			the user account by the person whose data is processed on this application (revocation of consent); {"\n"}• Data collected for
			processing based on the legal basis, are stored in accordance with the time limits of the provisions of the law in question (for
			example, the Law on Accounting, etc.). {"\n"}
			{"\n"}Contact {"\n"}
			{"\n"}For any questions about how to use personal information, you can contact us by phone, e-mail or mail as follows: {"\n"}•
			by sending an e-mail to {config.support}; {"\n"}• in writing via the address: {`${config.companyName} LLC`} Kraljevo, str.
			Ribnička No. 26, Kraljevo, Republic of Serbia via the form that you can download here {"\n"}• by calling the contact center on
			+381 60 352 5350. {"\n"}For communication due to the exercise of rights related to the protection of personal data, it is
			necessary to use the communication channels defined in the chapter "Exercise of rights" in order for each request to be accepted
			and the user identified as the applicant. {"\n"}
			{"\n"}Update Personal Information Processing Information
			{"\n"}
			{"\n"}
			{config.companyName} regularly reviews and updates the content of the Privacy Policy and harmonizes it with changes in its own
			business processes, with changes in legal provisions and regulatory obligations. {"\n"}In the event of significant changes that
			significantly affect the processing of personal data, {`${config.companyName} `}
			will without delay publish such changes on its website and inform you directly. {"\n"}
			The training for personal data protection for the company {config.companyName} was conducted by the Law Office Cvjetićanin &
			Partners.
		</Text>
	)
}

export default PrivacyPolicyInEnglish
