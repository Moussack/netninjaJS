const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

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

cityForm.addEventListener('submit', (e) => {
   // stop refresh the page when submiting
   e.preventDefault();

   // get city value from the form
   const city = cityForm.city.value.trim();
   cityForm.reset();

   // update the UI with new city
   forecast
      .updateCity(city)
      .then((data) => updateUI(data))
      .catch((err) => console.log(err));

   // set localstorage
   localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
   forecast
      .updateCity(localStorage.getItem('city'))
      .then((data) => updateUI(data))
      .catch((err) => console.log(err));
}
