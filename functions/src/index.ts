import * as functions from "firebase-functions";
import * as mailgun from "mailgun-js";
import type { messages } from "mailgun-js";

const domain = "sandbox057dcab9050145cc8d2daa076a6adc70.mailgun.org";

const recipients = ["mail@frank-mayer.io", "Easysix@easysix.de"];

let mg: mailgun.Mailgun;

const maxIdRand = 36 ** 2 - 1;

export const message = functions.https.onRequest((request, response) => {
  const ticketId =
  "#" +
  Math.round(Math.random() * maxIdRand).toString(36) +
  Date.now().toString(36);

  mg ??= mailgun({
    apiKey: process.env.MAILGUN_API_KEY ?? "",
    domain,
  });

  const json = JSON.stringify(request.body, null, 2);

  const data: messages.SendData = {
    from: "Reost <no-reply@reost.de>",
    to: recipients,
    subject: "Message from Reost " + new Date().toLocaleString("de-DE"),
    text: ticketId + "\n\n" + json,
    html: `<p>Ticket${ticketId}</p><br/><pre>${json}</pre>`,
    "h:Reply-To": "no-reply@reost.de",
  };

  mg.messages().send(data, function(error, body) {
    console.log(error);
    console.log(body);
  });

  if (typeof request.body.email === "string") {
    const data2: messages.SendData = {
      from: "Reost <no-reply@reost.de>",
      to: request.body.email,
      subject: "Deine Nachricht an Reost " + ticketId,
      text: [
        "Reost.de",
        "Danke für Deine Nachricht!",
        "Wir werden sie so schnell wie möglich bearbeiten und uns dann bei Dir melden!",
      ].join("\n"),
      html: [
        "<h1>Reost.de</h1>",
        "<p>Danke für Deine Nachricht!</p>",
        "<p>Wir werden sie so schnell wie möglich bearbeiten und uns dann bei Dir melden!</p>",
      ].join(""),
      "h:Reply-To": "no-reply@reost.de",
    };

    mg.messages().send(data2, function(error, body) {
      console.log(error);
      console.log(body);
    });
  }

  response.redirect("https://reost.de/message-sent");
});
