document.addEventListener("DOMContentLoaded", function () {
  const liikenneAppContainer = document.getElementById("liikenneAPP");
  const currentDate = new Date().toISOString().split("T")[0];

  const asemaValinta = document.getElementById("asemaValinta");
  const selectedStation = asemaValinta.value;

  fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          getTrainSchedules(
            departureStation: "${selectedStation}",
            arrivalStation: "DestinationStationCode", // Replace with actual destination station code
            departureDate: "${currentDate}",
            startDate: "${currentDate}T00:00:00Z",
            endDate: "${currentDate}T23:59:59Z",
            limit: 10
          ) {
              trainNumber
              departureTime
              arrivalTime
          }
        }
      `,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
