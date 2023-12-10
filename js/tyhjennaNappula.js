document.addEventListener("DOMContentLoaded", function () {
    var clearAllLink = document.getElementById("tyhjennaKaikki");
    clearAllLink.addEventListener("click", function (event) {
        event.preventDefault();
        clearAllApps();
    });

    function clearAllApps() {
        document.getElementById("leffaAPP").innerHTML = "";
        document.getElementById("musaAPP").innerHTML = "";
        document.getElementById("liikenneAPP").innerHTML = "";
        document.getElementById("artistInfo").innerHTML = "";
        document.getElementById("topAlbums").innerHTML = "";

        document.getElementById("teatteriValinta").selectedIndex = 0;
        document.getElementById("artistiValinta").selectedIndex = 0;
        document.getElementById("asemaValinta").selectedIndex = 0;
    }
});