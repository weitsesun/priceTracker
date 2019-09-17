require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.API_KEY);

const nightmare = require('nightmare')();

const args = process.argv.slice(2);

const URL = args[0] || "https://www.amazon.com/dp/B0756CYWWD/ref=twister_B075RYG44J";
const TARGET_PRICE = args[1] || 500;

checkPrice();

async function checkPrice() {
  console.log("Loading Price...")
  const priceString = await nightmare.goto(URL)
                                     .wait("#priceblock_ourprice")
                                     .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
                                     .end();
  const priceNumber = parseFloat(priceString.replace("$", ""));

  if(priceNumber <= TARGET_PRICE) {
    sendEmail(
      'Price is Low',
      `The price on ${URL} has dropped below ${TARGET_PRICE}`,
    )
  } else {
    console.log("It is expensive");
  }
}


/**
 * sendEmail()
 * This function will automatically send an email to the receiver if the
 * price is lower than the target price
 * @param: subject(string), body(string)
 */

 function sendEmail(subject, body) {
  const email = {
    to: "joviyogo@idea-mail.net",
    from: 'amazon-price-checker@example.com',
    subject: subject,
    text: body,
    html: body
  }

  return sgMail.send(email);
 };