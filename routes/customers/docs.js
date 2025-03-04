export const customersDoc = {
  "/customers": {
    get: {
      tags: ["Customers"],
      summary: "Get all customers",
      responses: {
        200: {
          description: "A list of customers",
          content: {
            "application/json": {
              example: [
                {
                  customer_id: 1,
                  customer_name: "John Doe",
                  email: "oZk0o@example.com",
                  phone: "123-456-7890",
                  address: "123 Main Street",
                },
                {
                  customer_id: 2,
                  customer_name: "Jane Smith",
                  email: "9jyOc@example.com",
                  phone: "987-654-3210",
                  address: "456 Office Road",
                },
              ],
            },
          },
        },
      },
    },
    post: {
      tags: ["Customers"],
      summary: "Create a new customer",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                customer_name: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                address: { type: "string" },
              },
            },
            example: {
              customer_name: "John Doe",
              email: "oZk0o@example.com",
              phone: "123-456-7890",
              address: "123 Main Street",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Customer created",
          content: {
            "application/json": {
              example: {
                customer_id: 1,
                customer_name: "John Doe",
                email: "oZk0o@example.com",
                phone: "123-456-7890",
                address: "123 Main Street",
              },
            },
          },
        },
      },
    },
  },
  "/customers/{id}": {
    get: {
      tags: ["Customers"],
      summary: "Get a customer by ID",
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
          description: "Customer details",
          content: {
            "application/json": {
              example: {
                customer_id: 1,
                customer_name: "John Doe",
                email: "oZk0o@example.com",
                phone: "123-456-7890",
                address: "123 Main Street",
              },
            },
          },
        },
        404: {
          description: "Customer not found",
          content: {
            "application/json": {
              example: {
                error: "Customer not found",
              },
            },
          },
        },
      },
    },
    put: {
      tags: ["Customers"],
      summary: "Update a customer by ID",
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
                customer_name: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                address: { type: "string" },
              },
            },
            example: {
              customer_name: "John Doe",
              email: "oZk0o@example.com",
              phone: "123-456-7890",
              address: "123 Main Street",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Customer updated",
          content: {
            "application/json": {
              example: {
                customer_id: 1,
                customer_name: "John Doe",
                email: "oZk0o@example.com",
                phone: "123-456-7890",
                address: "123 Main Street",
              },
            },
          },
        },
        404: {
          description: "Customer not found",
          content: {
            "application/json": {
              example: {
                error: "Customer not found",
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Customers"],
      summary: "Delete a customer by ID",
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
          description: "Customer deleted",
          content: {
            "application/json": {
              example: {
                customer_id: 1,
                customer_name: "John Doe",
                email: "oZk0o@example.com",
                phone: "123-456-7890",
                address: "123 Main Street",
              },
            },
          },
        },
        404: {
          description: "Customer not found",
          content: {
            "application/json": {
              example: {
                error: "Customer not found",
              },
            },
          },
        },
      },
    },
  },
  "/customers/{id}/orders": {
    get: {
      tags: ["Customers"],
      summary: "Get all orders for a customer by ID",
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
                  customer_id: 1,
                  order_lines: [
                    {
                      order_line_id: 3,
                      order_id: 2,
                      product_id: 3,
                      quantity: 3,
                      unit_price: 29.99,
                    },
                    {
                      order_line_id: 4,
                      order_id: 2,
                      product_id: 4,
                      quantity: 1,
                      unit_price: 9.99,
                    },
                  ],
                },
              ],
            },
          },
        },
        404: {
          description: "Customer not found",
          content: {
            "application/json": {
              example: {
                error: "Customer not found",
              },
            },
          },
        },
      },
    },
  },
}
