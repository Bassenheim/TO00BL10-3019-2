document.addEventListener("DOMContentLoaded", function () {
    
    const leffaAppContainer = document.getElementById("leffaAPP");

    //hae teatterit
    fetch("http://www.finnkino.fi/xml/TheatreAreas/")
        .then(response => response.text())
        .then(data => {
            //XML -> json
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");

            const theaters = xmlDoc.querySelectorAll("TheatreArea");
            
            //luo valitsimet
            const theaterSelect = document.createElement("select");
            theaterSelect.setAttribute("id", "theaterSelect");

            //lisää valitsimia
            theaters.forEach(theater => {
                const option = document.createElement("option");
                option.value = theater.querySelector("ID").textContent;
                option.text = theater.querySelector("Name").textContent;
                theaterSelect.appendChild(option);
            });

            //hakunappula
            const fetchMoviesButton = document.createElement("button");
            fetchMoviesButton.textContent = "Fetch Movies";
            fetchMoviesButton.addEventListener("click", fetchMovies);

            leffaAppContainer.appendChild(theaterSelect);
            leffaAppContainer.appendChild(fetchMoviesButton);
        })
        .catch(error => console.error("Error fetching theaters:", error));

    //hae leffoja teatterista
    function fetchMovies() {
        const selectedTheaterId = document.getElementById("theaterSelect").value;

        fetch(`http://www.finnkino.fi/xml/Schedule/?area=${selectedTheaterId}`)
            .then(response => response.text())
            .then(data => {
                //XML -> json
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, "text/xml");

                //haetaan leffatiedot
                const movies = xmlDoc.querySelectorAll("Show");
                leffaAppContainer.innerHTML = "";
                movies.forEach(movie => {
                    const movieTitle = movie.querySelector("Title").textContent;
                    const movieImage = movie.querySelector("Images Image[width='1014']").textContent;

                    //luodaan elementit leffojen tiedoille
                    const movieDiv = document.createElement("div");
                    const titleHeading = document.createElement("h2");
                    const imageElement = document.createElement("img");

                    titleHeading.textContent = movieTitle;
                    imageElement.src = movieImage;

                    movieDiv.appendChild(titleHeading);
                    movieDiv.appendChild(imageElement);
                    leffaAppContainer.appendChild(movieDiv);
                });
            })
            .catch(error => console.error("Error fetching movies:", error));
    }
});