# Project Cordova 2020 - 2021

- **Naam**: Wout Renkin
- **Klas**: 2APPAI C
- **Email**: <a href="mailto:r0631168@student.thomasmore.be">r0631168@student.thomasmore.be</a>
- **Studentnr**: r0631168
- **Download APK URL**: ......

![Me](./picture/me.jpg?raw=true)

## Korte omschrijving van de app
Ik heb gekozen om een app te ontwikkelen met als thema Covid-19. De
inspiratie voor de applicatie heb ik gekregen door dat je altijd een
papiertje met gegevens moet achterlaten wanneer je bijvoorbeeld uit
eten gaat. Wanneer er dan iemand positief test die naar het restaurant
geweest is of wanneer er personeel positief getest is, zou het
restaurant contact moeten opnemen met u. Uit ervaring weet ik dat dit
veel chaos brengt en helemaal niet efficiënt is. Restaurants vergeten papiertjes te geven, papiertjes
gaan verloren of mensen worden niet gecontacteerd na Covid uitbraken in het restaurant.

De app die ik wil maken zal werken via een QR-reader. Het restaurant zal een QR-code kunnen
genereren met de naam van hun restaurant. De klant kan dan deze code inscannen. Wanneer de
scan succesvol is zal er automatisch een POST request gedaan worden naar een server waar de
vooraf ingevulde gegevens van de klant (Tab in de app waar je gegevens kan invullen en opslagen.)
plus het ID en de naam van het restaurant (Opgeslagen in de QR-code) naar verstuurd wordt. Zo kan
dan het restaurant bij een Covid uitbraak makkelijk een lijst opvragen met klanten die op die
dag/dagen aanwezig waren en een mail of bericht sturen (misschien automatisch gegenereerd) naar
de klanten. 

## Plug-ins in mijn app

- [cordova-plugin-whitelist](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-whitelist/)  
Zorgt voor betere security, en maakt cordova configureerbaarder.
- [cordova-plugin-dialogs](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-dialogs/)
Deze plug-in heb ik gebruikt voor betere en mooiere alerts.
- [cordova-plugin-email-composer](https://www.npmjs.com/package/cordova-plugin-email-composer)
Hiermee kan ik emails genereren.
- [cordova-plugin-qr-barcode-scanner](https://www.npmjs.com/package/cordova-plugin-qr-barcode-scanner)
Hier kan ik een QR code scanner met oproepen.
- [cordova-plugin-qrcodejs](https://www.npmjs.com/package/cordova-plugin-qrcodejs)
Hiermee kan ik een QR code genereren.


## Tip: GitHub Markdown
[https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax]()
