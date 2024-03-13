import {
  API_URL,
  MERCHANT_IDENTIFIER,
  CURRENCY_CODE,
  STORE_COUNTRY,
  STORE_NAME,
  SUB_TOTAL_DESCRIPTION,
  IVP_STORE,
  JWT_PAY
} from './constants.js';
import { initializePaymentValidators } from './payment-validator.js';
import { initialTabbyPayment } from './tabby-payment.js'
import { checkDisplay, OnApplePayClick } from './apple-pay.js';
import { getShippingCosts } from "./shipping.js";


initializePaymentValidators();
initialTabbyPayment();


function enable_tcbox() {
  document.getElementById("tc_box").disabled = false;
}

function display_terms() {
  setTimeout(enable_tcbox, 5000);
  window.open('http://www.telr.com/', 'PaymentTerms', 'height=650,width=850,left=80,top=80,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=no,titlebar=yes');
}


// JWT
var jwt_pay = JWT_PAY + "";
ppValidate.StartCardinal("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", jwt_pay, "LIzdikzU4af47pbThmiLI8hnAGkVKpFHj-M0J-yDXLE", "mid_11c97d27-c624-408e-ad5d-7583fe641222");
ppValidate.cybersource_enabled = true;
ppValidate.framed = 0;

// Add Apple Pay Button Event Listener
document.getElementById('applePay').addEventListener('click', OnApplePayClick);

initializePaymentValidators();
initialTabbyPayment();
checkDisplay();
