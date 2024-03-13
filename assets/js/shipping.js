
export function getShippingOptions(shippingCountry) {
  let shippingOption;
    if (shippingCountry.toUpperCase() == "AED") {
      shippingOption = [{
        label: 'Standard Shipping',
        amount: getShippingCosts('domestic_std'),
        detail: '3-5 days',
        identifier: 'domestic_std'
      }, {
        label: 'Expedited Shipping',
        amount: getShippingCosts('domestic_exp'),
        detail: '1-3 days',
        identifier: 'domestic_exp'
      }];
    } else {
      shippingOption = [{
        label: 'International Shipping',
        amount: getShippingCosts('international'),
        detail: '5-10 days',
        identifier: 'international'
      }];
    }
    return shippingOption;
  }

export function getShippingCosts(shippingIdentifier) {

    var shippingCost = 0;

    switch (shippingIdentifier) {
      case 'domestic_std':
        shippingCost = 3;
        break;
      case 'domestic_exp':
        shippingCost = 6;
        break;
      case 'international':
        shippingCost = 9;
        break;
      default:
        shippingCost = 11;
    }

    return shippingCost;
  }
