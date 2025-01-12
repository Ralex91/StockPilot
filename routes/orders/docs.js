export const ordersDoc = {
  "/orders": {
    get: {
      tags: ["Orders"],
      summary: "Get all orders",
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
                },
                {
                  order_id: 2,
                  order_date: "2022-02-01",
                  customer_id: 2,
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
                message: "Order added",
                orderId: 1,
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
                message: "Order updated",
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
                message: "Order deleted",
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
}
