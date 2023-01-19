import i18n from "i18n-js"
import { albanian } from "./languages/albanian"
import { bosnian } from "./languages/bosnian"
import { bulgarian } from "./languages/bulgarian"
import { croatian } from "./languages/croatian"
import { english } from "./languages/english"
import { greek } from "./languages/greek"
import { macedonian } from "./languages/macedonian"
import { romanian } from "./languages/romanian"
import { serbian } from "./languages/serbian"
import { slovenian } from "./languages/slovenian"

i18n.translations = {
	rs: serbian(),
	en: english(),
	bg: bulgarian(),
	ro: romanian(),
	hr: croatian(),
	bih: bosnian(),
	gr: greek(),
	sl: slovenian(),
	al: albanian(),
	mk: macedonian(),
}

i18n.fallbacks = true
