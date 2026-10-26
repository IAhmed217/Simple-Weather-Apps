function getCookie(name) {
    let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

const csrftoken = getCookie('csrftoken');

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector(".top-banner form");
    const input = document.querySelector('.top-banner input');
    const msg = document.querySelector('.top-banner .msg');
    const list = document.querySelector('.ajax-section .cities');
    console.log(list);
    async function get_current_weather(inputVal){
        try {
            const response = await fetch("/curr-weather", {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-CSRFToken": csrftoken },
                body: JSON.stringify(inputVal),
            });

            const data = await response.json();
            console.log(data["cod"]);

            if(data["cod"] == "200"){
                const { main, name, sys, weather } = data;
                console.log(main); console.log(name); console.log(sys);
                console.log(weather);

                const icon = `https://openweathermap.org/img/wn/${
                    weather[0]["icon"]
                }@2x.png`;

                const li = document.createElement("li");
                li.classList.add("city");
                const markup = `
                <h2 class="city-name" data-name'"${name},${sys.country}">
                <span>${name}</span>
                <sup>${sys.country}</sup>
                </h2>
                <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
                </div>
                <figure>
                <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
                <figcaption>${weather[0]["description"]}</figcaption>
                </figure>
                `;

                li.innerHTML = markup;
                list.appendChild(li);
            } else {
                msg.textContent = "Please enter a valid city.";
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const inputVal = input.value;

        if (inputVal == ""){
            console.log("Empty string");
            msg.textContent = "Please enter a valid city.";
        } else {
            get_current_weather(inputVal);
            msg.textContent = "";
        }
        form.reset();
        input.focus();
    });
});






