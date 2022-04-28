import * as functions from "firebase-functions";

import * as mailGun from "mailgun-js";
const DOMAIN = "sandbox057dcab9050145cc8d2daa076a6adc70.mailgun.org";
const mg = mailGun({ apiKey: "${{ secrets.MAILGUN }}", domain: DOMAIN });

export const helloWorld = functions.https.onRequest((request, response) => {
  const data = {
    from: "Mailgun Sandbox <postmaster@sandbox057dcab9050145cc8d2daa076a6adc70.mailgun.org>",
    to: "reost@outlook.de",
    subject: "Reost Job Application",
    template: request.body.reason,
    "h:X-Mailgun-Variables": request.body,
  };

  mg.messages().send(data, function(error, body) {
    if (error && error.statusCode >= 300) {
      response.status(error.statusCode).send(error.message);
    }

    console.log(body);
  });

  response.send(JSON.stringify(request.body));
});
