export const productsDoc = {
  "/products": {
    get: {
      tags: ["Products"],
      summary: "Get all products",
      responses: {
        200: {
          description: "A list of products",
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
                {
                  product_id: 2,
                  product_name: "Smartphone",
                  description: "Latest smartphone with advanced features",
                  price: 800.0,
                  stock_quantity: 20,
                  category_id: 1,
                  supplier_id: 2,
                },
              ],
            },
          },
        },
      },
    },
    post: {
      tags: ["Products"],
      summary: "Create a new product",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                product_name: { type: "string" },
                description: { type: "string" },
                price: { type: "number" },
                stock_quantity: { type: "integer" },
                category_id: { type: "integer" },
                supplier_id: { type: "integer" },
              },
              required: ["product_name", "price", "stock_quantity"],
            },
            example: {
              product_name: "Laptop",
              description: "High-end gaming laptop",
              price: 1500.0,
              stock_quantity: 10,
              category_id: 2,
              supplier_id: 1,
            },
          },
        },
      },
      responses: {
        201: {
          description: "Product created",
          content: {
            "application/json": {
              example: {
                product_id: 1,
                product_name: "Laptop",
                description: "High-end gaming laptop",
                price: 1500.0,
                stock_quantity: 10,
                category_id: 2,
                supplier_id: 1,
              },
            },
          },
        },
      },
    },
  },
  "/products/{id}": {
    get: {
      tags: ["Products"],
      summary: "Get a product by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "The product ID",
        },
      ],
      responses: {
        200: {
          description: "A product object",
          content: {
            "application/json": {
              example: {
                product_id: 1,
                product_name: "Laptop",
                description: "High-end gaming laptop",
                price: 1500.0,
                stock_quantity: 10,
                category_id: 2,
                supplier_id: 1,
              },
            },
          },
        },
        404: {
          description: "Product not found",
          content: {
            "application/json": {
              example: {
                error: "Product not found",
              },
            },
          },
        },
      },
    },
    put: {
      tags: ["Products"],
      summary: "Update a product by ID",
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
                product_name: { type: "string" },
                description: { type: "string" },
                price: { type: "number" },
                stock_quantity: { type: "integer" },
                category_id: { type: "integer" },
                supplier_id: { type: "integer" },
              },
            },
            example: {
              product_name: "Updated Laptop",
              description: "Updated description",
              price: 1400.0,
              stock_quantity: 5,
              category_id: 2,
              supplier_id: 1,
            },
          },
        },
      },
      responses: {
        200: {
          description: "Product updated",
          content: {
            "application/json": {
              example: {
                product_id: 1,
                product_name: "Updated Laptop",
                description: "Updated description",
                price: 1400.0,
                stock_quantity: 5,
                category_id: 2,
                supplier_id: 1,
              },
            },
          },
        },
        404: {
          description: "Product not found",
          content: {
            "application/json": {
              example: {
                error: "Product not found",
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Products"],
      summary: "Delete a product by ID",
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
          description: "Product deleted",
          content: {
            "application/json": {
              example: {
                product_id: 1,
                product_name: "Laptop",
                description: "High-end gaming laptop",
                price: 1500.0,
                stock_quantity: 10,
                category_id: 2,
                supplier_id: 1,
              },
            },
          },
        },
        404: {
          description: "Product not found",
          content: {
            "application/json": {
              example: {
                error: "Product not found",
              },
            },
          },
        },
      },
    },
  },
  "/products/{id}/orders": {
    get: {
      tags: ["Products"],
      summary: "Get orders for a product by ID",
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
          description: "An array of order objects",
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
                  order_date: "2022-01-02",
                  customer_id: 2,
                  order_lines: [
                    {
                      order_line_id: 3,
                      order_id: 2,
                      product_id: 1,
                      quantity: 3,
                      unit_price: 99.99,
                    },
                    {
                      order_line_id: 4,
                      order_id: 2,
                      product_id: 2,
                      quantity: 2,
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
  },
}
