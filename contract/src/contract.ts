import { NearBindgen, near, call, view, UnorderedMap, initialize } from 'near-sdk-js';

@NearBindgen({})
class MyContract {
    beneficiary: string = "neuneu.testnet";
    //beneficiary: string = "yourWallet.testnet";

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
