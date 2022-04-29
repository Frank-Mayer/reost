import { addDisposableEventListener } from "@frank-mayer/magic";

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

export const Contact = () => {
  const contactEl = document.getElementById("contact") as HTMLFormElement;

  if (!contactEl) {
    return;
  }

  const values = new Map<string, string>();

  const fieldsets = contactEl.getElementsByTagName("fieldset");
  for (let i = 0; i < fieldsets.length; i++) {
    const fieldset = fieldsets[i]!;
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
};
