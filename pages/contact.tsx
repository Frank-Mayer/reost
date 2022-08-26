import type { NextPage } from "next";
import { useState } from "react";
import { Stack, TextInput, Textarea, Radio, NativeSelect } from "@mantine/core";
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
        action="http://localhost:3000/api/message"
        method="post"
        id="contact"
        name="contact-form"
        target="_blank"
        onSubmit={(ev) => {
          window.setTimeout(() => {
            (ev.target as any)?.reset();
            ev.currentTarget?.reset();
          }, 500);
        }}
      >
        <Stack>
          <fieldset id="reason">
            <legend>Warum möchtest Du Kontakt aufnehmen?*</legend>
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
            <legend>Wer bist Du?</legend>
            <TextInput
              label="Name"
              name="name"
              placeholder="Dein Name"
              required
            />
          </fieldset>
          <fieldset>
            <legend>Wie können wir Dich erreichen?</legend>
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
            <legend>Was möchtest Du uns mitteilen?*</legend>
            <Textarea
              name="emergency-message-content"
              placeholder="Schreibe deine Nachricht hier..."
              required={reason === "emergency-message"}
            />
          </fieldset>
          <fieldset data-reason="application" hidden={reason !== "application"}>
            <legend>Bewerbung</legend>
            <Stack>
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
                  { value: "advanced", label: "Profi" },
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
          <input
            className="mantine-UnstyledButton-root mantine-Button-root mantine-10b0mw0"
            style={{ textAlign: "center" }}
            type="submit"
            value="Absenden"
          />
        </Stack>
      </form>
    </>
  );
};

export default Page;
