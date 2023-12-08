document.addEventListener("DOMContentLoaded", function () {
    // Make an AJAX request to the Finnkino Theatre Areas API
    var theatreRequest = new XMLHttpRequest();
    theatreRequest.open("GET", "https://www.finnkino.fi/xml/TheatreAreas/", true);

    theatreRequest.onreadystatechange = function () {
        if (theatreRequest.readyState == 4 && theatreRequest.status == 200) {
            // Parse the XML response for Theatre Areas
            var theatreAreas = theatreRequest.responseXML.querySelectorAll("TheatreArea");

            // Populate the theater selection dropdown
            var teatteriValinta = document.getElementById("teatteriValinta");
            teatteriValinta.innerHTML = "<option value=''>Select a theater</option>";

            theatreAreas.forEach(function (theatre) {
                var id = theatre.querySelector("ID").textContent;
                var name = theatre.querySelector("Name").textContent;
                var option = document.createElement("option");
                option.value = id;
                option.textContent = name;
                teatteriValinta.appendChild(option);
            });

            // Set up event listener for theater selection
            teatteriValinta.addEventListener("change", function () {
                var selectedTheaterId = this.value;
                if (selectedTheaterId) {
                    // Fetch and display movie schedule for the selected theater
                    fetchAndDisplayMovieSchedule(selectedTheaterId);
                } else {
                    // Clear the movie information when no theater is selected
                    document.getElementById("leffaAPP").innerHTML = "";
                }
            });

            var clearButton = document.getElementById("tyjennaLeffaApp");
            clearButton.addEventListener("click", function () {
                // Clear the movie information
                clearMovieInformation();
            });
        
            function clearMovieInformation() {
                document.getElementById("leffaAPP").innerHTML = "";
            }

        }
    };

    theatreRequest.send();

    function fetchAndDisplayMovieSchedule(theaterId) {
        // Make an AJAX request to the Finnkino Schedule API for the selected theater
        var scheduleRequest = new XMLHttpRequest();
        scheduleRequest.open("GET", "https://www.finnkino.fi/xml/Schedule/?area=" + theaterId, true);

        scheduleRequest.onreadystatechange = function () {
            if (scheduleRequest.readyState == 4 && scheduleRequest.status == 200) {
                // Parse the XML response for movie schedule
                var shows = scheduleRequest.responseXML.querySelectorAll("Show");

                // Clear previous movie information
                document.getElementById("leffaAPP").innerHTML = "";

                // Display information for each ongoing movie
                shows.forEach(function (show) {
                    var title = show.querySelector("Title").textContent;
                    var auditorium = show.querySelector("TheatreAuditorium").textContent;
                    var showStart = show.querySelector("dttmShowStart").textContent;
                    var showEnd = show.querySelector("dttmShowEnd").textContent;
                    var imageUrl = show.querySelector("EventSmallImagePortrait").textContent;

                    // Display movie information on the webpage
                    var movieInfoDiv = document.createElement("div");
                    movieInfoDiv.classList.add("movie-info");
                    movieInfoDiv.innerHTML = `
                        <img src="${imageUrl}" alt="${title}" class="movie-image">
                        <p><strong>Title:</strong> ${title}</p>
                        <p><strong>Auditorium:</strong> ${auditorium}</p>
                        <p><strong>Show Start:</strong> ${showStart}</p>
                        <p><strong>Show End:</strong> ${showEnd}</p>
                        <hr>
                    `;
                    document.getElementById("leffaAPP").appendChild(movieInfoDiv);
                });
            }
        };

        scheduleRequest.send();
    }
});
