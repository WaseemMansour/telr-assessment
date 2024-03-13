export function initialTabbyPayment() {
// LINK integration.js ON CHECKOUT/PAYMENT OPTIONS PAGE
// ALL CALLS ARE ASYNCHRONOUS, WE STRONGLY RECOMMEND TO INITIALIZE SESSION AS SOON AS POSSIBLE
// THIS WAY EVERYTHING WOULD BE READY WHEN CUSTOMER DESIDES TO CHOOSE A PAYMENT METHOD
// THIS IS USED TO CONTROL RECREATION OF TABBY POPUP
  var relaunchTabby = false;
  var paymentID;
  var paymentStatus;
  var available_type = 0;
  var payment_url_en = ('https%3a%2f%2fcheckout.tabby.ai%2f%3fsessionId%3d9a7b1c4c-6e85-4dac-ac33-24a186b127ce%26apiKey%3dpk_9a2734b2-c10b-4041-901e-671011d4b44c%26product%3dinstallments%26merchantCode%3d15996');
  var payment_url_instal = decodeURIComponent(payment_url_en);
  var payment_url_en = ('');
  var payment_url_cc = decodeURIComponent(payment_url_en);
  var payment_rejected = ('');
// IN THIS DEMO WE HAVE TWO BUTTONS, DEPENDS ON CHECKOUT IMPLEMENTATION
  var creditCardButton = document.querySelector('#creditCardButton');
  var installmentsButton = document.querySelector('#installmentsButton');

  if ('') { // TODO What is this condition ?????
            //console.log("payd_allow_tabby_cc ");
            //  creditCardButton.classList.remove('button__disabled');
            // creditCardButton.removeAttribute('hidden');
            // payLatertext.removeAttribute('hidden');
            // paynow.removeAttribute('hidden');
            //available_type=available_type+1;
  }

  if ('1') { // TODO What is this condition ?????
             //console.log("payd_allow_tabby_in ");
    installmentsButton.classList.remove('button__disabled');
    installmentsButton.removeAttribute('hidden');
    // installmentstext.removeAttribute('hidden');
    paynow.removeAttribute('hidden');
    available_type = available_type + 1;
  }

  if (available_type == 1) {
    if (!(window.getComputedStyle(creditCardButton).display === "none")) {
      document.getElementById('cc').checked = true;
    } else if (!(window.getComputedStyle(installmentsButton).display === "none")) {
      document.getElementById('ins').checked = true;
    }
  }

// IMPORTANT PIECE, TELLS SDK IF POPUP NEEDS TO BE RENDERED AGAIN
//console.log("available_type " + available_type);
  if (available_type == 0) {
    ErrorAmount.removeAttribute('hidden');
    //console.log('Payment rejected:',payment_rejected);
  }

  paymentID = '4b731345-1d0a-4be8-9331-96bfcacdb475';
  paymentStatus = 'CREATED';
// THIS SNIPPET DEMOSTRATES AN ONCLICK EVENT FOR 'PLACE ORDER' BUTTON
// IN CASE OF A SINGLE BUTTON, YOU CAN SAVE selectedTabbyProduct UPFRONT WHEN USERS CHOOSES ONE OF THE METHODS
  paynow.onclick = () => {
    if (ppValidate.CheckUserInfo() == false) {
      return false;
    }
    if (document.getElementById('ins').checked) {
      //Before Payment process updated Payment ID
      ppValidate.tabby_payment_id = paymentID;
      ppValidate.tabby_payment_status = paymentStatus;
      ppValidate.tabby_payment_type = 'Installments';
      //ppValidate.Initiate_Tabby();
      window.location.replace((payment_url_instal));
    }

    if (document.getElementById('cc').checked) {
      //Before Payment process updated Payment ID
      ppValidate.tabby_payment_id = paymentID;
      ppValidate.tabby_payment_status = paymentStatus;
      ppValidate.tabby_payment_type = 'Installments';
      //ppValidate.Initiate_Tabby();
      window.location.replace((payment_url_cc));
    }
  };
}
