export function checkDisplay() {
  var ivp_store = IVP_STORE;
  var ivp_test = '0'; // TODO Remove if not used

  function hideApplePay() {
    // if (document.getElementById("applepaysubheader")) {
    // 	document.getElementById("applepaysubheader").style.display = "none";
    // }
    // if (document.getElementById("collapse_applepay")) {
    // 	document.getElementById("collapse_applepay").style.display = "none";
    // }
    // if (document.getElementById("pm_applepay")) {
    // 	document.getElementById("pm_applepay").style.display = "none";
    // }
  }

  if (window.ApplePaySession) {
    var promise = ApplePaySession.canMakePaymentsWithActiveCard(MERCHANT_IDENTIFIER);
    promise.then(function (canMakePayments) {
      if (canMakePayments) {
        document.getElementById("applePay").style.display = "inline-block";
      } else {
        hideApplePay();
      }
    }).catch(function (error) {
      hideApplePay();
    });
  } else {
    hideApplePay();
  }
  if ((ivp_store == '27621' || ivp_store == '27620')) {
    hideApplePay();
  }

}

export function OnApplePayClick() {

  if (ppValidate.CheckUserInfo() == false) {
    return false;
  }
  var currency_code = CURRENCY_CODE;
  var dec = 100;
  if (currency_code == 'OMR' || currency_code == 'BHD' || currency_code == 'JOD' || currency_code == 'KWD') {
    dec = 1000;
  }
  var ivp_qtyelement = document.getElementById('qtysel');
  var ivp_qty = 1;
  if (ivp_qtyelement !== null) {
    ivp_qty = ivp_qtyelement.value;
  }
  var runningAmount = (100000 * parseInt(ivp_qty)) / dec;
  var runningPP = 0;
  lgetShippingCosts('domestic_std');
  shippingCost
  var runningTotal = function () {
    return runningAmount + runningPP;
  }
  var shippingOption = "";

  var subTotalDescr = SUB_TOTAL_DESCRIPTION;
  var storename = STORE_NAME;

  var store_country = STORE_COUNTRY;

  if (store_country == 'SA') {
    var paymentRequest = {
      currencyCode: 'AED',
      countryCode: store_country,
      total: {
        label: '',
        amount: runningAmount
      },
      supportedNetworks: ['amex', 'masterCard', 'visa', 'mada'],
      merchantCapabilities: ['supports3DS', 'supportsCredit', 'supportsDebit']
    };
  } else {
    var paymentRequest = {
      currencyCode: 'AED',
      countryCode: store_country,
      total: {
        label: '',
        amount: runningAmount
      },
      supportedNetworks: ['amex', 'masterCard', 'visa'],
      merchantCapabilities: ['supports3DS', 'supportsCredit', 'supportsDebit']
    };
  }

  // shippingOption = getShippingCosts(shippingCountry)

  var session = new ApplePaySession(1, paymentRequest);

  // Merchant Validation
  session.onvalidatemerchant = function (event) {

    var promise = performValidation(event.validationURL);

    promise.then(function (merchantSession) {

      session.completeMerchantValidation(merchantSession);
    }).catch(function (error) {
      alert('Merchant invalid!!' + error);
    });

  }
  session.onshippingcontactselected = function (event) {

    var status = ApplePaySession.STATUS_SUCCESS;
    var newShippingMethods = [];
    var newTotal = {type: 'final', label: '', amount: runningTotal()};
    var newLineItems = [];

    session.completeShippingContactSelection(status, newShippingMethods, newTotal, newLineItems);
  }

  session.onshippingmethodselected = function (event) {
    runningPP = getShippingCosts(event.shippingMethod.identifier);

    var status = ApplePaySession.STATUS_SUCCESS;
    var newTotal = {type: 'final', label: '', amount: runningTotal()};
    var newLineItems = [];

    session.completeShippingMethodSelection(status, newTotal, newLineItems);
  }

  session.onpaymentmethodselected = function (event) {

    var newTotal = {type: 'final', label: 'TelrDev', amount: runningAmount};
    var newLineItems = [];

    session.completePaymentMethodSelection(newTotal, newLineItems);
  }

  var applepay_enc_version = "";
  var applepay_enc_paydata = "";
  var applepay_enc_paysig = "";
  var applepay_enc_pubkey = "";
  var applepay_enc_keyhash = "";
  var applepay_tran_id = "";
  var applepay_card_desc = "";
  var applepay_card_scheme = "";
  var applepay_card_type = "";
  var applepay_tran_id2 = "";

  var tran_status = 0;
  var transactionStatus = "";
  var integ_type = 0;
  var return_auth;
  var return_decl;

  function printValues(obj) {
    for (var key in obj) {
      if (typeof obj[key] === "object") {

        printValues(obj[key]);

      } else {
        if (key == "version") {
          applepay_enc_version = obj[key];
        }
        if (key == "data") {
          applepay_enc_paydata = encodeURIComponent(obj[key]);
        }
        if (key == "signature") {
          applepay_enc_paysig = encodeURIComponent(obj[key]);
        }
        if (key == "ephemeralPublicKey") {
          applepay_enc_pubkey = encodeURIComponent(obj[key]);
        }
        if (key == "publicKeyHash") {
          applepay_enc_keyhash = obj[key];
        }
        if (key == "transactionId") {
          applepay_tran_id = obj[key];
        }
        if (key == "type") {
          applepay_card_type = obj[key];
        }
        if (key == "displayName") {
          applepay_card_desc = obj[key];
        }
        if (key == "network") {
          applepay_card_scheme = obj[key];
        }
        if (key == "transactionIdentifier") {
          applepay_tran_id2 = obj[key];
        }
      }
    }
  }

  function getTransactionStatus(obj) {
    for (var key in obj) {
      if (typeof obj[key] === "object") {

        printValues(obj[key]);

      } else {
        if (key == "status") {
          transactionStatus = obj[key];
        }
      }
    }
  }

  function sendPaymentToken(paymentToken) {

    var currency_code = CURRENCY_CODE;
    var dec = 100;
    if (currency_code == 'OMR' || currency_code == 'BHD' || currency_code == 'JOD' || currency_code == 'KWD') {
      dec = 1000;
    }
    ppValidate.ShowWait();
    return new Promise(function (resolve, reject) {
      var ivp_sess = 'be536e57160c651ea4ebb84417697';
      var ivp_apenctxt = '6a00ad35bd001e609fd34ad24a60692a';
      return_auth = 'None';
      return_decl = 'None';
      integ_type = '9';
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status == 200) {
          var jsonData = this.response;
          getTransactionStatus(jsonData)
          var data = JSON.parse(jsonData);
          var st = data.transaction.status;
          if (st == 'A') {

            tran_status = 1;
            if (integ_type == 20) {
              return_auth = data.zoho.url;
            }
          } else {
            if (integ_type == 20) {
              return_decl = data.zoho.url;
            }
          }

          resolve(true);
        }
      };
      xhr.onerror = reject;
      var ivp_qtyelement = document.getElementById('qtysel');
      var ivp_qty = 1;
      if (ivp_qtyelement !== null) {
        ivp_qty = ivp_qtyelement.value;
      }
      var params = "ivp_sess=" + ivp_sess + "&ivp_apenctxt=" + ivp_apenctxt + "&applepay_enc_version=" + applepay_enc_version + "&applepay_enc_paydata=" + applepay_enc_paydata + "&applepay_enc_paysig=" + applepay_enc_paysig + "&applepay_enc_pubkey=" + applepay_enc_pubkey + "&applepay_enc_keyhash=" + applepay_enc_keyhash + "&applepay_tran_id=" + applepay_tran_id + "&applepay_card_desc=" + applepay_card_desc + "&applepay_card_scheme=" + applepay_card_scheme + "&applepay_card_type=" + applepay_card_type + "&applepay_tran_id2=" + applepay_tran_id2 + "&ivp_qty=" + ivp_qty;
      xhr.open('POST', API_URL, true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(params);
    });
  }

  session.onpaymentauthorized = function (event) {
    printValues(event.payment.token);
    var promise = sendPaymentToken(event.payment.token);
    promise.then(function (success) {
      var status;
      if (tran_status) {

        status = ApplePaySession.STATUS_SUCCESS;
        document.getElementById("applePay").style.display = "none";

      } else {

        status = ApplePaySession.STATUS_FAILURE;
      }
      session.completePayment(status);
      var form = document.createElement("form");
      var form_sess = document.createElement("input");
      form.method = "POST";
      form.action = "/gateway/details.html";
      form_sess.value = "be536e57160c651ea4ebb84417697";
      form_sess.name = "session";
      form_sess.type = "hidden";
      form.appendChild(form_sess);
      document.body.appendChild(form);
      form.submit();
    }).catch(function () {
      alert('Some error has occured after');
    });
  }
  session.oncancel = function (event) {

  }

  session.begin();
}

export function performValidation(valURL) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        var jsonData = this.response;

        var data = JSON.parse(jsonData);

        resolve(data);
      }
    };
    xhr.onerror = reject;
    var varURL = "https://uat-secure.telrdev.com/applepay/apple_pay_com.php?u=" + valURL;
    xhr.open('GET', varURL, true);
    xhr.send();
  });
}

