const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
   // destructure properties
   console.log(data);
   const { cityDets, weather } = data;

   // update html
   details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
          <span>${weather.Temperature.Metric.Value}</span>
          <span>&deg;C</span>
        </div>
   `;

   //update icon
   const iconSrc = `/weatherApp/img/icons/${weather.WeatherIcon}.svg`;
   icon.setAttribute('src', iconSrc);

   // update night/day img
   const timeSrc = weather.IsDayTime ? '/weatherApp/img/day.svg' : '/weatherApp/img/night.svg';
   time.setAttribute('src', timeSrc);

   //remove d-none clas if present
   if (card.classList.contains('d-none')) {
      card.classList.remove('d-none');
   }
};

const updateCity = async (city) => {
   const cityDets = await getCity(city);
   const weather = await getWeather(cityDets.Key);

   return { cityDets, weather };
};

cityForm.addEventListener('submit', (e) => {
   // stop refresh the page when submiting
   e.preventDefault();

   // get city value from the form
   const city = cityForm.city.value.trim();
   cityForm.reset();

   // update the UI with new city
   updateCity(city)
      .then((data) => updateUI(data))
      .catch((err) => console.log(err));
});
