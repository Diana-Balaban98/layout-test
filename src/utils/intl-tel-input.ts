import intlTelInput from "intl-tel-input";

export const identifyPhone = (el: Element) => {
    intlTelInput(el as HTMLInputElement, {
        initialCountry: "ge",
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@16.0.3/build/js/utils.js",
    });
}