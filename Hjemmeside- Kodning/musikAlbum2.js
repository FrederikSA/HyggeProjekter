// Først definerer jeg en Albumskabelon som en konstruktørfunktion
function Album(artistName, albumName, trackList, productionYear) {
  this.artistName = artistName;
  this.albumName = albumName;
  this.trackList = trackList;
  this.productionYear = productionYear;
}

let incomingData = "";

// Derefter henter jeg min JSON data fra min mappe jsonFiler og opretter Album objekter
d3.json("jsonFiler/albums.json").then(function (data) {
  console.log(data);

// Så konverterer jeg hver data til et Album objekt
  incomingData = data.map(
    (album) =>
      new Album(
        album.artistName,
        album.albumName,
        album.trackList,
        album.productionYear
      )
  );

// Jeg vælger HTML-elementet med id="dataJSON" og opretter et h2-element hvor jeg sætter teksten "Musik Album - Aflevering 2:"
  d3.select("#dataJSON").append("h2") .attr("class", "musik-album").text("Musik Album - Aflevering 2:");

// Nu binder jeg Album objekterne til D3 og opretter div elementer dertil. Derudover henviser jeg til mit class album for styling
  d3.select("#dataJSON")
    .selectAll("div.album")
    .data(incomingData)
    .enter()
    .append("div")
    .attr("class", "album")
    .each(function (album) {
      const albumDiv = d3.select(this);

// Til sidst tilføjer jeg et p-element med den albuminformation, som skal vises på hjemmesiden
      albumDiv.append("p").text(
        album.artistName +
        " / " +
        album.albumName +
        " / Antal tracks " +
        album.trackList.length +
        " / Udgivelsesår "+
        album.productionYear
      );

// For at få sangene vist og skjult tilføjer jeg knap
      albumDiv
        .append("button")
        .text("Vis Sange")
        .on("click", function () {
// Når knappen klikkes, vis eller skjul sangene
          toggleTracks(album, albumDiv);
        });
    });
});

// Min funktion til at vise eller skjule sangene i albummet
function toggleTracks(album, albumDiv) {
// Tjekker, om sangene allerede vises
  const trackList = albumDiv.select(".track-list");

// Laver en if else for at at knappen kan se om sangene skal tilføjes eller om de skal fjernes
  if (!trackList.empty()) {
// Hvis sangene vises, fjernes de
    trackList.remove();
  } else {
// Hvis sangene ikke vises, opretter den en ny liste for sangene
    const newTrackList = albumDiv
      .append("ul")
      .attr("class", "track-list");

// Til sidst hvor den henter sangene fra de bestemte album og tilføjer hver sang som en li (list item)
    album.trackList.forEach(function (track) {
      newTrackList
        .append("li")
        .text(
          track.trackNumber + ". " + track.trackTitle
        );
    });
  }
}

// Som det sidste har jeg funktionen til at udføre yderligere behandling af data
function doStuff(dataset) {
  console.log(dataset);
}

