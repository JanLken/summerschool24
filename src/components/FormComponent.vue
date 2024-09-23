<template>
  <div>
    <form @submit.prevent="fillPdf">

      <!-- Seite 1: Persönliche Informationen Person 1 und Person 2 -->
<div v-if="currentPage === 1">
  <h3>Persönliche Informationen</h3>

  <!-- Zwei Spalten Container -->
  <div class="row">
    <!-- Linke Spalte: Person 1 -->
    <div class="column">
      <h4>Person 1</h4>
      <div class="form-group">
        <input v-model="formData.name" type="text" placeholder="Nachname" />
      </div>
      <div class="form-group">
        <input v-model="formData.vorname" type="text" placeholder="Vorname" />
      </div>
      <div class="form-group">
  <label for="familienstand">Familienstand:</label>
  <select v-model="formData.familienstand" id="familienstand">
    <option value="" disabled>Bitte wählen</option>
    <option value="ledig">Ledig</option>
    <option value="verheiratet">Verheiratet</option>
    <option value="geschieden">Geschieden</option>
    <option value="verwitwet">Verwitwet</option>
    <option value="eingetragene Partnerschaft">Eingetragene Partnerschaft</option>
  </select>
</div>
     
      <div class="form-group">
        <label for="geschlecht">Geschlecht:</label>
        <select v-model="formData.geschlecht" id="geschlecht">
          <option value="" disabled>Bitte wählen</option>
          <option value="männlich">Männlich</option>
          <option value="weiblich">Weiblich</option>
          <option value="divers">Divers</option>
        </select>
      </div>
      <div class="form-group">
        <label for="geburtstag">Geburtsdatum:</label>
        <input v-model="formData.geburtstag" type="date" id="geburtstag" />
        <label for="geburtsort">Geburtsort:</label>
        <input v-model="formData.geburtsort" type="text" id="geburtsort" placeholder="Ort der Geburt" />
        <label for="geburtsland">Geburtsland:</label>
        <select v-model="formData.geburtsland" id="geburtsland">
          <option value="" disabled>Bitte wählen</option>
          <option v-for="land in sortedLaender" :key="land" :value="land">{{ land }}</option>
        </select>
      </div>
      <input v-model="formData.staatsangehoerigkeit" type="text" placeholder="Staatsangehörigkeit" />
    </div>

    <!-- Rechte Spalte: Person 2 -->
    <div class="column" v-if="formData.hasMorePeople">
      <h4>Person 2</h4>
      <div class="form-group">
        <input v-model="formData.person2Familienname" type="text" placeholder="Nachname" />
      </div>
      <div class="form-group">
        <input v-model="formData.person2Vornamen" type="text" placeholder="Vorname" />
      </div>
      <div class="form-group">
  <label for="familienstand">Familienstand:</label>
  <select v-model="formData.person2Familienstand" id="familienstand">
    <option value="" disabled>Bitte wählen</option>
    <option value="ledig">Ledig</option>
    <option value="verheiratet">Verheiratet</option>
    <option value="geschieden">Geschieden</option>
    <option value="verwitwet">Verwitwet</option>
    <option value="eingetragene Partnerschaft">Eingetragene Partnerschaft</option>
  </select>
</div>
      <div class="form-group">
        <label for="person2Geschlecht">Geschlecht:</label>
        <select v-model="formData.person2Geschlecht" id="person2Geschlecht">
          <option value="" disabled>Bitte wählen</option>
          <option value="männlich">Männlich</option>
          <option value="weiblich">Weiblich</option>
          <option value="divers">Divers</option>
        </select>
      </div>
      <div class="form-group">
        <label for="person2Geburtstag">Geburtsdatum:</label>
        <input v-model="formData.person2Geburtstag" type="date" id="person2Geburtstag" />
        <label for="person2Geburtsort">Geburtsort:</label>
        <input v-model="formData.person2Geburtsort" type="text" id="person2Geburtsort" placeholder="Ort der Geburt" />
        <label for="person2Geburtsland">Geburtsland:</label>
        <select v-model="formData.person2Geburtsland" id="person2Geburtsland">
          <option value="" disabled>Bitte wählen</option>
          <option v-for="land in sortedLaender" :key="land" :value="land">{{ land }}</option>
        </select>
      </div>
      <input v-model="formData.person2Staatsangehoerigkeit" type="text" placeholder="Staatsangehörigkeit" />
    </div>
  </div>
   <!-- Checkbox: Gibt es weitere Personen in Ihrem Haushalt? -->
   <div class="form-group">
          <label for="hasMorePeople" class="checkbox-label">Gibt es weitere Personen in Ihrem Haushalt?</label>
          <input type="checkbox" id="hasMorePeople" v-model="formData.hasMorePeople" class="small-checkbox" />
        </div>
