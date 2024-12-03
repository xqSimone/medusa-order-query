import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { ExecArgs } from "@medusajs/framework/types";

export default async function checkItemsQuantity({ container }: ExecArgs) {
  const orderSrv = container.resolve(Modules.ORDER);
  const order = await orderSrv.createOrders([
    {
      currency_code: "usd",
      items: [{ title: "Product Name", quantity: 2, unit_price: 20 }],
    },
  ]);

  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  const result_1 = await query.graph({
    entity: "order",
    fields: ["currency_code", "items.quantity", "items.title"],
    filters: {
      id: order[0].id,
    },
  });
  console.log(result_1.data[0].items[0].quantity);

  const result_2 = await query.graph({
    entity: "order",
    fields: ["*", "currency_code", "items.quantity", "items.title"],
    filters: {
      id: order[0].id,
    },
  });
  console.log(result_2.data[0].items[0].quantity);

  console.assert(
    result_1.data[0].items[0].quantity == result_2.data[0].items[0].quantity,
  );
}
