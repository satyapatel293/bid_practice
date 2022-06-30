const express = require("express");
const app = express();
// removed fs module since it was not used
const scrape = require("./scrape");

app.use(express.json());
 
const port = 3000

app.get('/', (req, res) => {
  res.send("this is a working server\n see <a href=/wiki>another route here </a>")
});

// NOTE: I've changed this endpoint to be /wiki
app.get("/wiki", (req, res) => {
  console.log(scrape)
  res.send('this is a new endpoint');
})



app.post("/wiki/:country", (req, res) => {
  const { country } = req.body; 

  if(!country){
    res.status(418).send({message: 'Check the country you listed!'})
  }
  res.send({
     wiki: `You set this ${country}`
  });

});

// general best practice is to keep app.listen at the bottom of your code so this runs as a task later in the event loop.
app.listen(port,() => console.log(`This is listening on port: ${port}`))


//keep getting "AxiosError: Request failed with status code 404" can't figure out where I am not linked correctly 


/* free code camp version of scraping - GREAT JOB IN DOING YOUR RESEARCH FOR COMMENT LINES AND COMMENT BLOCKS!

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
