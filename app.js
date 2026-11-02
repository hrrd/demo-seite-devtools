const summeButton = document.getElementById("summe-button");
const kasseButton = document.getElementById("kasse-button");
const summeAusgabe = document.getElementById("summe-ausgabe");
const kasseHinweis = document.getElementById("kasse-hinweis");
const angebotListe = document.getElementById("angebot-liste");

function formatierePreis(preis) {
  return preis.toFixed(2).replace(".", ",") + " €";
}

function berechneSumme() {
  const artikel = document.querySelectorAll(".artikel");
  let summe = 0;
  artikel.forEach(function (element) {
    summe = summe + element.dataset.preis;
  });
  summeAusgabe.textContent = summe + " €";
}

function zurKasse() {
  const anzahl = document.querySelectorAll(".artikel").length;
  consol.log("Bestellung wird abgeschickt:", anzahl, "Artikel");
  kasseHinweis.hidden = false;
}

async function ladeTagesangebot() {
  try {
    const antwort = await fetch("tagesangebot.json");
    if (!antwort.ok) {
      throw new Error("HTTP " + antwort.status);
    }
    const daten = await antwort.json();
    angebotListe.innerHTML = "";
    daten.gerichte.forEach(function (gericht) {
      const eintrag = document.createElement("li");
      eintrag.className = "angebot";

      const name = document.createElement("span");
      name.textContent = gericht.name;

      const preis = document.createElement("span");
      preis.className = "angebot-preis";
      preis.textContent = formatierePreis(gericht.preis);

      eintrag.append(name, preis);
      angebotListe.append(eintrag);
    });
  } catch (fehler) {
    angebotListe.innerHTML = "<li class=\"laden\">Tagesangebot konnte nicht geladen werden.</li>";
  }
}

summeButton.addEventListener("click", berechneSumme);
kasseButton.addEventListener("click", zurKasse);
ladeTagesangebot();
