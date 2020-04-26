import {loadStripe} from '@stripe/stripe-js';

export const redirectToCheckout = (sessionId) => {
  loadStripe("pk_test_v9kPCbfJvtzyzbC0rBvky8Zb00Z73zlnMg")
      .then((stripe) => { return stripe.redirectToCheckout({sessionId: sessionId})})
      .catch((error) => Promise.reject(error));
};