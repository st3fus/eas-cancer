import React from "react"
import { StyleSheet, Text } from "react-native"
import colors from "../../assets/theme/colors"
import useConfig from "../../utils/config"

const PrivacyPolicyText = ({ config }) => {
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
			{`${config.companyName} DOO`} Kraljevo (u daljem tekstu: {config.companyName}), sa sedištem u Kraljevu, ul. Ribnička br. 26,{" "}
			{config.companyInfo}u obavljanju svoje delatnosti obrađuje podatke o ličnosti poštujući sve relevantne zakone i propise.
			{"\n"}
			{"\n"}Molimo Vas da sledeće Informacije pažljivo pročitate!{"\n"}
			{"\n"}
			Rukovalac podacima o ličnosti {"\n"}
			{"\n"}
			{config.companyName} je rukovalac podacima o ličnosti u skladu sa zakonom i propisima o zaštiti podataka o ličnosti.{" "}
			{config.companyName}, kao Rukovalac podacima o ličnosti,  određuje svrhu i sredstva obrade podataka o ličnosti i odgovoran je za
			čuvanje i korišćenje podataka o ličnosti u pisanoj i/ili elektronskoj formi. {"\n"}
			{"\n"}Obrađivač podataka o ličnosti{"\n"}
			{"\n"}
			{config.companyName}, u svom poslovanju, može obrađivati podatke o ličnosti u ime Rukovaoca podacima o ličnosti, odnosno u
			skladu sa njegovim pisanim uputstvima u kom slučaju ima svojstvo Obrađivača podataka o ličnosti. {"\n"}
			{"\n"}Koje podatke o ličnosti {config.companyName} prikuplja {"\n"}
			{"\n"}Podaci o ličnosti koje {config.companyName} prikuplja podatke o ličnosti svojih klijenata, odnosno korisnika internet
			aplikacije {`${config.policyAppName} `}
			kao i posetilaca internet prezentacije koja se nalazi na internet domenu: {config.website}. Reč je, pre svega, o podacima o
			ličnosti bez kojih {config.companyName} ne može da izvrši uslugu, a uključuju najmanje podatke vezane za korišćenje internet
			prezentacije koje se nalaze na pomenutom internet domenu, kao i ostale lične podatke neophodne za ostvarenje klijentovih prava
			baziranih na zakonskim odredbama, a uključuju najmanje:{"\n"}- osnovne lične podatke (ime i prezime)
			{"\n"}- kontakt podatke (e-mail adresa, broj telefona) {"\n"}- podatke vezane za korišćenje internet prezentacije koja se nalazi
			na internet domenu {config.website} (IP adresa){"\n"}- ostale lične podatke neophodne za ostvarenje klijentovih prava baziranih
			na zakonskim odredbama o zaštiti potrošača. {"\n"}
			{"\n"}Prikupljanje i korišćenje podataka o ličnosti{"\n"}
			{"\n"}
			{config.companyName} prikuplja i upravlja podacima o ličnosti radi pružanja usluga iz oblasti svog poslovanja, kao i kako bi
			ispunio zakonske i regulatorne obaveze i u svrhu ostvarenja sopstvenih legitimnih interesa zakonitog poslovanja. Ako to od nas
			traže relevantni zakonski propisi, za određene razloge ćemo od korisnika dodatno tražiti njegov (Vaš) izričiti pristanak. {"\n"}
			Razlozi zbog kojih obrađujemo podatke o ličnosti radi sklapanja i ispunjenja ugovornih obaveza su: {"\n"}• administriranja
			internet aplikacije {config.policyAppName} {"\n"}• upravljanje i primanje prigovora, pritužbi i reklamacija; {"\n"}• druge
			zakonske obaveze koje proizlaze iz poslovanja {config.companyName}-a. {"\n"}Razlozi radi kojih obrađujemo Vaše podatke o
			ličnosti na bazi naših poslovnih legitimnih interesa su: {"\n"}- obaveštavanje o promenama vezanim za uslove poslovanja; {"\n"}-
			sprečavanje i otkrivanje prevare. {"\n"}Za sve druge svrhe, koje nisu uvrštene u gore pobrojane svrhe, {config.companyName} će
			zatražiti Vaš dodatni pristanak. Dati pristanak možete povući u svakom trenutku. {"\n"}
			{"\n"}Pristup podacima o ličnosti {"\n"}
			{"\n"}
			{config.companyName} preduzima tehničke i organizacione mere kako bi se prikupljeni podaci o ličnosti obrađivali samo na način
			koji je u skladu sa navedenom svrhom. Ukoliko je neophodno u svrhu izvršenja naših poslovnih aktivnosti, pristup podacima o
			ličnosti će biti omogućen trećim stranama i to: {"\n"}• državnim organima i organima javne vlasti koja u svrhu sprovođenja
			zakonskih obaveza imaju pravo pristupa podacima o ličnosti; {"\n"}• advokatima, {"\n"}• servisnim službama, štampariji,
			finansijskim ustanovama i drugim poslovnim partnerima. {"\n"}Svi, izuzev državnih organa i organa javne vlasti, podatke o
			ličnosti obrađuju isključivo prema uputstvima {config.companyName}-a. {"\n"}
			{"\n"}Obrada podataka o ličnosti{"\n"}
			{"\n"}Korisnički podaci o ličnosti će biti obrađivani od strane izvršilaca obrade koji su navedeni u poglavlju Pristup podacima
			o ličnosti, a čija je odgovornost i obaveza zaštite podataka o ličnosti i čuvanja njihove poverljivosti definisana ugovornim
			odnosom i u skladu sa svim tehničkim i organizacijskim merama i zakonskim propisima koji uređuju zaštitu podataka. Vaši podaci,
			koje je {config.companyName} prikupio u svrhe navedene u poglavlju Prikupljanje i korišćenje podataka o ličnosti, neće biti
			dostupni nikome ko za to nema ovlašćenje {config.companyName} -a. {"\n"}
			{"\n"}Ostvarivanje prava{"\n"}
			{"\n"}Kada je to zakonski predviđeno lice čije podatke {`${config.companyName} `}
			obrađuje ima pravo na informacije o obradi njegovih podataka o ličnosti; povlačenje svog pristanka u bilo koje vreme, ako
			podatke o ličnosti
			{` ${config.companyName}`} obrađuje uz dat pristanak; ispravku ili dopunu podataka o ličnosti kako bi uvek bili tačni; brisanje
			podataka o ličnosti kada više nisu potrebni za gore navedene svrhe; podnošenje prigovora {config.companyName}
			-u ili nadležnom državnom organu. Lica na koja se podaci o ličnosti odnose mogu svoja prava ostvariti postavljanjem zahteva, i
			to putem sledećih komunikacijskih kanala: {"\n"}• lično u poslovnim prostorijama {config.companyName} -a – Ul. Ribnička br. 26,
			Kraljevo {"\n"}• putem elektronske pošte poslate sa u sistemu 
			{config.companyName}-a registrovane e-mail adrese:  {config.support} {"\n"}Nezavisno od odabranog komunikacijskog kanala zahtev
			se podnosi lično i na takav način da je zaposlenima i/ili ovlašćenim licima {config.companyName}-a omogućena identifikacija
			podnosioca zahteva. {"\n"}
			{"\n"}Pravo na prigovor nadzornom organu {"\n"}
			{"\n"}Osim prigovora na obradu podataka o ličnosti podnesenog {config.companyName}
			–u, prigovor na obradu ličnih podataka moguće je podneti i kancelariji Poverenika za informacije od javnog značaja i zaštitu
			podataka o ličnosti, Bulevar kralja Aleksandra 15, 11 000 Beograd, Republika Srbija, na e-mail office@poverenik.rs ili na broj
			telefona: 011 3408 900. {"\n"}
			{"\n"}Čuvanje podataka o ličnosti{"\n"}
			{"\n"}
			Vremenski period čuvanja podataka o ličnosti korisnika zavisi od svrhe zbog koje {config.companyName} obrađuje. {"\n"}• Podaci
			prikupljeni u svrhu administriranja internet aplikacije {config.policyAppName} - do momenta brisanja korisničkog naloga od
			strane lica čiji se podaci obrađuju na ovoj aplikaciji (opoziv saglasnosti); {"\n"}• Podaci prikupljeni zbog obrada baziranih na
			zakonskoj osnovi, čuvaju se u skladu sa vremenskim ograničenjima odredbi predmetnog zakona (na primer Zakon o računovodstvu i
			slično). {"\n"}
			{"\n"}Kontakt {"\n"}
			{"\n"}Za bilo kakva pitanja o načinu korišćenja podataka o ličnosti možete nas kontaktirati telefonom, e-mailom ili poštom kako
			sledi: {"\n"}• slanjem elektronske pošte na {config.support}; {"\n"}• pisanim putem preko adrese: {`${config.companyName} DOO`}{" "}
			Kraljevo, ul. Ribnička br. 26, Kraljevo, Republika Srbija putem obrasca koji možete preuzeti ovde; {"\n"}• pozivom kontakt
			centra na +381 60 352 5350. {"\n"}Za komunikaciju zbog ostvarivanja prava vezanih za zaštitu podataka o ličnosti potrebno je
			koristiti komunikacijske kanale definisane u poglavlju „Ostvarivanje prava“ kako bi svaki zahtev bio prihvaćen, a korisnik kao
			podnosilac zahteva identifikovan. {"\n"}
			{"\n"}Ažuriranje Informacije o obradi podataka o ličnosti
			{"\n"}
			{"\n"}
			{config.companyName} redovno revidira i ažurira sadržaj Politike privatnosti i isti usklađuje sa promenama u sopstvenim
			poslovnim procesima, sa promenama zakonskih odredbi i regulatornih obaveza. Aktuelna verzija Politike privatnosti dostupna je na
			internet prezentaciji {config.companyName}-a koja se nalaze na internet domenu:
			{` ${config.website}`}. {"\n"}Ukoliko dođe do značajnih promena koje u većoj meri utiču na obradu podataka o ličnosti{" "}
			{`${config.companyName} `}
			će takve promene bez odlaganja objaviti na svojim internet prezentacijama i direktno Vas informisati. {"\n"}Obuku za zaštitu
			podataka o ličnosti za privredno društvo {config.companyName} izvršila je Advokatska kancelarija Cvjetićanin&Partners.
		</Text>
	)
}

export default PrivacyPolicyText