</div>


      <!-- Seite 2: Haushalt und Wohnung -->
<div v-if="currentPage === 2">
  <h3>Haushalt und Wohnung</h3>

  <!-- Container für zwei Spalten -->
  <div class="row">
    <!-- Linke Spalte: Informationen zur neuen Wohnung -->
    <div class="column">
      <h4>Neue Wohnung</h4>

      <!-- Neue Wohnung Straße, Hausnummer, Zusätze -->
      <div class="form-group">
        <label for="newWohnungStrasse">Straße:</label>
        <input v-model="formData.neueWohnungStrasse" type="text" id="newWohnungStrasse" placeholder="Straße" />
      </div>
      <div class="form-group">
        <label for="newWohnungHausnummer">Hausnummer:</label>
        <input v-model="formData.neueWohnungHausnummer" type="text" id="newWohnungHausnummer" placeholder="Hausnummer" />
      </div>
      <div class="form-group">
        <label for="newWohnungZusatz">Zusätze:</label>
        <input v-model="formData.neueWohnungZusatz" type="text" id="newWohnungZusatz" placeholder="Zusätze" />
      </div>

      <!-- Neue Wohnung Postleitzahl -->
      <div class="form-group">
        <label for="newWohnungPostleitzahl">Postleitzahl:</label>
        <input v-model="formData.neueWohnungPostleitzahl" type="text" id="newWohnungPostleitzahl" placeholder="Postleitzahl" />
      </div>
      <label>Einzugsdatum:</label>
      <input v-model="formData.neueWohnungEinzugsdatum" type="date" id="moveInDate" placeholder="Tag des Einzugs" />
    </div>

    <!-- Rechte Spalte: Informationen zur bisherigen Wohnung -->
    <div class="column">
      <h4>Bisherige Wohnung</h4>

      <!-- Bisherige Wohnung Straße, Hausnummer, Zusätze -->
      <div class="form-group">
        <label for="bisherigeWohnungStrasse">Straße:</label>
        <input v-model="formData.bisherigeWohnungStrasse" type="text" id="bisherigeWohnungStrasse" placeholder="Straße" />
      </div>
      <div class="form-group">
        <label for="bisherigeWohnungHausnummer">Hausnummer:</label>
        <input v-model="formData.bisherigeWohnungHausnummer" type="text" id="bisherigeWohnungHausnummer" placeholder="Hausnummer" />
      </div>
      <div class="form-group">
        <label for="bisherigeWohnungZusatz">Zusätze:</label>
        <input v-model="formData.bisherigeWohnungZusatz" type="text" id="bisherigeWohnungZusatz" placeholder="Zusätze" />
      </div>

      <!-- Bisherige Wohnung Postleitzahl -->
      <div class="form-group">
        <label for="bisherigeWohnungPostleitzahl">Postleitzahl:</label>
        <input v-model="formData.bisherigeWohnungPostleitzahl" type="text" id="bisherigeWohnungPostleitzahl" placeholder="Postleitzahl" />
      </div>

      <!-- Bisherige Wohnung Tag des Auszugs -->
      <div class="form-group">
        <label for="bisherigeWohnungAuszugsdatum">Tag des Auszugs:</label>
        <input v-model="formData.bisherigeWohnungAuszugsdatum" type="date" id="bisherigeWohnungAuszugsdatum" placeholder="Tag des Auszugs" />
      </div>
      <div class="form-group">
    <label for="bisherigeWohnungTyp">Welche Art von bisheriger Wohnung war es?</label>
    <select v-model="formData.bisherigeWohnungTyp" id="bisherigeWohnungTyp">
      <option value="alleinige">Alleinige Wohnung</option>
      <option value="haupt">Hauptwohnung</option>
      <option value="neben">Nebenwohnung</option>
    </select>
  </div>
    </div>
  </div>

  <!-- Zuzug aus Ausland und weitere Fragen -->
  <div class="form-group">
    <label for="zuzugAusAuslandStaat">Zuzug aus Ausland (Staat):</label>
    <select v-model="formData.zuzugAusAuslandStaat" id="zuzugAusAuslandStaat">
      <option value="" disabled>Bitte wählen</option>
      <option v-for="land in sortedLaender" :key="land" :value="land">{{ land }}</option>
    </select>
  </div>

  <!-- Weitere Wohnungen -->
  <div class="form-group">
    <label for="weitereWohnungenVorhanden">Haben Sie weitere Wohnungen?</label>
    <select v-model="formData.weitereWohnungenVorhanden" id="weitereWohnungenVorhanden">
      <option value="nein">Nein</option>
      <option value="ja">Ja</option>
    </select>
  </div>

  <!-- Art der Wohnung, nur wenn weitere Wohnungen vorhanden sind -->
  <div class="form-group" v-if="formData.weitereWohnungenVorhanden === 'ja'">
    <label for="wohnung">Welche Art von Wohnung ist es?</label>
    <select v-model="formData.wohnung" id="wohnung">
      <option value="haupt">Hauptwohnung</option>
      <option value="neben">Nebenwohnung</option>
    </select>
  </div>

  <!-- Wenn keine weiteren Wohnungen, setze standardmäßig auf 'Alleinige Wohnung' -->
  <input v-if="formData.weitereWohnungenVorhanden === 'nein'" v-model="formData.wohnung" type="hidden" value="alleinige" />
