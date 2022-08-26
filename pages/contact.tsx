import type { NextPage } from "next";
import { useState } from "react";
import {
  Stack,
  TextInput,
  Textarea,
  Radio,
  NativeSelect,
  Button,
} from "@mantine/core";
import Head from "next/head";
import { title } from "../lib/view";

const eMailRegex =
  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g;
const discordRegex = /^.{3,32}#[0-9]{4}$/gim;

const Page: NextPage = () => {
  const [reason, setReason] = useState("emergency-message");
  const [emailError, setEmailError] = useState<false | string>(false);
  const [discordError, setDiscordError] = useState<false | string>(false);

  return (
    <>
      <Head>
        <title>{title("Kontakt")}</title>
      </Head>
      <h2>Kontakt</h2>
      <p>
        Alle Daten werden auf unbestimmte Zeit bei uns Gespeichert. Zugriff
        haben nur die obersten Admins. Mit dem Absenden erklärst du dich damit
        einverstanden.
      </p>
      <p>
        <span
          className="mantine-nhis4a mantine-InputWrapper-required mantine-TextInput-required"
          aria-hidden="true"
        >
          *
        </span>{" "}
        Pflichtfelder
      </p>
      <form
        action="/api/message"
        method="post"
        id="contact"
        name="contact-form"
        target="_blank"
        onSubmit={async (ev) => {
          ev.preventDefault();
          const form = ev.target as HTMLFormElement;
          const formData = new FormData(form);

          const resp = await fetch(form.action, {
            method: "POST",
            redirect: "follow",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(formData.entries())),
          });

          if (resp.ok) {
            form.reset();
            alert("Nachricht wurde erfolgreich versendet!");
          } else {
            alert("Ein Fehler ist aufgetreten!");
          }
        }}
      >
        <Stack>
          <fieldset id="reason">
            <legend>Warum möchtest du Kontakt aufnehmen?*</legend>
            <Stack>
              <Radio
                checked={reason === "emergency-message"}
                name="reason"
                label="Dringende Meldung"
                value="emergency-message"
                required
                onChange={(ev) => {
                  if (ev.target.checked) {
                    setReason("emergency-message");
                  }
                }}
              />
              <Radio
                checked={reason === "application"}
                name="reason"
                label="Bewerbung"
                value="application"
                required
                onChange={(ev) => {
                  if (ev.target.checked) {
                    setReason("application");
                  }
                }}
              />
            </Stack>
          </fieldset>
          <fieldset>
            <legend>Wer bist du?</legend>
            <TextInput
              label="Name"
              name="name"
              placeholder="Dein Name"
              required
            />
          </fieldset>
          <fieldset>
            <legend>Wie können wir dich erreichen?</legend>
            <Stack>
              <TextInput
                type="email"
                label="E-Mail"
                name="email"
                placeholder="max@mustermann.de"
                required
                autoComplete="email"
                error={emailError}
                onChange={(ev) => {
                  if (eMailRegex.test(ev.target.value)) {
                    setEmailError(false);
                  } else {
                    setEmailError(
                      "Bitte eine gültige E-Mail-Adresse eingeben."
                    );
                  }
                }}
              />
              <TextInput
                label="Discord"
                error={discordError}
                name="discord"
                placeholder="username#1234"
                onChange={(ev) => {
                  if (!ev.target.value || discordRegex.test(ev.target.value)) {
                    setDiscordError(false);
                  } else {
                    setDiscordError(
                      "Bitte einen gültigen Discord-Namen eingeben."
                    );
                  }
                }}
              />
            </Stack>
          </fieldset>
          <fieldset
            data-reason="emergency-message"
            hidden={reason !== "emergency-message"}
          >
            <legend>
              Was möchtest du uns mitteilen?{" "}
              <span
                className="mantine-nhis4a mantine-InputWrapper-required mantine-TextInput-required"
                aria-hidden="true"
              >
                *
              </span>
            </legend>
            <Textarea
              name="emergency-message-content"
              placeholder="Schreibe deine Nachricht hier..."
              required={reason === "emergency-message"}
            />
          </fieldset>
          <fieldset data-reason="application" hidden={reason !== "application"}>
            <legend>Bewerbung</legend>
            <Stack>
              <p>
                Arbeite bei uns auf freiwilliger Basis wann immer du Zeit hast.
                Lerne aus den Erfahrungen des Teams und bringe deine Ideen mit
                ein.
              </p>
              <NativeSelect
                label="Stelle"
                name="application-job"
                id="job-application-select"
                required={reason === "application"}
                defaultValue="builder"
                data={[
                  {
                    value: "developer",
                    label: "Software Entwickler:in",
                  },
                  { value: "administrator", label: "Administrator:in" },
                  {
                    value: "builder",
                    label: "Bauarbeiter:in",
                  },
                  {
                    value: "moderator",
                    label: "Moderator:in",
                  },
                  {
                    value: "content-creator",
                    label: "Content Creator",
                  },
                  { value: "other", label: "Sonstiges" },
                ]}
              />

              <NativeSelect
                name="application-experience"
                label="Erfahrung"
                required={reason === "application"}
                defaultValue="beginner"
                data={[
                  { value: "beginner", label: "Noob" },
                  { value: "intermediate", label: "Gelegenheitsspieler" },
                  { value: "advanced", label: "Bin schon ganz gut" },
                  { value: "pro", label: "Profi" },
                ]}
              />
              <Textarea
                name="application-content"
                label="Bemerkung"
                placeholder="Hast du sonst noch was zu sagen?"
              />
            </Stack>
          </fieldset>
          <br />
          <label
            style={{
              width: "100%",
              textAlign: "right",
            }}
          >
            <Button>
              <input
                style={{
                  background: "none",
                  border: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
                type="submit"
                value="Absenden"
              />
            </Button>
          </label>
        </Stack>
      </form>
    </>
  );
};

export default Page;
