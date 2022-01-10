## Ergebnisse der Besprechung 2021-11-25:
### Übersicht aller Daten zum erstellen des Angebots:
| Param-Name | Type | Example | Description |
| ---------- | ---- | ------- | ----------- |
| contactId | string (Email) | 'kuenzel@gfu.net' | E-Mail des Erstellers des Angebots als identifier für die Kontakt-Infos (Tile: 'Ihr Ansprechpartnern' oben rechts) |
| trainerId | integer |  | ```Trainer.ID``` aus DEC2000; Identifier für die Trainersection (Tile: Ihr Dozent) |
| Ort | string (Freitext) | GFU Schulungszentrum | Freitext, wo das Seminar stattfinden soll |
| duration | integer | 3 | Dauer in Tagen |
| seminarDate | string (Freitext, oder Datumsformat) | '29. bis 30.09.1986' | Freitext, wann das Seminar stattfinden soll; Uhrzeit erstmal statisch 9-16Uhr |
| capacity | integer | 8 | Max. Teilnehmerzahl |
| seminarType | Offen \| Inhouse \| Firmen \| Kombi \| Spezial |  'Offen' | SeminarArt |
| individual | boolean | true | Ist Einzelschulung Ja/Nein |
| remote | boolean | true |  Ist remote Ja/Nein |
| offerNumber | string | 2021-12345678 | Auf dem Angebot angezeigte fortlaufende Nummer |
| offerId | string (hash) | 'asd83h01' | ID des Angebots; wird zur Erstellung des Links verwendet, z.B.: ```https://meinangebot.gfu.net/offer/<offerId>``` |
| offerDate | date (YYYY-MM-DD) | 1986-09-30 | Datum wann das Angebot erzugt wurde; **Kommt nicht aus combit / wird erst im angebotstool direkt erzeugt**; möglicherweise zukünftig wieder an combit zurückgesendet (in welcher Form auch immer) |
| companyId | string |  'D0321' | ```INFOADRN.IDENTNR``` aus DEC2000; Identifier für die Kundendaten (Tile: Kundennummer XYZ) |
| contactId | string | '00002' | ```INFOAP.AP_NR``` aus DEC2000; Identifier für die Kontaktperson innerhalb der Firma des Kunden |
| price | string (JSON) | s.u. | s.u. |
### Preisberechnung
```json
{
    "numberOfExcutions": 1,         //Anzahl der Schulungen
    "ratePerDay": 800,              //Preis Pro Tag
    "additionalCostsExtra": true,   //Werden die Zusätzlichen kosten extra ausgewiesen
    "additionalCost": [             //Zusätzliche kosten
        {
            "description": "Blah blah",
            "price": 50             //pro Teilnehmer
        }
    ],
    "catering": {                   //Zusatzkosten fürs Catering
        "price": 25                 //pro Teilnehmer
    },
    "nebenkosten": {                //Zusatzkosten für Anfahrt o.ä.
        "price": 30                 //pro Teilnehmer
    },
    "notebooks": {                  //Zusatzkosten für Notebookausleihe
        "price": 50                 //pro Teilnehmer
    },
    "cloud": {                      //Zusatzkosten für Cloudservice
        "price": 30                 //pro Teilnehmer
    },
    "unterlagen": {                 //Zusatzkosten für Unterlagen
        "description": "so und so Buch", 
        "price": 20
    },
    "einmaligeKosten": {            //Zusatzkosten einmalig
        "description": "Vorbereitung des Dozenten",
        "price": 40                 //pro Angebot
    },
    "totalPrice": 2580  142#27848400  
}
``` 
### Offene Fragen
- Wie erzeugen wir Kopien von bestehenden Angeboten?  
    - Durch offerId identifiziert
      - Die OfferId ist der ID Hash aus Combut. er ist verschlüsselt und unvorhersehbar. Er kann deshalb auch im Internet verwendet werden. 
    - URL ```/copy-offer``` anstatt ```/create-offer```
    - Texte die schon angepasst wurden für die Kopie übernehmen
- Textbausteine woher? 
    - Textbausteine als Templates erstmal statisch hinterlegen
    - Eventuell in Version 2 Templates anpassbar machen
- Welche Textbausteine können wie geändert werden?
    - Inhalt des Seminars änderbar
    - Bewertung ausschließen
    - Anschreiben
    - TBD: 
        - Ganze Abschnitte ausblenden
        - Inhouse Leute sollen noch interviewd werden
- Wie werden welche Textbausteine in Abhängigkeit vom Seminartyp zusammengesetzt?
    - TBD:
        - Mit Mothana abklären