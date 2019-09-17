const nightmare = require('nightmare')();

// "priceblock_ourprice"
const URL = "https://www.amazon.com/dp/B0756CYWWD/ref=twister_B075RYG44J";
const TARGET_PRICE = 200;

async function checkPrice() {
  console.log("Loading Price...")
  const priceString = await nightmare.goto(URL)
                                     .wait("#priceblock_ourprice")
                                     .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
                                     .end();
  const priceNumber = parseFloat(priceString.replace("$", ""));
  console.log(priceNumber);
}

checkPrice();