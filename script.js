document
  .getElementById("reportForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const description = document.getElementById("description").value;
    const image = document.getElementById("image").files[0];

    const message = document.getElementById("message");
    message.innerHTML = "Submitting...";

    if (!navigator.geolocation) {
      message.innerHTML = "Geolocation not supported by your browser.";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          await db.collection("reports").add({
            description,
            latitude: lat,
            longitude: lng,
            timestamp: new Date(),
          });

          message.innerHTML =
            "<div class='alert alert-success'>Report submitted successfully!</div>";
          document.getElementById("reportForm").reset();
        } catch (error) {
          console.error("Error submitting report: ", error);
          message.innerHTML =
            "<div class='alert alert-danger'>Failed to submit report.</div>";
        }
      },
      () => {
        message.innerHTML =
          "<div class='alert alert-warning'>Location access denied.</div>";
      }
    );
  });