</div>



      <!-- Seite 3: Dokumente -->
<div v-if="currentPage === 3">
  <h3>Dokumente</h3>

  <!-- Zwei Spalten für Dokumente -->
  <div class="row">
    <!-- Linke Spalte: Dokument 1 -->
    <div class="column">
      <h4>Ausweisdokument Person 1</h4>
      <div class="form-group">
        <input v-model="formData.dokumenteVorhanden.dokument1.ausstellungsbehoerde" type="text" placeholder="Ausstellungsbehörde" />
      </div>
      <div class="form-group">
        <input v-model="formData.dokumenteVorhanden.dokument1.seriennummer" type="text" placeholder="Seriennummer" />
      </div>
      <div class="form-group">
        <input v-model="formData.dokumenteVorhanden.dokument1.datum" type="date" placeholder="Datum" />
      </div>
      <div class="form-group">
        <input v-model="formData.dokumenteVorhanden.dokument1.gueltigBis" type="date" placeholder="Gültig bis" />
      </div>
            <!-- Dropdown für Dokumentart 1 -->
      <div class="form-group">
        <label for="dokument1Art">Art des Dokuments:</label>
        <select v-model="formData.dokumenteVorhanden.dokument1.art" id="dokument1Art">
          <option value="PE">Personalausweis</option>
          <option value="RP">Reisepass</option>
          <option value="KP">Kinderreisepass</option>
        </select>
      </div>
    </div>

    <!-- Rechte Spalte: Dokument 2, nur wenn Person 2 vorhanden ist -->
    <div class="column" v-if="formData.hasMorePeople">
      <h4>Ausweisdokument Person 2</h4>
      <div class="form-group">
        <input v-model="formData.dokumenteVorhanden.dokument2.ausstellungsbehoerde" type="text" placeholder="Ausstellungsbehörde" />
      </div>
      <div class="form-group">
        <input v-model="formData.dokumenteVorhanden.dokument2.seriennummer" type="text" placeholder="Seriennummer" />
      </div>
      <div class="form-group">
        <input v-model="formData.dokumenteVorhanden.dokument2.datum" type="date" placeholder="Datum" />
      </div>
      <div class="form-group">
        <input v-model="formData.dokumenteVorhanden.dokument2.gueltigBis" type="date" placeholder="Gültig bis" />
      </div>
      
      <div class="form-group">
        <label for="dokument2Art">Art des Dokuments:</label>
        <select v-model="formData.dokumenteVorhanden.dokument2.art" id="dokument2Art">
          <option value="PE">Personalausweis</option>
          <option value="RP">Reisepass</option>
          <option value="KP">Kinderreisepass</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Unterschrift -->
  <div class="form-group">
    <label for="unterschriftDatum">Datum</label>
    <input v-model="formData.unterschriftDatum" type="date" id="unterschriftDatum" placeholder="Datum" />
  </div>
