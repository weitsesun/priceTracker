require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.API_KEY);

const nightmare = require('nightmare')();

const args = process.argv.slice(2);

const URL = args[0] || "https://www.amazon.com/dp/B0756CYWWD/ref=twister_B075RYG44J";
const TARGET_PRICE = args[1] || 200;

checkPrice();

async function checkPrice() {
  console.log("Loading Price...")
  const priceString = await nightmare.goto(URL)
                                     .wait("#priceblock_ourprice")
                                     .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
                                     .end();
  const priceNumber = parseFloat(priceString.replace("$", ""));

  if(priceNumber <= TARGET_PRICE) {
    console.log("BUY IT NOW!");
  } else {
    console.log("It is expensive");
  }
}

