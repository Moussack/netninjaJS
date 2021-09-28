const cityForm = document.querySelector('form');

const updateCity = async (city) => {
   const cityDets = await getCity(city);
   const weather = await getWeather(cityDets.Key);

   return {
      cityDets: cityDets,
      weather: weather,
   };
};

cityForm.addEventListener('submit', (e) => {
   // stop refresh the page when submiting
   e.preventDefault();

   // get city value from the form
   const city = cityForm.city.value.trim();
   cityForm.reset();

   // update the UI with new city
   updateCity(city)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
});