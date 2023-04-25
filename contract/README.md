# Hello NEAR Contract

The smart contract enables to perform a transactions to buy items and keep track of a wallet orders.

```ts
import { NearBindgen, near, call, view, UnorderedMap, initialize } from 'near-sdk-js';

@NearBindgen({})
class MyContract {
    beneficiary: string = "yourWallet.testnet";

    orders = new UnorderedMap<Order[]>("orders");

    @initialize({ privateFunction: true })
    init({ beneficiary }: { beneficiary: string }) {
        this.beneficiary = beneficiary
    }

    @call({payableFunction: true})
    purchaseBasket({basket, totalPrice}: {basket: OrderItem[]; totalPrice: number}) {
        // Get who is paying
        let sender = near.predecessorAccountId();
        let donationAmount: bigint = near.attachedDeposit() as bigint;
        // Send NEAR token to the beneficiary
        const promise = near.promiseBatchCreate(this.beneficiary)
        near.promiseBatchActionTransfer(promise, donationAmount);
        // Update sender orders
        let currentOrders = this.orders.get(sender, {defaultValue: []});
        currentOrders.push({
            items: basket,
            totalPrice: totalPrice,
            timestamp: near.blockTimestamp()
        });
        this.orders.set(sender, currentOrders);
    }

    @view({})
    getOrders({account_id}: {account_id: string}): Order[] {
        return this.orders.get(account_id) || [];
    }
}
class OrderItem {
    id: string;
    name: string;
    priceInDollar: number;
    url: string;
    quantity: number;
}

class Order {
    items: OrderItem[];
    totalPrice: number;
    timestamp: bigint;
}
```

<br />

# Quickstart

1. Make sure you have installed [node.js](https://nodejs.org/en/download/package-manager/) >= 16.
2. Install the [`NEAR CLI`](https://github.com/near/near-cli#setup)

<br />

## 1. Build and Deploy the Contract
Before you deploy the contract, make your you replace `'yourWallet.testnet'` by the wallet of your choice for the `beneficiary`. You can automatically compile and deploy the contract in the NEAR testnet by running:

```bash
npm run deploy
```

Once finished, check the `neardev/dev-account` file to find the address in which the contract was deployed:

```bash
cat ./neardev/dev-account
# e.g. dev-1659899566943-21539992274727
```

<br />

## 2. Retrieve the Orders

`getOrders` is a read-only method (aka `view` method).

`View` methods can be called for **free** by anyone, even people **without a NEAR account**!

```bash
# Use near-cli to get the orders
near view <dev-account> getOrders
```

<br />

## 3. Make a New order
`purchaseBasket` changes the contract's state, for which it is a `call` method.

`Call` methods can only be invoked using a NEAR account, since the account needs to pay GAS for the transaction.

```bash
# Use near-cli to make a new order
near call <dev-account> purchaseBasket '{"basket":"[{id:string, name:string, priceInDollar:number, url:string, quantity:number}, ...], totalPrice: number"}' --accountId <dev-account>
```

**Tip:** If you would like to call `purchaseBasket` using your own account, first login into NEAR using:

```bash
# Use near-cli to login your NEAR account
near login
```

and then use the logged account to sign the transaction: `--accountId <your-account>`.