</div>


      <!-- Navigationsbuttons -->
      <div class="navigation-buttons-right">
        <button v-if="currentPage < totalPages" type="button" @click="nextPage">Weiter</button>
      </div>
      <div class="navigation-buttons">
        <button v-if="currentPage > 1" type="button" @click="prevPage">Zurück</button>
        <button v-if="currentPage === totalPages" type="submit">PDF herunterladen</button>
      </div>
    </form>
  </div>
</template>
<script>
import { PDFDocument } from 'pdf-lib';
import pdfFile from '@/assets/anmeldung_wohnung.pdf'; // Dein PDF-Pfad

export default {
  data() {
    return {
      currentPage: 1,
      totalPages: 3,
      formData: {
        name: '',
        vorname: '',
        address: '',
        familienstand: '',
        neueWohnungGemeindekennzahl: '',
        bisherigeWohnungGemeindekennzahl: '',
        wohnung: '',
        neueWohnungPostleitzahl: '',
        bisherigeWohnungPostleitzahl: '',
        neueWohnungStrasse: '',
        bisherigeWohnungStrasse: '',
        zuzugAusAuslandStaat: '',
        bisherigeWohnungBeibehalten: '',
        weitereWohnungen: '',
        hasMorePeople: false, 
        person2Familienname: '',
        person2Vornamen: '',
        person2Geburtsname: '',
        person2Geschlecht: '',
        person2GeburtstagOrt: '',
        person2Religionsgesellschaft: '',
        person2Staatsangehoerigkeit: '',
        person2OrdensName: '',
        dokument1Ausstellungsbehoerde: '',
        dokument1Seriennummer: '',
        dokument1Datum: '',
        dokument1GueltigBis: '',
        dokument1NameVorname: '',
        dokument1Art: '',
        dokument2Ausstellungsbehoerde: '',
        dokument2Seriennummer: '',
        dokument2Datum: '',
        dokument2GueltigBis: '',
        dokument2NameVorname: '',
        dokument2Art: '',
        neueWohnungEinzugsdatum: '',    
        bisherigeWohnungAuszugsdatum: '', 
        bisherigeWohnungArt: '',        
        bisherigeWohnungBeibehaltenAls: '', 
        weitereWohnungenVorhanden: '',  
        ordensNamePerson1: '',                 
        eheDatumOrtLand: '',            
        unterschriftDatum: '',        
        wohnungArtNeu: '',              
        dokumenteVorhanden: {          
          dokument1: {
            ausstellungsbehoerde: '',
            seriennummer: '',
            datum: '',
            gueltigBis: '',
            nameVorname: '',
            art: ''
          },
          dokument2: {
            ausstellungsbehoerde: '',
            seriennummer: '',
            datum: '',
            gueltigBis: '',
            nameVorname: '',
            art: '',
          }
        }
      },
      laender: [
        "Afghanistan", "Albanien", "Algerien", "Andorra", "Angola", "Argentinien", "WEITERE LAENDER", 
        // ... restliche Länder
      ],
    };
  },
  computed: {
    dokument1NameVorname() {
    return `${this.formData.vorname} ${this.formData.name}`;
  },
  dokument2NameVorname() {
    return `${this.formData.person2Vornamen} ${this.formData.person2Familienname}`;
  },
    // Definiert die sortierte Liste der Länder
    sortedLaender() {
      return this.laender.sort();
    }
  },
  watch: {
    dokument1NameVorname(newValue) {
      this.formData.dokumenteVorhanden.dokument1.nameVorname = newValue;
    },
    dokument2NameVorname(newValue) {
      this.formData.dokumenteVorhanden.dokument2.nameVorname = newValue;
    },
    async 'formData.neueWohnungPostleitzahl'(newPlz) {
      if (newPlz.length === 5) {
        try {
          const response = await fetch(`https://openplzapi.org/de/Localities?postalCode=${newPlz}`);
          const data = await response.json();
          if (data && data.length > 0) {
            const municipality = data[0]?.municipality;
            this.formData.neueWohnungGemeindekennzahl = municipality?.key || '';
          } else {
            this.formData.neueWohnungGemeindekennzahl = '';
          }
        } catch (error) {
          console.error("Fehler beim Abrufen der Gemeindekennzahl:", error);
          this.formData.neueWohnungGemeindekennzahl = '';
        }
      } else {
        this.formData.neueWohnungGemeindekennzahl = '';
      }
    },
    async 'formData.bisherigeWohnungPostleitzahl'(oldPlz) {
      if (oldPlz.length === 5) {
        try {
          const response = await fetch(`https://openplzapi.org/de/Localities?postalCode=${oldPlz}`);
          const data = await response.json();
          if (data && data.length > 0) {
            const municipality = data[0]?.municipality;
            this.formData.bisherigeWohnungGemeindekennzahl = municipality?.key || '';
          } else {
            this.formData.bisherigeWohnungGemeindekennzahl = '';
          }
        } catch (error) {
          console.error("Fehler beim Abrufen der Gemeindekennzahl der alten Wohnung:", error);
          this.formData.bisherigeWohnungGemeindekennzahl = '';
        }
      } else {
        this.formData.bisherigeWohnungGemeindekennzahl = '';
      }
    },
  },
  methods: {
    getGeburtsdatenString() {
    const { geburtstag, geburtsort, geburtsland } = this.formData;
    let geburtsString = '';

    if (geburtstag) {
      geburtsString += new Date(geburtstag).toLocaleDateString(); // Datum formatieren
    }
    if (geburtsort) {
      geburtsString += `, ${geburtsort}`;
    }
    if (geburtsland) {
      geburtsString += `, ${geburtsland}`;
    }

    return geburtsString;
  },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    async fillPdf() {
      const pdfBytes = await fetch(pdfFile).then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const form = pdfDoc.getForm();
     // const fields = form.getFields();
     // fields.forEach((field) => {
     //   console.log(`Feldname: ${field.getName()}`); // Vollständiger Name für das spätere Befüllen
     //     });

      // Textfelder befüllen
      form.getTextField('Person 1 Familienname ggf Doktorgrad Passname').setText(this.formData.name);
      form.getTextField('Person 1 Vornamen Rufnamen unterstreichen').setText(this.formData.vorname);
      form.getTextField('Person 1 Geburtsname').setText(this.formData.geburtsname);
      form.getTextField('Person 1 Geschlecht').setText(this.formData.geschlecht);
      // Kombiniere Geburtsdatum, Ort und Land in einen String und füge es in das PDF ein
      const geburtsdatenString = this.getGeburtsdatenString();
      form.getTextField('Person 1 Tag Ort Land der Geburt').setText(geburtsdatenString);  // Richtiger Feldname verwendet
      //form.getTextField('Person 1 Tag Ort Land der Geburt').setText(this.formData.geburtstagOrt);
      form.getTextField('Person 1 Religionsgesellschaft').setText(this.formData.religionsgesellschaft);
      form.getTextField('Person 1 Staatsangehörigkeiten').setText(this.formData.staatsangehoerigkeit);
      form.getTextField('Person 1 Ordens- Künstlername').setText(this.formData.ordensName);

      if (this.formData.hasMorePeople) {
        form.getTextField('Person 2 Familienname ggf Doktorgrad Passname').setText(this.formData.person2Familienname);
        form.getTextField('Person 2 Vornamen Rufnamen unterstreichen').setText(this.formData.person2Vornamen);
        form.getTextField('Person 2 Geburtsname').setText(this.formData.person2Geburtsname);
        form.getTextField('Person 2 Geschlecht').setText(this.formData.person2Geschlecht);
        form.getTextField('Person 2 Tag Ort Land der Geburt').setText(this.formData.person2GeburtstagOrt);
        form.getTextField('Person 2 Religionsgesellschaft').setText(this.formData.person2Religionsgesellschaft);
        form.getTextField('Person 2 Staatsangehörigkeiten').setText(this.formData.person2Staatsangehoerigkeit);
        form.getTextField('Person 2 Ordens- Künstlername').setText(this.formData.person2OrdensName);
      }
      // Befüllen der Felder für Dokument 1
        form.getTextField('Dokument 1 Ausstellungsbehörde').setText(this.formData.dokumenteVorhanden.dokument1.ausstellungsbehoerde);
        form.getTextField('Dokument 1 Seriennummer').setText(this.formData.dokumenteVorhanden.dokument1.seriennummer);
        form.getTextField('Dokument 1 Datum').setText(this.formData.dokumenteVorhanden.dokument1.datum);
        form.getTextField('Dokumente 1 gültig bis').setText(this.formData.dokumenteVorhanden.dokument1.gueltigBis);
        form.getTextField('Dokument 1 Name, Vorname').setText(this.formData.dokumenteVorhanden.dokument1.nameVorname);
        form.getTextField('Dokument 1 Art').setText(this.formData.dokumenteVorhanden.dokument1.art);

      // Befüllen der Felder für Dokument 2, falls vorhanden
      if (this.formData.hasMorePeople) {
         form.getTextField('Dokument 2 Ausstellungsbehörde').setText(this.formData.dokumenteVorhanden.dokument2.ausstellungsbehoerde);
         form.getTextField('Dokument 2 Seriennummer').setText(this.formData.dokumenteVorhanden.dokument2.seriennummer);
         form.getTextField('Dokumen 2 Datum').setText(this.formData.dokumenteVorhanden.dokument2.datum);
         form.getTextField('Dokument 2 gültig bis').setText(this.formData.dokumenteVorhanden.dokument2.gueltigBis);
        form.getTextField('Dokument 2 Name Vorname').setText(this.formData.dokumenteVorhanden.dokument2.nameVorname);
         form.getTextField('Dokument 2 Art').setText(this.formData.dokumenteVorhanden.dokument2.art);
  }



      form.getTextField('Familienstand 1oder 1 und 2Row1').setText(this.formData.familienstand);
      form.getTextField('Neue Wohnung Gemeindekennzahl').setText(this.formData.neueWohnungGemeindekennzahl);
      form.getTextField('Bisherige Wohnung Gemeindekennzahl').setText(this.formData.bisherigeWohnungGemeindekennzahl);
      form.getTextField('Neue Wohnung des Einzugs Postleitzahl Gemeinde Ortsteil').setText(this.formData.neueWohnungPostleitzahl);
      form.getTextField('Neue Wohnung Straße Hausnummer Zusätze').setText(this.formData.neueWohnungStrasse);
      form.getTextField('Bisherige Wohnung Postleitzahl Gemeinde Kreis Land').setText(this.formData.bisherigeWohnungPostleitzahl);
      form.getTextField('Bisherige Wohnung Straße Hausnummer Zusätze').setText(this.formData.bisherigeWohnungStrasse);
      form.getTextField('Bei Zuzug aus dem Ausland Staat').setText(this.formData.zuzugAusAuslandStaat);

      if (this.formData.weitereWohnungenVorhanden === 'nein') {
      this.formData.wohnung = 'alleinige';
      }

        // Setze Checkboxen für den neuen Wohnungstyp
      if (this.formData.wohnung === 'alleinige') {
        form.getCheckBox('Die neue Wohnung ist alleinige Wohnung').check();
      } else if (this.formData.wohnung === 'haupt') {
        form.getCheckBox('Die neue Wohnung ist Hauptwohnung').check();
      } else if (this.formData.wohnung === 'neben') {
        form.getCheckBox('Die neue Wohnung ist Nebenwohnung').check();
      }

      // Setze Checkboxen für den bisherigen Wohnungstyp
  if (this.formData.bisherigeWohnungTyp === 'alleinige') {
    form.getCheckBox('Die (letzte) bisherige Wohnung (im Inland) war alleinige Wohnung').check();
  } else if (this.formData.bisherigeWohnungTyp === 'haupt') {
    form.getCheckBox('Die (letzte) bisherige Wohnung (im Inland) war Hauptwohnung').check();
  } else if (this.formData.bisherigeWohnungTyp === 'neben') {
    form.getCheckBox('Die (letzte) bisherige Wohnung (im Inland) war Nebenwohnung').check();
  }

      const weitereWohnungenField = form.getCheckBox('Haben [.] noch weitere Wohnungen Nein');
      if (this.formData.weitereWohnungen === 'Ja') {
        form.getCheckBox('Haben [.] noch weitere Wohnungen Ja').check();
      } else {
        weitereWohnungenField.check();
      }
      // Logik für die Auswahl "Wird die bisherige Wohnung beibehalten?"
      if (this.formData.bisherigeWohnungBeibehaltenAls === 'nein') {
         form.getCheckBox('Wird die bisherige Wohnung beibehalten? Nein').check();
        } else if (this.formData.bisherigeWohnungBeibehaltenAls === 'hauptwohnung') {
          form.getCheckBox('Wird die bisherige Wohnung beibehalten? Ja und zwar als Hauptwohnung').check();
       } else if (this.formData.bisherigeWohnungBeibehaltenAls === 'nebenwohnung') {
         form.getCheckBox('Wird die bisherige Wohnung beibehalten? Ja und zwar als Nebenwohnung').check();
       }

      const pdfBytesFilled = await pdfDoc.save();
      const blob = new Blob([pdfBytesFilled], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'filled_anmeldung_wohnung.pdf';
      link.click();
    },
  },
};
</script>

<style scoped>
/* Grundlegendes Styling für das Formular */
form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd; /* Konsistente Randfarbe */
  border-radius: 8px;
  background-color: #fff; /* Einheitlicher Hintergrund */
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Konsistenter Schatten */
}

