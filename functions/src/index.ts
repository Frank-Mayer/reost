import * as functions from "firebase-functions";
import * as mailgun from "mailgun-js";
import type { messages } from "mailgun-js";

const domain = "sandbox057dcab9050145cc8d2daa076a6adc70.mailgun.org";

const recipients = ["mail@frank-mayer.io"];

let mg: mailgun.Mailgun | undefined = undefined;

const maxIdRand = 36 ** 2 - 1;

export const message = functions.https.onRequest((request, response) => {
  const ticketId =
    "#" +
    Math.round(Math.random() * maxIdRand).toString(36) +
    Date.now().toString(36);

  if (!mg) {
    mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY ?? "",
      domain,
    });
  }

  const json = JSON.stringify(request.body, null, 2);

  const dateTime = new Date().toLocaleString("de-DE");

  const data: messages.SendData = {
    from: "Reost <no-reply@reost.de>",
    to: recipients,
    subject: "Reost " + ticketId,
    text: ticketId + "\n\n" + json,
    html: `<p>${dateTime}</p><br/><pre>${json}</pre>`,
    "h:Reply-To": "no-reply@reost.de",
  };

  mg.messages().send(data, (error, body) => {
    console.log(error);
    console.log(body);
  });

  response.redirect("https://reost.de/message-sent");
});
