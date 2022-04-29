import * as functions from "firebase-functions";
import * as mailgun from "mailgun-js";
import type { messages } from "mailgun-js";

const domain = "sandbox057dcab9050145cc8d2daa076a6adc70.mailgun.org";

let mg: mailgun.Mailgun;

export const message = functions.https.onRequest((request, response) => {
  mg ??= mailgun({
    apiKey: process.env.MAILGUN_API_KEY ?? "",
    domain,
  });

  const data: messages.SendData = {
    from: "Reost <no-reply@reost.de>",
    to: "mail@frank-mayer.io",
    subject: "Message from Reost",
    text: JSON.stringify(request.body),
    "h:Reply-To": "no-reply@reost.de",
  };

  mg.messages().send(data, function(error, body) {
    console.log(error);
    console.log(body);
  });

  response.redirect("https://reost.de/message-sent");
});
