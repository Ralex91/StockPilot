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
                message: "Customer added",
                customerId: 1,
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
                message: "Customer updated successfully",
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
                message: "Customer deleted",
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
}
