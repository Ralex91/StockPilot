export const ordersDoc = {
  "/orders": {
    get: {
      tags: ["Orders"],
      summary: "Get all orders",
      parameters: [
        {
          name: "start",
          description: "Start date",
          in: "query",
          required: false,
          schema: {
            type: "string",
          },
        },
        {
          name: "end",
          description: "End date",
          in: "query",
          required: false,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "A list of orders",
          content: {
            "application/json": {
              example: [
                {
                  order_id: 1,
                  order_date: "2022-01-01",
                  customer_id: 1,
                  order_lines: [
                    {
                      order_line_id: 1,
                      order_id: 1,
                      product_id: 1,
                      quantity: 2,
                      unit_price: 99.99,
                    },
                    {
                      order_line_id: 2,
                      order_id: 1,
                      product_id: 2,
                      quantity: 1,
                      unit_price: 49.99,
                    },
                  ],
                },
                {
                  order_id: 2,
                  order_date: "2022-02-01",
                  customer_id: 2,
                  order_lines: [
                    {
                      order_line_id: 1,
                      order_id: 1,
                      product_id: 1,
                      quantity: 2,
                      unit_price: 99.99,
                    },
                    {
                      order_line_id: 2,
                      order_id: 1,
                      product_id: 2,
                      quantity: 1,
                      unit_price: 49.99,
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    post: {
      tags: ["Orders"],
      summary: "Create a new order",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                order_date: { type: "string" },
                customer_id: { type: "integer" },
              },
            },
            example: {
              order_date: "2022-01-01",
              customer_id: 1,
            },
          },
        },
      },
      responses: {
        201: {
          description: "Order created",
          content: {
            "application/json": {
              example: {
                order_id: 1,
                order_date: "2022-01-01",
                customer_id: 1,
              },
            },
          },
        },
      },
    },
  },
  "/orders/{id}": {
    get: {
      tags: ["Orders"],
      summary: "Get an order by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        200: {
          description: "An order object",
          content: {
            "application/json": {
              example: {
                order_id: 1,
                order_date: "2022-01-01",
                customer_id: 1,
              },
            },
          },
        },
        404: {
          description: "Order not found",
          content: {
            "application/json": {
              example: {
                error: "Order not found",
              },
            },
          },
        },
      },
    },
    put: {
      tags: ["Orders"],
      summary: "Update an order by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                order_date: { type: "string" },
                customer_id: { type: "integer" },
              },
            },
            example: {
              order_date: "2022-01-01",
              customer_id: 1,
            },
          },
        },
      },
      responses: {
        200: {
          description: "Order updated",
          content: {
            "application/json": {
              example: {
                order_id: 1,
                order_date: "2022-01-01",
                customer_id: 1,
              },
            },
          },
        },
        404: {
          description: "Order not found",
          content: {
            "application/json": {
              example: {
                error: "Order not found",
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Orders"],
      summary: "Delete an order by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        200: {
          description: "Order deleted",
          content: {
            "application/json": {
              example: {
                order_id: 1,
                order_date: "2022-01-01",
                customer_id: 1,
              },
            },
          },
        },
        404: {
          description: "Order not found",
          content: {
            "application/json": {
              example: {
                error: "Order not found",
              },
            },
          },
        },
      },
    },
  },
  "/orders/{id}/lines": {
    post: {
      tags: ["Order Lines"],
      summary: "Create a new order line",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                product_id: { type: "integer" },
                quantity: { type: "integer" },
              },
            },
            example: {
              product_id: 1,
              quantity: 2,
            },
          },
        },
      },
      responses: {
        200: {
          description: "Order line created",
          content: {
            "application/json": {
              example: {
                order_line_id: 1,
                order_id: 1,
                product_id: 1,
                quantity: 2,
                unit_price: 99.99,
              },
            },
          },
        },
        404: {
          description: "Order not found",
          content: {
            "application/json": {
              example: {
                error: "Order not found",
              },
            },
          },
        },
      },
    },
  },
  "/orders/{id}/lines/{lineId}": {
    delete: {
      tags: ["Order Lines"],
      summary: "Delete an order line by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
        },
        {
          name: "lineId",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        200: {
          description: "Order line deleted",
          content: {
            "application/json": {
              example: {
                order_line_id: 1,
                order_id: 1,
                product_id: 1,
                quantity: 2,
                unit_price: 99.99,
              },
            },
          },
        },
        404: {
          description: "Order line not found",
          content: {
            "application/json": {
              example: {
                error: "Order line not found",
              },
            },
          },
        },
      },
    },
  },
}
