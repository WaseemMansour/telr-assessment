import { ERROR_KEYS } from "./error-messages";

export function initializePaymentValidators() {
  ppValidate.WaitForDOM();
  ppValidate.InitDetailsForm();
  ppValidate.SetErr(ERROR_KEYS);
}
