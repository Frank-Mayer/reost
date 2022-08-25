// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import mailgun from "mailgun-js";
import type { messages, Mailgun } from "mailgun-js";

const domain = "sandbox057dcab9050145cc8d2daa076a6adc70.mailgun.org";

const recipients = ["mail@frank-mayer.io"];

let mg: Mailgun | undefined = undefined;

const maxIdRand = 36 ** 2 - 1;

const dateOptions: Intl.DateTimeFormatOptions = { timeZone: "Europe/Berlin" };

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const ticketId =
    "#" +
    Math.round(Math.random() * maxIdRand).toString(36) +
    Date.now().toString(36);

  if (mg === undefined) {
    mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY ?? "",
      domain,
    });
  }

  let ok = false;
  const obj: { [key: string]: any } = {};

  for (const key of Object.keys(request.body)) {
    const val = request.body[key];
    const typeofValue = typeof val;

    if (
      (typeofValue === "string" && val.length > 0) ||
      typeofValue === "number" ||
      typeofValue === "boolean" ||
      (typeofValue === "object" && val !== null)
    ) {
      obj[key] = request.body[key];
      if (key === "email") {
        ok = true;
      }
    }
  }

  if (ok) {
    const json = JSON.stringify(obj, null, 2);

    const dateTime = new Date().toLocaleString("de-DE", dateOptions);

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

    response.status(200).json({ status: "OK", ticketId, message: "Deine Nachricht wurde versendet!" });
  } else {
    response.status(400).json({ status: "ERROR", ticketId, message: "Irgendetwas stimmt mit deiner Anfrage nicht!" });
  }
}
