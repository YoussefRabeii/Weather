window.addEventListener("load", () => {
    const DomTimeZone = document.querySelector(".timeZone");
    const DomDegreeSection = document.querySelector(".degree-section");
    const DomDegree = document.querySelector(".degree");
    const DomUnit = document.querySelector(".degree-section span");
    const Domsummary = document.querySelector(".summary");


    const initialSkycons = new Skycons({ color: "white" }); 
    initialSkycons.add(document.querySelector(".initialIcon"), Skycons.RAIN);
    initialSkycons.play();


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // Remove the initialIcon
            document.querySelector(".initialIcon").style.display = "none";

            let long = position.coords.longitude;
            let lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/f54ccfadd9bc28f5968bf68c1ffbffd8/${lat},${long}`;

            fetch(api)
              .then(res => res.json())
              .then(data => {
                // console.log(data);
                const { temperature, summary, icon } = data.currently;

                // Set DOM elements from the API
                DomTimeZone.textContent = data.timezone;
                DomDegree.textContent = Math.floor(temperature);
                Domsummary.textContent = summary;

                // Formula for Celcius
                let celsius = (temperature - 32) * (5 / 9);

                // Set Icons
                setIcons(document.querySelector(".icon"), icon);

                // Change to degree 
                DomDegreeSection.addEventListener("click", () => {
                    if(DomUnit.textContent === "F") {
                        DomDegree.textContent = Math.floor(celsius);
                        DomUnit.textContent = "C";
                    } else {
                        DomDegree.textContent = Math.floor(temperature);
                        DomUnit.textContent = "F";
                    }
                });
              });
        });
    }

    const setIcons = (iconID, icon) => {
      const skycons = new Skycons({ color: "white" });
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();

      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
    };
});