# Pharmanet | Smart-ed | Doctornet - mobile app

## Base instructions

-   Copy environment-example.js and ReactotronConfig-example.js files and remove "-example"

-   Configure environment.js (ngrok) and ReactotronConfig.js (network adress)

## Expo instructions (development)

-   Download and extract ngrok https://ngrok.com/download

-   Run api locally

-   Run ngrok on port 8000 -> ngrok http 8000

-   Copy forwarding https address -> https://xxxxxxzzz22222.ngrok.io (add /api) -> https://xxxxxxzzz22222.ngrok.io/api

-   Go into code and find environment.js located in root folder, paste address in desired env

-   npm install

-   npm start (expo downlaoded on phone is required action)

## Expo production build

-   npm run build-android-se (smarted - android)

-   npm run build-ios-se (smarted - ios)

-   npm run build-android-ph (pharmanet - android)

-   npm run build-ios-ph (pharmanet - ios)

-   npm run build-android-dr (doctornet - android)

-   npm run build-ios-dr (doctornet - ios)
