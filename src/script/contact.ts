import { addDisposableEventListener } from "@frank-mayer/magic";

const jobDescriptionMap = new Map([
  [
    "developer",
    [
      'Wir entwickeln eigene Plugins mit <a target="_blank" href="https://kotlinlang.org/">Kotlin</a>.',
      "Unsere Webseite ist mit HTML,",
      '<a target="_blank" href="https://sass-lang.com">Sass</a> und',
      '<a target="_blank" href="https://www.typescriptlang.org">TypeScript</a> geschrieben.',
      "Verbessere bestehende Software, erstelle neue und unterstütze die Admins bei Einrichtungen.",
    ].join(" "),
  ],
  [
    "administrator",
    [
      "Kümmere Dich darum, dass alle Server und Datenbanken so laufen wie sie sollen und",
      "verhindere Ausfallzeiten sowie Datenverluste.",
      "Halte die allgemeine Infrastruktur auf dem aktuellen Stand der Technik.",
      "Sorge für die Sicherheit der Datenbanken und Server.",
    ].join(" "),
  ],
  [
    "builder",
    "Hilf beim Aufbau von Bauwerken und Landschaft auf dem Server.",
  ],
  [
    "moderator",
    [
      "Unterstütze die Spieler bei Problemen und",
      "vermittle zwischen Spielern und Admins.",
    ].join(" "),
  ],
  [
    "content-creator",
    [
      "Wir brauchen immer neue Ideen um regelmäßig neuen Content für Unsere Spieler liefern zu kännen.",
      "Entwickle Ideen und setze diese in Zusammenarbeit mit unseren Entwicklern um.",
    ].join(" "),
  ],
  [
    "other",
    "Du kannst das Team anderweitig unterstützen? Kontaktiere uns!",
  ],
]);

const update = (values: Map<string, string>) => {
  console.clear();
  for (const [key, value] of values) {
    const possible = document.querySelectorAll(`[data-${key}]`);
    for (const el of Array.from(possible)) {
      const data = (el as HTMLElement).dataset[key];
      if (((el as HTMLFieldSetElement).hidden = data !== value)) {
        for (const reqEl of Array.from(el.querySelectorAll("[required]"))) {
          (reqEl as HTMLInputElement).required = false;
          (reqEl as HTMLElement).dataset.required = "true";
        }
      } else {
        for (const reqEl of Array.from(
          el.querySelectorAll("[data-required]")
        )) {
          (reqEl as HTMLInputElement).required = true;
        }
      }
    }
  }
};

export const contact = () => {
  const contactEl = document.getElementById("contact") as HTMLFormElement;

  if (!contactEl) {
    return;
  }

  const values = new Map<string, string>();

  const fieldsets = contactEl.getElementsByTagName("fieldset");
  for (let i = 0; i < fieldsets.length; i++) {
    const fieldset = fieldsets[i] as HTMLFieldSetElement;
    const inputs = document.getElementsByName(fieldset.id);
    for (let j = 0; j < inputs.length; j++) {
      const input = inputs[j] as HTMLInputElement;
      addDisposableEventListener(input, "change", () => {
        if (input.checked) {
          values.set(input.name, input.value);
          update(values);
        }
      });
    }
  }

  const jobApplicationSelectEl = document.getElementById("job-application-select") as HTMLSelectElement;
  const descriptionEl = document.getElementById("description") as HTMLElement;

  const updateDescription = () => {
    descriptionEl.innerHTML = jobDescriptionMap.has(jobApplicationSelectEl.value) ?
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      jobDescriptionMap.get(jobApplicationSelectEl.value)! :
      "";
  };

  addDisposableEventListener(jobApplicationSelectEl, "change", updateDescription);
  updateDescription();
};
