# Paysafecard client for NodeJS

![](https://img.shields.io/github/workflow/status/ingameltd/paysafecard/Build) ![](https://img.shields.io/github/license/ingameltd/paysafecard) ![](https://img.shields.io/npm/v/@ingameltd/paysafecard) ![](https://img.shields.io/github/last-commit/ingameltd/paysafecard)

A type safe paysafecard client for NodeJS written in Typescript

Read the documentation [here](https://ingameltd.github.io/paysafecard/).

## Installation

```bash
npm install --save @ingameltd/paysafecard
```

## Usage

### Importing

```typescript
import {
  Paysafecard,
  Payment
  Currency,
} from "@ingameltd/paysafecard";
```

### Initialization

- **key** : Key from the Paysafecard merchant panel (PSC_XXX_XXXXXXXXXXXXXXXXXXXXXX)

```typescript
const paysafecard = new Paysafecard(key);
```

### Create an order

```typescript
const result = await psc.initiatePayment({
  amount: 0.2,
  currency: Currency.EUR,
  customer: {
    id: "b4e7fa08-1dde-4f45-b3dd-3e5e99a2177d",
  },
  notification_url: " https://notification.com/payment?payment_id={payment_id}",
  redirect: {
    success_url: "https://mystore.com/order?orderId={payment_id}",
    failure_url: "https://mystore.com/order?orderId={payment_id}&error=true",
  },
});
```

### Retrive order

When the notification arrives, merchant should retrive the payment from the Paysafecard.

```typescript
const result = await paysafecard.retrievePayment(
  "id of the paysafecard transaction"
);
```

### Capture order

After retrive order, if it is in `Authorized` state, merchant should capture order with the following API call
to transfer funds from customer to the merchant.

```typescript
const result = await paysafecard.captureOrder(
  "id of the paysafecard transaction"
);
```
