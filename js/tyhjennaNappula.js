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
    }
});