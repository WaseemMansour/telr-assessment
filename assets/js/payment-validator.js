import { ERROR_KEYS } from "./error-messages.js"

export function initializePaymentValidators() {
  ppValidate.WaitForDOM();
  ppValidate.InitDetailsForm();
  ppValidate.SetErr(ERROR_KEYS);
}
