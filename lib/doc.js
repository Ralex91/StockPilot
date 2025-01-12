const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "StockPilot API",
    version: "1.0.0",
    description: "API documentation for the stock management system.",
  },
  servers: [
    {
      url: "http://localhost:3333",
      description: "Local server",
    },
  ],
  paths: {
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
    "/suppliers": {
      get: {
        tags: ["Suppliers"],
        summary: "Get all suppliers",
        responses: {
          200: {
            description: "A list of suppliers",
            content: {
              "application/json": {
                example: [
                  {
                    supplier_id: 1,
                    supplier_name: "Tech Supplies Ltd.",
                    contact: "John Doe",
                    phone: "123-456-7890",
                    address: "123 Tech Street",
                  },
                  {
                    supplier_id: 2,
                    supplier_name: "Office Supplies Co.",
                    contact: "Jane Smith",
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
        tags: ["Suppliers"],
        summary: "Create a new supplier",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  supplier_name: { type: "string" },
                  contact: { type: "string" },
                  phone: { type: "string" },
                  address: { type: "string" },
                },
                required: ["supplier_name"],
              },
              example: {
                supplier_name: "Office Supplies Co.",
                contact: "Jane Smith",
                phone: "987-654-3210",
                address: "456 Office Road",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Supplier created",
            content: {
              "application/json": {
                example: {
                  message: "Supplier added",
                  supplierId: 1,
                },
              },
            },
          },
        },
      },
    },
    "/suppliers/{id}": {
      get: {
        tags: ["Suppliers"],
        summary: "Get a supplier by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
            description: "The supplier ID",
          },
        ],
        responses: {
          200: {
            description: "A supplier object",
            content: {
              "application/json": {
                example: {
                  supplier_id: 1,
                  supplier_name: "Tech Supplies Ltd.",
                  contact: "John Doe",
                  phone: "123-456-7890",
                  address: "123 Tech Street",
                },
              },
            },
          },
          404: {
            description: "Supplier not found",
            content: {
              "application/json": {
                example: {
                  error: "Supplier not found",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Suppliers"],
        summary: "Update a supplier by ID",
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
                  supplier_name: { type: "string" },
                  contact: { type: "string" },
                  phone: { type: "string" },
                  address: { type: "string" },
                },
              },
              example: {
                supplier_name: "Updated Supplies Co.",
                contact: "Michael Johnson",
                phone: "321-987-6543",
                address: "789 Updated Avenue",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Supplier updated",
            content: {
              "application/json": {
                example: {
                  message: "Supplier updated successfully",
                },
              },
            },
          },
          404: {
            description: "Supplier not found",
            content: {
              "application/json": {
                example: {
                  error: "Supplier not found",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Suppliers"],
        summary: "Delete a supplier by ID",
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
            description: "Supplier deleted",
            content: {
              "application/json": {
                example: {
                  message: "Supplier deleted",
                },
              },
            },
          },
          404: {
            description: "Supplier not found",
            content: {
              "application/json": {
                example: {
                  error: "Supplier not found",
                },
              },
            },
          },
        },
      },
    },
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
                  message: "Product added",
                  productId: 1,
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
                  message: "Product updated successfully",
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
                  message: "Product deleted successfully",
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
    "/categories": {
      get: {
        tags: ["Categories"],
        summary: "Get all categories",
        responses: {
          200: {
            description: "A list of categories",
            content: {
              "application/json": {
                example: [
                  {
                    category_id: 1,
                    category_name: "Electronics",
                    description: "Electronics category",
                  },
                  {
                    category_id: 2,
                    category_name: "Clothing",
                    description: "Clothing category",
                  },
                ],
              },
            },
          },
        },
      },
      post: {
        tags: ["Categories"],
        summary: "Create a new category",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  category_name: { type: "string" },
                  description: { type: "string" },
                },
              },
              example: {
                category_name: "Electronics",
                description: "Electronics category",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Category created",
            content: {
              "application/json": {
                example: {
                  message: "Category added",
                  categoryId: 1,
                },
              },
            },
          },
        },
      },
    },
    "/categories/{id}": {
      get: {
        tags: ["Categories"],
        summary: "Get a category by ID",
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
            description: "A category object",
            content: {
              "application/json": {
                example: {
                  category_id: 1,
                  category_name: "Electronics",
                  description: "Electronics category",
                },
              },
            },
          },
          404: {
            description: "Category not found",
            content: {
              "application/json": {
                example: {
                  error: "Category not found",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Categories"],
        summary: "Update a category by ID",
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
                  category_name: { type: "string" },
                  description: { type: "string" },
                },
              },
              example: {
                category_name: "Electronics",
                description: "Electronics category",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Category updated",
            content: {
              "application/json": {
                example: {
                  message: "Category updated",
                },
              },
            },
          },
          404: {
            description: "Category not found",
            content: {
              "application/json": {
                example: {
                  error: "Category not found",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Categories"],
        summary: "Delete a category by ID",
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
            description: "Category deleted",
            content: {
              "application/json": {
                example: {
                  message: "Category deleted",
                },
              },
            },
          },
          404: {
            description: "Category not found",
            content: {
              "application/json": {
                example: {
                  error: "Category not found",
                },
              },
            },
          },
        },
      },
    },
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
  },
}

export default swaggerDoc
