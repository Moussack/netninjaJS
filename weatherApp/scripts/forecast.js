class Forecast {
   constructor() {
      this.key = 'zxBozwU70XV9LHdWRkbuqbqn6QU7rgtX';
      this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
      this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
   }

   // Get Data
   async updateCity(city) {
      const cityDets = await this.getCity(city);
      const weather = await this.getWeather(cityDets.Key);
      return { cityDets, weather };
   }

   // get city information
   async getCity(city) {
      const query = `?apikey=${this.key}&q=${city}`;
      const response = await fetch(this.cityURL + query);
      const data = await response.json();
      return data[0];
   }

   // get weather information
   async getWeather(id) {
      const query = `${id}?apikey=${this.key}`;
      const response = await fetch(this.weatherURL + query);
      const data = await response.json();
      return data[0];
   }
}

// OLD CODE before using javascript class
/* const key = 'zxBozwU70XV9LHdWRkbuqbqn6QU7rgtX';
const jakartaKey = '208971';

// get weather information
const getWeather = async (id) => {
   const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
   const query = `${id}?apikey=${key}`;

   const response = await fetch(base + query);
   const data = await response.json();

   return data[0];
};

// get city information
const getCity = async (city) => {
   const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
   const query = `?apikey=${key}&q=${city}`;

   const response = await fetch(base + query);
   const data = await response.json();

   return data[0];
}; */

// getCity('jakarta')
//    .then((data) => {
//       return getWeather(data.Key);
//    })
//    .then((data) => {
//       console.log(data);
//    })
//    .catch((err) => console.log(err));
