import {showMessage} from 'react-native-flash-message';
import RNIap, {purchaseUpdatedListener} from 'react-native-iap';

export const loadPayments = async () => {
  const res = await RNIap.initConnection();
  return res;
};

export const listAvailableSubscriptions = async (products: any) => {
  try {
    const product = await RNIap.getProducts(products);
    return product;
  } catch (err) {
    console.log('List', err);
  }
};

export const requestSubscription = async (productId: any) => {
  try {
    await RNIap.requestSubscription(productId);
    return true;
  } catch (err) {
    showMessage({
      type: 'danger',
      message: 'Erro',
      description:
        'Tivemos um problema ao recuperar os dados do produto, tente novamente',
    });
    return false;
  }
};

export const updateSubscription = async () => {
  try {
    purchaseUpdatedListener(async purchase => {
      const receipt = purchase.transactionReceipt;

      if (receipt) {
        await RNIap.finishTransaction(purchase);
        return true;
      }
    });
  } catch (err) {
    return false;
  }
};

export const purchased = async (productId: any) => {
  let isPurchased = false;
  try {
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
