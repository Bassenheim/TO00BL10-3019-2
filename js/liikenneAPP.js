document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded event fired");
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
  .then((response) => {
    console.log("Response:", response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
});
