document.addEventListener("DOMContentLoaded", function () {
    //API avain ja shared secret
    const apiKey = "a4c48fa51879265279d25e8e7edbd5d1";
    const sharedSecret = "c77d1fc1d175ce9ea1f6247963c2bafb";

    document.getElementById("artistiValinta").addEventListener("change", function () {
        const selectedArtist = this.value;

        if (selectedArtist) {
            //hae artistin tiedot artist.getinfo APIlla
            fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${selectedArtist}&api_key=${apiKey}&format=json`)
                .then(response => response.json())
                .then(data => displayArtistInfo(data.artist));

            //hae artistin Top albumit artist.gettopalbums APIlla
            fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${selectedArtist}&api_key=${apiKey}&format=json`)
                .then(response => response.json())
                .then(data => displayTopAlbums(data.topalbums.album));
        } else {
            clearArtistInfo();
        }
    });

    //esitetään tietoja artistista
    function displayArtistInfo(artist) {
        const artistInfoDiv = document.getElementById("artistInfo");
        artistInfoDiv.innerHTML = `
            <h2>${artist.name}</h2>
            <p>${artist.bio.summary}</p>
            <img src="${artist.image[2]['#text']}" alt="${artist.name} Image">
        `;
    }

    //esitetään top albumit
    function displayTopAlbums(albums) {
        const topAlbumsDiv = document.getElementById("topAlbums");
        topAlbumsDiv.innerHTML = "<h2>Top Albums</h2>";

        albums.forEach(album => {
            topAlbumsDiv.innerHTML += `
                <div>
                    <img src="${album.image[2]['#text']}" alt="${album.name} Album Cover">
                    <p>${album.name}</p>
                </div>
            `;
        });
    }

    function clearArtistInfo() {
        document.getElementById("artistInfo").innerHTML = "";
        document.getElementById("topAlbums").innerHTML = "";
    }
});
