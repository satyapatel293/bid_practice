const express = require("express");
const app = express();
const cheerio = require("cheerio");
const axios = require("axios"); 
const fs = require('fs');


const port = 3000

app.listen(
  port, 
  () => console.log(`This is listening on port: ${port}`))



app.get('/', (req, res) =>{
 console.log('servers running')
  res.send("this is a working server")
});


app.get("/", (req, res) => {
axios("https://en.wikipedia.org/wiki/ISO_3166-1_alpha")
  .then(res => {
  const html = res.data;
  const $ = cheerio.load(html);
  const countries = []
  
  $(".plainlist ul li", html).each((index, element) => {
    const country =  $(element).children("a").text();
    const abrv = $(element).children("span").text()
     countries.push({
      country,
      abrv
     })
  });
  console.log(countries)
}).catch(err => console.log(err))
})


//keep getting "AxiosError: Request failed with status code 404" can't figure out where I am not linked correctly 


/* free code camp version of scraping

// Loading the dependencies.
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
const url = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";

// Async function which scrapes the data
async function scrapeData() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const listItems = $(".plainlist ul li");
    // Stores data for all countries
    const countries = [];
    // Use .each method to loop through the li we selected
    listItems.each((idx, el) => {
      // Object holding data for each country/jurisdiction
      const country = { name: "", iso3: "" };
      // Select the text content of a and span elements
      // Store the textcontent in the above object
      country.name = $(el).children("a").text();
      country.iso3 = $(el).children("span").text();
      // Populate countries array with country data
      countries.push(country);
    });
    // Logs countries array to the console
    console.dir(countries);
    // Write countries array in countries.json file
    fs.writeFile("coutries.json", JSON.stringify(countries, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
scrapeData();

*/


/*  practice syntax usage 
const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');


const markup = `
<ul class="fruits">
  <li class="fruits__mango"> Mango </li>
  <li class="fruits__apple" id="apples"> Apple </li>
</ul>
`;

//load the markup into cheerio, load takes 3 arguments with the first being required 
const $ = cheerio.load(markup);
console.log(pretty($.html()));

//select an element
const mango = $(".fruits__mango");
console.log(mango.html());

// select an attribute of and element 
const apple = $("#apples");
console.log(apple.attr("class"));

//loop through a list with .each()
const listItems =$("li");
console.log(listItems.length); 
listItems.each(function (idx, el){
  console.log($(el).text());
})

//append or prepend element
const ul = $("ul");
ul.append("<li>Banana</li>");
ul.prepend("<li>Pineapple</li>");
console.log(pretty($.html()));


//note to self take jQuery course to understand $ syntax usage

*/
