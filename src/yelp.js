'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'g2LQLACnXsY7miaSmgH2qmXl-kab1nQQ56sro1O8TcPJ1SsVuI-_pAnmm-yhWuOPIbv_FObao155N46KpaC4FOe_wZ8fivhzKIo03xJHxeRhzQZY14mn_H4sEhFWW3Yx';

const client = yelp.client(apiKey);

client.search({
  term:'pizza',
  location: 'toronto'
}).then(response => {
  console.log(response.jsonBody);
}).catch(e => {
  console.log(e);
});