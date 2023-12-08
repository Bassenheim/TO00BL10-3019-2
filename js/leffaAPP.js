document.addEventListener("DOMContentLoaded", function () {
    //AJAX pyyntö TheatreAreas APIin
    var teatteriHaku = new XMLHttpRequest();
    teatteriHaku.open("GET", "https://www.finnkino.fi/xml/TheatreAreas/", true);

    teatteriHaku.onreadystatechange = function () {
        if (teatteriHaku.readyState == 4 && teatteriHaku.status == 200) {
            var theatreAreas = teatteriHaku.responseXML.querySelectorAll("TheatreArea");

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
                var valittuTeatteri = this.value;
                if (valittuTeatteri) {
                    listaaTeatteriElokuvat(valittuTeatteri);
                } else {
                    document.getElementById("leffaAPP").innerHTML = "";
                }
            });
        }
    };

    teatteriHaku.send();

    function listaaTeatteriElokuvat(teatteriID) {
        //AJAX pyyntö Schedule APIin valitulle teatterille
        var schedulePyynto = new XMLHttpRequest();
        schedulePyynto.open("GET", "https://www.finnkino.fi/xml/Schedule/?area=" + teatteriID, true);

        schedulePyynto.onreadystatechange = function () {
            if (schedulePyynto.readyState == 4 && schedulePyynto.status == 200) {
                var shows = schedulePyynto.responseXML.querySelectorAll("Show");

                document.getElementById("leffaAPP").innerHTML = "";

                shows.forEach(function (show) {
                    var title = show.querySelector("Title").textContent;
                    var auditorium = show.querySelector("TheatreAuditorium").textContent;
                    var showStart = show.querySelector("dttmShowStart").textContent;
                    var showEnd = show.querySelector("dttmShowEnd").textContent;
                    var imageUrl = show.querySelector("EventSmallImagePortrait").textContent;

                    //listataan elokuvat tietoineen
                    var leffaInfoDiv = document.createElement("div");
                    leffaInfoDiv.classList.add("leffaInfo");
                    leffaInfoDiv.innerHTML = `
                        <img src="${imageUrl}" alt="${title}" class="movie-image">
                        <p><strong>Title:</strong> ${title}</p>
                        <p><strong>Auditorium:</strong> ${auditorium}</p>
                        <p><strong>Show Start:</strong> ${showStart}</p>
                        <p><strong>Show End:</strong> ${showEnd}</p>
                        <hr>
                    `;
                    document.getElementById("leffaAPP").appendChild(leffaInfoDiv);
                });
            }
        };

        schedulePyynto.send();
    }
});
