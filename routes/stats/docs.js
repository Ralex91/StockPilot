export const statsDoc = {
  "/stats/low-stock": {
    get: {
      tags: ["Statistics"],
      summary: "Get products with low stock quantity",
      parameters: [
        {
          name: "seuil",
          in: "query",
          required: true,
          schema: {
            type: "integer",
          },
          description: "The stock quantity threshold",
        },
      ],
      responses: {
        200: {
          description: "An array of product objects",
          content: {
            "application/json": {
              example: [
                {
                  product_id: 1,
                  product_name: "Laptop",
                  description: "High-end gaming laptop",
                  price: 1500.0,
                  stock_quantity: 10,
                  category_id: 2,
                  supplier_id: 1,
                },
              ],
            },
          },
        },
      },
    },
  },
  "/stats/best-selling": {
    get: {
      tags: ["Statistics"],
      summary: "Get the best-selling products",
      parameters: [
        {
          name: "start",
          in: "query",
          required: false,
          schema: {
            type: "string",
          },
          description: "The start date",
        },
        {
          name: "end",
          in: "query",
          required: false,
          schema: {
            type: "string",
          },
          description: "The end date",
        },
      ],
      responses: {
        200: {
          description: "An array of product objects",
          content: {
            "application/json": {
              example: [
                {
                  product_id: 1,
                  quantity: 2,
                },
                {
                  product_id: 2,
                  quantity: 1,
                },
                {
                  product_id: 3,
                  quantity: 3,
                },
              ],
            },
          },
        },
      },
    },
  },
}
