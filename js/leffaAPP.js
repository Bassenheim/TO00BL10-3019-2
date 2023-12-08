document.addEventListener("DOMContentLoaded", function () {
    //AJAX pyyntö TheatreAreas APIin
    var theatreRequest = new XMLHttpRequest();
    theatreRequest.open("GET", "https://www.finnkino.fi/xml/TheatreAreas/", true);

    theatreRequest.onreadystatechange = function () {
        if (theatreRequest.readyState == 4 && theatreRequest.status == 200) {
            var theatreAreas = theatreRequest.responseXML.querySelectorAll("TheatreArea");

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

            teatteriValinta.addEventListener("change", function () {
                var selectedTheaterId = this.value;
                if (selectedTheaterId) {
                    fetchAndDisplayMovieSchedule(selectedTheaterId);
                } else {
                    document.getElementById("leffaAPP").innerHTML = "";
                }
            });
        }
    };

    theatreRequest.send();

    function fetchAndDisplayMovieSchedule(theaterId) {
        //AJAX pyyntö Schedule APIin valitulle teatterille
        var scheduleRequest = new XMLHttpRequest();
        scheduleRequest.open("GET", "https://www.finnkino.fi/xml/Schedule/?area=" + theaterId, true);

        scheduleRequest.onreadystatechange = function () {
            if (scheduleRequest.readyState == 4 && scheduleRequest.status == 200) {
                var shows = scheduleRequest.responseXML.querySelectorAll("Show");

                document.getElementById("leffaAPP").innerHTML = "";

                shows.forEach(function (show) {
                    var title = show.querySelector("Title").textContent;
                    var auditorium = show.querySelector("TheatreAuditorium").textContent;
                    var showStart = show.querySelector("dttmShowStart").textContent;
                    var showEnd = show.querySelector("dttmShowEnd").textContent;
                    var imageUrl = show.querySelector("EventSmallImagePortrait").textContent;

                    //listataan elokuvat tietoineen
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
