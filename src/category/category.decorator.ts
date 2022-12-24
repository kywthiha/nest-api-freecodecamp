import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

export function CategoryApiQuery() {
  return applyDecorators(
    ApiQuery({
      name: "page",
      required: false,
      schema: {
        type: "integer"
      }
    }),
    ApiQuery({
      name: "limit",
      required: false,
      schema: {
        type: "integer"
      }
    }),
    ApiQuery({
      name: "filter",
      required: false,
      schema: {
        type: "object",
        properties: {
          filter: {
            type: "object",
            properties: {
              name: {
                type: "object",
                properties: {
                  equals: {
                    type: "string"
                  },
                  contains: {
                    type: "string"
                  },
                  in: {
                    type: "array"
                  },
                  notIn: {
                    type: "array"
                  },
                  startsWith: {
                    type: "string"
                  },
                  endsWith: {
                    type: "string"
                  }
                }
              },
              description: {
                type: "object",
                properties: {
                  equals: {
                    type: "string"
                  },
                  contains: {
                    type: "string"
                  },
                  in: {
                    type: "array"
                  },
                  notIn: {
                    type: "array"
                  },
                  startsWith: {
                    type: "string"
                  },
                  endsWith: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      }
    }),
    ApiQuery({
      name: "sort",
      required: false,
      schema: {
        type: "object",
        properties: {
          sort: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "asc"
              },
              name: {
                type: "string",
                example: "desc"
              },
              createdAt: {
                type: "string",
                example: "asc"
              },
              updatedAt: {
                type: "string",
                example: "desc"
              }
            }
          }
        }
      }
    }),
    ApiQuery({
      name: "fields",
      required: false,
      schema: {
        type: "string",
        example: "id,name"
      }
    })
  );
}