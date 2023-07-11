// Default code provided by google
const { OAuth2Client } = require("google-auth-library");
const env = require("../env/enviournment.local.json");
const chalk = require("chalk");

// Defining const varaible
const CLIENT_ID = env.clientID;
const client = new OAuth2Client(CLIENT_ID);

// Defining function
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  return { payload, userid };
}

// Creating Authentication function from express middleware
const Authenticate = async (req, res, next) => {
  let token = req.cookies["session-token"];
  console.log(chalk.yellow(` |>_ cookie Token - ${token}`));
  try {
    let _verify = await verify(token);
    let user = {
      name: _verify.payload.name,
      email: _verify.payload.email,
      picture: _verify.payload.picture,
    };
    // passing local user with request
    req.user = user;
    next();
  } catch (e) {
    console.log(chalk.blue(` |>_ Please Authenticate`));
    res.redirect("/login");
  }
};

// exporting authentication
module.exports = Authenticate;
