# Current Matters

Mit über zehn Millionen Abonnenten ist die «New York Times» eine der erfolgreichsten Digitalzeitungen der Welt. Die rund tausendsiebenhundert Journalist:innen schreiben jährlich über vierzigtausend Artikel zu den Themen, die uns bewegen.

Um ein tieferes Verständnis dafür zu gewinnen, welche Themen momentan die Welt beschäftigen, erstellten wir mithilfe der Times Wire API einen News-Liveticker sowie verschiedene Datenvisualisierungen.

Mithilfe einer Auswertung der beliebtesten Keywords und veröffentlichten Artikel pro Kategorie versuchten wir, die aktuellen Trends ausfindig zu machen. Ausserdem ist dank einer weiteren Datenvisualisierung ersichtlich, welche Tage besonders ereignisreich waren.

&ensp;  

## Learnings

**Was hat funktioniert?**
* Ansprechendes Design
* Den erstellten Prototyp mehr oder weniger 1:1 im Frontend umzusetzen
* Cards waren einfacher umzusetzen als gedacht
* PHP zu verstehen und anzuwenden
* Responsive Design und Animationen
  
<br />

**Was hat nicht funktioniert?**
* Startscreen mit 3D-Grafik
* Startscreen mit Möglichkeit zum runterscrollen

<br />

**Was waren die Schwierigkeiten?**
* Die Visualisierungen von Chart.js verhielten sich teilweise sehr eigenartig in Bezug auf ihre Grösse und stellten vor allem beim Erstellen der Tablet- und Mobile-Version einige Herausforderung dar
* Radar Chart ist äusserst ungeeignet für Mobile Ansicht. Damit die Visualisierung überhaupt bedient werden kann, haben wir alle Beschriftungen und Labels entfernt

&ensp;  
		
## Benutzte Ressourcen
**Figma**  
* Erstellung des Prototyps und Visualisierung des Designs

<br />

**VS Code** 
* Erstellung des Codes

<br />

**API**
* Times Wire API für die Umsetzung der Datenvisualisierungen und dem News-Liveticker

<br />

**Libraries**
* Chart.js für die Visualisierung unserer Daten
* Anime.js, um Elemente unserer Startseite zu animieren
* Moment.js, um die Zeit im News-Liveticker in vergangenen Minuten und Stunden anzuzeigen

<br />

**Schulserver**  
* Hosting der Website
* Datenbank

<br />

**CronTool**
* Damit wir alle 15 Minuten die neusten Artikel abrufen können

<br />

**Validatoren**
* HTML-Validator von w3
* CSS-Validator von w3

<br />

**Google-Suche**  
* Mehrheitlich W3Schools, MDN Web Docs und Stack Overflow für die Suche nach konkreten Lösungen

<br />

**KI**  
* ChatGPT als Assistenz während dem Programmieren, insbesondere bei Fehlercodes  
* Generierung von kleineren Code Snippets  
* GitHub Copilot beim direkten Coden in VS Code
