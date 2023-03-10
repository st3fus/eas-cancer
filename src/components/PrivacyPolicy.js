import i18n from "i18n-js"
import React, { useState } from "react"
import { Dimensions, Modal, ScrollView, StyleSheet, Text, View } from "react-native"
import useConfig from "../utils/config"
import CustomButton from "./CustomButton"
var { width, height } = Dimensions.get("window")

const PrivacyPolicy = ({ link }) => {
	const [modalVisible, setModalVisible] = useState(false)

	const config = useConfig()
	const colors = config.colors
	const companyFontName = config.companyFontName

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
			justifyContent: "center",
			alignSelf: "center",
			width: width - 30,
			height: height - 60,
			backgroundColor: colors.bg,
			opacity: 0.9,
			borderRadius: 12,
		},
		btnWrapper: {
			alignItems: "flex-end",
			justifyContent: "flex-end",
			width: "100%",
			marginRight: 8,
			marginBottom: 6,
		},
		btn: {
			backgroundColor: colors.red,
			width: 190,
			height: 38,
			borderRadius: 12,
			marginBottom: 4,
		},
		title: {
			paddingHorizontal: 10,
			paddingTop: 10,
			alignItems: "center",
			justifyContent: "center",
			fontFamily: `${companyFontName}-Regular`,
			color: colors.medium,
		},
		contentWrapper: {
			height: "100%",
			width: "100%",
			marginVertical: 20,
		},
		content: {
			alignItems: "center",
			paddingHorizontal: 10,
			fontFamily: `${companyFontName}-Regular`,
			lineHeight: 20,
			color: colors.dark,
		},
		linkedText: {
			fontFamily: `${companyFontName}-Regular`,
			color: colors.medium,
			textDecorationLine: "underline",
			paddingTop: 8,
			paddingBottom: 8,
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
					<Text style={styles.title}>
						{i18n.t("privacyPolicy")} {`${config.companyName} DOO`} Kraljevo
					</Text>
					<ScrollView style={styles.contentWrapper}>
						<Text style={styles.content}>
							{`${config.companyName} DOO`} Kraljevo (u daljem tekstu: {config.companyName}), sa sedi??tem u Kraljevu, ul.
							Ribni??ka br. 26, {config.companyInfo}u obavljanju svoje delatnosti obra??uje podatke o li??nosti po??tuju??i sve
							relevantne zakone i propise.{"\n"}
							{"\n"}Molimo Vas da slede??e Informacije pa??ljivo pro??itate!{"\n"}
							{"\n"}
							Rukovalac podacima o li??nosti {"\n"}
							{"\n"}
							{config.companyName} je rukovalac podacima o li??nosti u skladu sa zakonom i propisima o za??titi podataka o
							li??nosti. {config.companyName}, kao Rukovalac podacima o li??nosti, ??odre??uje svrhu i sredstva obrade podataka o
							li??nosti i odgovoran je za ??uvanje i kori????enje podataka o li??nosti u pisanoj i/ili elektronskoj formi. {"\n"}
							{"\n"}Obra??iva?? podataka o li??nosti{"\n"}
							{"\n"}
							{config.companyName}, u svom poslovanju, mo??e obra??ivati podatke o li??nosti u ime Rukovaoca podacima o li??nosti,
							odnosno u skladu sa njegovim pisanim uputstvima u kom slu??aju ima svojstvo Obra??iva??a podataka o li??nosti.{" "}
							{"\n"}
							{"\n"}Koje podatke o li??nosti {config.companyName} prikuplja {"\n"}
							{"\n"}Podaci o li??nosti koje {config.companyName} prikuplja podatke o li??nosti svojih klijenata, odnosno
							korisnika internet aplikacije {`${config.policyAppName} `}
							kao i posetilaca internet prezentacije koja se nalazi na internet domenu: {config.website}. Re?? je, pre svega, o
							podacima o li??nosti bez kojih {config.companyName} ne mo??e da izvr??i uslugu, a uklju??uju najmanje podatke vezane
							za kori????enje internet prezentacije koje se nalaze na pomenutom internet domenu, kao i ostale li??ne podatke
							neophodne za ostvarenje klijentovih prava baziranih na zakonskim odredbama, a uklju??uju najmanje:{"\n"}- osnovne
							li??ne podatke (ime i prezime)
							{"\n"}- kontakt podatke (e-mail adresa, broj telefona) {"\n"}- podatke vezane za kori????enje internet
							prezentacije koja se nalazi na internet domenu {config.website} (IP adresa){"\n"}- ostale li??ne podatke
							neophodne za ostvarenje klijentovih prava baziranih na zakonskim odredbama o za??titi potro??a??a. {"\n"}
							{"\n"}Prikupljanje i kori????enje podataka o li??nosti{"\n"}
							{"\n"}
							{config.companyName} prikuplja i upravlja podacima o li??nosti radi pru??anja usluga iz oblasti svog poslovanja,
							kao i kako bi ispunio zakonske i regulatorne obaveze i u svrhu ostvarenja sopstvenih legitimnih interesa
							zakonitog poslovanja. Ako to od nas tra??e relevantni zakonski propisi, za odre??ene razloge ??emo od korisnika
							dodatno tra??iti njegov (Va??) izri??iti pristanak. {"\n"}Razlozi zbog kojih obra??ujemo podatke o li??nosti
							radi??sklapanja i ispunjenja ugovornih obaveza??su: {"\n"}??? administriranja internet aplikacije{" "}
							{config.policyAppName} {"\n"}??? upravljanje i primanje prigovora, pritu??bi i reklamacija; {"\n"}??? druge zakonske
							obaveze koje proizlaze iz poslovanja {config.companyName}-a. {"\n"}Razlozi radi kojih obra??ujemo Va??e podatke o
							li??nosti??na bazi na??ih poslovnih legitimnih interesa??su: {"\n"}- obave??tavanje o promenama vezanim za uslove
							poslovanja; {"\n"}- spre??avanje i otkrivanje prevare. {"\n"}Za sve druge svrhe, koje nisu uvr??tene u gore
							pobrojane svrhe, {config.companyName} ??e zatra??iti Va?? dodatni pristanak. Dati pristanak mo??ete povu??i u svakom
							trenutku. {"\n"}
							{"\n"}Pristup podacima o li??nosti {"\n"}
							{"\n"}
							{config.companyName} preduzima tehni??ke i organizacione mere kako bi se prikupljeni podaci o li??nosti obra??ivali
							samo na na??in koji je u skladu sa navedenom svrhom. Ukoliko je neophodno u svrhu izvr??enja na??ih poslovnih
							aktivnosti, pristup podacima o li??nosti ??e biti omogu??en tre??im stranama i to: {"\n"}??? dr??avnim organima i
							organima javne vlasti koja u svrhu sprovo??enja zakonskih obaveza imaju pravo pristupa podacima o li??nosti;{" "}
							{"\n"}??? advokatima, {"\n"}??? servisnim slu??bama, ??tampariji, finansijskim ustanovama i drugim poslovnim
							partnerima. {"\n"}Svi, izuzev dr??avnih organa i organa javne vlasti, podatke o li??nosti obra??uju isklju??ivo
							prema uputstvima {config.companyName}-a. {"\n"}
							{"\n"}Obrada podataka o li??nosti{"\n"}
							{"\n"}Korisni??ki podaci o li??nosti ??e biti obra??ivani od strane izvr??ilaca obrade koji su navedeni u poglavlju
							Pristup podacima o li??nosti, a ??ija je odgovornost i obaveza za??tite podataka o li??nosti i ??uvanja njihove
							poverljivosti definisana ugovornim odnosom i u skladu sa svim tehni??kim i organizacijskim merama i zakonskim
							propisima koji ure??uju za??titu podataka. Va??i podaci, koje je {config.companyName} prikupio u svrhe navedene u
							poglavlju Prikupljanje i kori????enje podataka o li??nosti, ne??e biti dostupni nikome ko za to nema ovla????enje{" "}
							{config.companyName} -a. {"\n"}
							{"\n"}Ostvarivanje prava{"\n"}
							{"\n"}Kada je to zakonski predvi??eno lice ??ije podatke {`${config.companyName} `}
							obra??uje ima pravo na informacije o obradi njegovih podataka o li??nosti; povla??enje svog pristanka u bilo koje
							vreme, ako podatke o li??nosti
							{` ${config.companyName}`} obra??uje uz dat pristanak; ispravku ili dopunu podataka o li??nosti kako bi uvek bili
							ta??ni; brisanje podataka o li??nosti kada vi??e nisu potrebni za gore navedene svrhe; podno??enje prigovora{" "}
							{config.companyName}
							-u ili nadle??nom dr??avnom organu. Lica na koja se podaci o li??nosti odnose mogu svoja prava ostvariti
							postavljanjem zahteva, i to putem slede??ih komunikacijskih kanala: {"\n"}??? li??no u poslovnim prostorijama{" "}
							{config.companyName} -a ??? Ul. Ribni??ka br. 26, Kraljevo {"\n"}??? putem elektronske po??te poslate sa u sistemu??
							{config.companyName}-a registrovane e-mail adrese: ??{config.support} {"\n"}Nezavisno od odabranog
							komunikacijskog kanala zahtev se podnosi li??no i na takav na??in da je zaposlenima i/ili ovla????enim licima{" "}
							{config.companyName}-a omogu??ena identifikacija podnosioca zahteva. {"\n"}
							{"\n"}Pravo na prigovor nadzornom organu {"\n"}
							{"\n"}Osim prigovora na obradu podataka o li??nosti podnesenog {config.companyName}
							???u, prigovor na obradu li??nih podataka mogu??e je podneti i kancelariji??Poverenika za informacije od javnog
							zna??aja i za??titu podataka o li??nosti, Bulevar kralja Aleksandra 15, 11 000 Beograd, Republika Srbija, na
							e-mail??office@poverenik.rs??ili na broj telefona: 011 3408 900. {"\n"}
							{"\n"}??uvanje podataka o li??nosti{"\n"}
							{"\n"}
							Vremenski period ??uvanja podataka o li??nosti korisnika zavisi od svrhe zbog koje {
								config.companyName
							} obra??uje. {"\n"}??? Podaci prikupljeni u svrhu administriranja internet aplikacije {config.policyAppName} - do
							momenta brisanja korisni??kog naloga od strane lica ??iji se podaci obra??uju na ovoj aplikaciji (opoziv
							saglasnosti); {"\n"}??? Podaci prikupljeni zbog obrada baziranih na zakonskoj osnovi, ??uvaju se u skladu sa
							vremenskim ograni??enjima odredbi predmetnog zakona (na primer Zakon o ra??unovodstvu i sli??no). {"\n"}
							{"\n"}Kontakt {"\n"}
							{"\n"}Za bilo kakva pitanja o na??inu kori????enja podataka o li??nosti mo??ete nas kontaktirati telefonom, e-mailom
							ili po??tom kako sledi: {"\n"}??? slanjem elektronske po??te na {config.support}; {"\n"}??? pisanim putem preko
							adrese: {`${config.companyName} DOO`} Kraljevo, ul. Ribni??ka br. 26, Kraljevo, Republika Srbija putem obrasca
							koji mo??ete preuzeti??ovde; {"\n"}??? pozivom kontakt centra na +381 60 352 5350. {"\n"}Za komunikaciju zbog
							ostvarivanja prava vezanih za za??titu podataka o li??nosti potrebno je koristiti komunikacijske kanale definisane
							u poglavlju ???Ostvarivanje prava??? kako bi svaki zahtev bio prihva??en, a korisnik kao podnosilac zahteva
							identifikovan. {"\n"}
							{"\n"}A??uriranje Informacije o obradi podataka o li??nosti
							{"\n"}
							{"\n"}
							{config.companyName} redovno revidira i a??urira sadr??aj Politike privatnosti i isti uskla??uje sa promenama u
							sopstvenim poslovnim procesima, sa promenama zakonskih odredbi i regulatornih obaveza. Aktuelna verzija Politike
							privatnosti dostupna je na internet prezentaciji {config.companyName}-a koja se nalaze na internet domenu:
							{` ${config.website}`}. {"\n"}Ukoliko do??e do zna??ajnih promena koje u ve??oj meri uti??u na obradu podataka o
							li??nosti {`${config.companyName} `}
							??e takve promene bez odlaganja objaviti na svojim internet prezentacijama i direktno Vas informisati. {"\n"}
							Obuku za za??titu podataka o li??nosti za privredno dru??tvo {config.companyName} izvr??ila je??Advokatska
							kancelarija Cvjeti??anin&Partners.
						</Text>
					</ScrollView>
					<View style={styles.btnWrapper}>
						<CustomButton
							style={[styles.btn, { width: 115, marginHorizontal: 14 }]}
							bg={colors.red}
							text={i18n.t("close")}
							onPress={() => setModalVisible(false)}
						/>
					</View>
				</View>
			</Modal>
			{link ? (
				<Text style={styles.linkedText} onPress={() => setModalVisible(true)}>
					{i18n.t("privacyPolicy")}
				</Text>
			) : (
				<CustomButton
					text={i18n.t("privacyPolicy")}
					bg="colors.medium"
					onPress={() => setModalVisible(true)}
					style={[styles.btn, { backgroundColor: colors.medium }]}
				/>
			)}
		</>
	)
}

export default PrivacyPolicy