/* Container für die Seite */
.page {
  position: relative;
  width: 100%;
  height: auto;
}

/* Flexbox für Spalten */
.row {
  display: flex;
  gap: 20px; /* Einheitlicher Abstand */
}

/* Stil für Spalten */
.column {
  flex: 1;
  padding: 15px;
}

/* Trennlinie zwischen Spalten */
.column:not(:last-child) {
  border-right: 1px solid #eee; /* Helle Trennlinie */
}

/* Überschrift-Stile */
h4 {
  margin-bottom: 20px;
  font-size: 18px; /* Einheitliche Schriftgröße */
  color: #333; /* Einheitliche Schriftfarbe */
}

/* Formular-Gruppen */
.form-group {
  margin-bottom: 20px;
}

/* Einheitliche Eingabefelder und Dropdown-Menüs */
input[type="text"],
input[type="date"],
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

/* Navigationstasten */
.navigation-buttons,
.navigation-buttons-right {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

/* Einheitliche Button-Stile */
button {
  padding: 12px 24px;
  background-color: #007bff; /* Einheitliche Hauptfarbe */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

/* Hover-Effekt für Buttons */
button:hover {
  background-color: #0056b3;
}

/* Checkbox-Label-Stile */
.checkbox-label {
  display: inline-block;
  margin-right: 10px;
  font-size: 16px; /* Einheitliche Schriftgröße */
  color: #333; /* Einheitliche Schriftfarbe */
}

/* Stil für kleine Checkboxen */
.small-checkbox {
  width: 20px;
  height: 20px;
}
</style>
