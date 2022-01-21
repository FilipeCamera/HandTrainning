import {showMessage} from 'react-native-flash-message';
import RNIap, {purchaseUpdatedListener} from 'react-native-iap';

export const listAvailableSubscriptions = async products => {
  try {
    const res = await RNIap.initConnection();
    if (res) {
      await RNIap.getProducts(products);
    }
  } catch (err) {
    console.log(err);
  }
};

export const requestSubscription = async productId => {
  try {
    const res = await RNIap.initConnection();
    if (res) {
      await RNIap.requestSubscription(productId);
      return true;
    }
  } catch (err) {
    console.log(err);
    showMessage({
      type: 'danger',
      message: 'Erro',
      description:
        'Tivemos um problema ao recuperar os dados do produto, tente novamente',
    });
    return false;
  }
};

export const updateSubscription = async productId => {};

export const purchased = async productId => {
  let isPurchased = false;
  try {
    await RNIap.initConnection();
    const purchases = await RNIap.getAvailablePurchases();

    purchases.forEach(purchase => {
      if (purchase.productId === productId) {
        isPurchased = true;
        return;
      }
    });
    return isPurchased;
  } catch (err) {
    return false;
  }
};
