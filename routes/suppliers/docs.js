export const suppliersDoc = {
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
                supplier_id: 1,
                supplier_name: "Office Supplies Co.",
                contact: "Jane Smith",
                phone: "987-654-3210",
                address: "456 Office Road",
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
                supplier_id: 1,
                supplier_name: "Updated Supplies Co.",
                contact: "Michael Johnson",
                phone: "321-987-6543",
                address: "789 Updated Avenue",
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
  },
}
