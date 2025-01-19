export const categoriesDocs = {
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
                category_id: 1,
                category_name: "Electronics",
                description: "Electronics category",
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
}
