document.addEventListener("DOMContentLoaded", function () {
    const liikenneAppContainer = document.getElementById("liikenneAPP");
  
    const currentDate = new Date().toISOString().split("T")[0];

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
              departureStation: "HKI",
              arrivalStation: "DestinationStationCode",
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
  