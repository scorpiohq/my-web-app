const CHECKOUT_NAV_KEY = "yb-checkout-nav";

export function markGoingToCheckout() {
  try {
    sessionStorage.setItem(CHECKOUT_NAV_KEY, "1");
  } catch {
    // ignore
  }
}

export function clearGoingToCheckout() {
  try {
    sessionStorage.removeItem(CHECKOUT_NAV_KEY);
  } catch {
    // ignore
  }
}

export function isGoingToCheckout() {
  try {
    return sessionStorage.getItem(CHECKOUT_NAV_KEY) === "1";
  } catch {
    return false;
  }
}
