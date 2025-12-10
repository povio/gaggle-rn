# OpenAPI Specification Structure Rules

## Base Structure

```json
{
    "openapi": "3.0.0",
    "info": { ... },
    "servers": [ ... ],
    "security": [ ... ],
    "paths": { ... },
    "components": { ... },
    "tags": [ ... ]
}
```

## Key Rules and Conventions

### 1. API Versioning and Info

- Use OpenAPI version 3.0.0
- Include comprehensive info section with title, description, version, and contact
- Version should follow semantic versioning (e.g., "1.0.0")

### 2. Path Structure

- All endpoints must be prefixed with `/api`
- Use RESTful resource naming: `/api/resource` for collections, `/api/resource/{id}` for individual items
- Path parameters should use curly braces: `{paramName}`
- Order endpoints by resource, then by HTTP method
- Standard HTTP methods order: GET, POST, PUT/PATCH, DELETE
- Use PUT for full updates, PATCH for partial updates

### 3. Operation Structure

- OperationIds follow pattern: `{Controller}_{action}`
  Example: `BoardController_listBoards`
- Each operation must have:
  - summary: Short description
  - description: Detailed explanation
  - tags: For grouping related endpoints
  - appropriate responses
  - optional `x-acl` for access control rules (if needed)

### 4. Security

- Use Bearer token authentication
- Security scheme named "Authorization"
- Define in `components.securitySchemes`
- **ALWAYS use per-endpoint security** - apply security to individual operations, not globally

```json
"securitySchemes": {
  "Authorization": {
    "scheme": "Bearer",
    "bearerFormat": "Bearer",
    "name": "Authorization",
    "type": "http",
    "in": "Header"
  }
}
```

Apply security per-endpoint to operations that require authentication:

```json
{
  "paths": {
    "/api/auth/login": {
      "post": {
        "operationId": "AuthController_login"
        // No security - public endpoint
      }
    },
    "/api/user/me": {
      "get": {
        "operationId": "UserController_getMe",
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    }
  }
}
```

### 5. Response Structure

- Define responses directly on endpoints, NOT in components:

  ```json
  // GOOD - Define response directly on endpoint
  "401": {
      "description": "Unauthorized"
  }

  // BAD - Don't define responses in components and reference them
  "components": {
      "responses": {  // ❌ Don't do this
          "Unauthorized": { ... }
      }
  }
  "401": {
      "$ref": "#/components/responses/Unauthorized"  // ❌ Don't do this, openapi-codegen-cli cannot parse it
  }
  ```

- Use consistent HTTP status codes:
  - 200: Successful GET/PUT/PATCH
  - 201: Successful POST
  - 204: Successful DELETE
  - 401: Unauthorized
  - 403: Forbidden
  - 404: Not Found
- ALL responses must include content object, even for 204:

  ```json
  // For success responses (200, 201)
  "200": {
      "description": "Success message",
      "content": {
          "application/json": {
              "schema": {
                  "$ref": "#/components/schemas/YourResponseType"
              }
          }
      }
  }

  // For 204 (No Content)
  "204": {
      "description": "Operation successful",
      "content": {
          "application/json": {
              "schema": {
                  "$ref": "#/components/schemas/StatusResponseDto"
              }
          }
      }
  }

  // For errors (401, 403, 404)
  "401": {
      "description": "Unauthorized",
      "content": {
          "application/json": {
              "schema": {
                  "$ref": "#/components/schemas/Error"
              }
          }
      }
  }
  ```

- Always define a StatusResponseDto for empty responses:
  ```json
  "StatusResponseDto": {
      "type": "object",
      "properties": {
          "status": {
              "type": "string",
              "description": "Status message",
              "example": "ok"
          }
      }
  }
  ```
- Never return empty response objects
- Always include application/json content type
- Reference schema components for response bodies

### 6. Request Parameters

- Path parameters for resource identification
- Request bodies for POST/PUT/PATCH operations
- Query parameters:
  1. For paginated list endpoints (e.g., `/api/resource/paginate`):
     - Required:
       - limit: Page size (with min/max constraints)
     - Optional:
       - order: Sorting with +/- prefix (e.g., "+createdAt", "-createdAt")
       - filter: Complex filtering object
       - page: 1-indexed page number (for offset-based pagination)
       - cursor: ID of item to start after (for cursor-based pagination)
  2. For simple list endpoints (e.g., `/api/resource`):
     - Usually simpler, might only support basic filtering
     - Common optional parameters:
       - filter: Basic filtering (e.g., by status, type)
       - order: Simple sorting if needed

### 7. Schema Components

- Place all reusable schemas under components.schemas
- Use clear, descriptive names (e.g., "CreateBoardRequest")
- Include required fields array
- Add descriptions for all properties
- Use consistent formats:
  - string for IDs (do NOT use uuid format)
  - date-time for timestamps
  - integer for numbers
  - string with minLength/maxLength for text
- Use camelCase for all property names (e.g., "createdAt" not "created_at")
- Consider using x-field for UI hints:
  ```json
  "x-field": {
      "type": "reference-input",
      "reference": "Controller_action",
      "optionValue": "id",
      "optionText": "name"
  }
  ```

### 8. Resource Patterns

Each resource should follow this pattern:

1. Collection endpoints (/api/resource):

   - GET: List all (with filtering)
   - POST: Create new

2. Individual endpoints (/api/resource/{id}):

   - GET: Retrieve one (with optional nested resources)
   - PUT: Full update
   - PATCH: Partial update
   - DELETE: Remove

3. Nested resource endpoints:
   Example for a kanban board:

   ```
   GET /api/boards/{id}
   {
       "id": "uuid",
       "name": "Project X",
       "columns": [
           {
               "id": "uuid",
               "name": "To Do",
               "tasks": [
                   { "id": "uuid", "title": "Task 1" }
               ]
           }
       ]
   }
   ```

   Nest related resources in the response when they're typically displayed together in the UI.

4. Additional endpoints (/api/resource/special-action):
   - For non-CRUD operations
   - Use descriptive names

### 9. Common Properties

For all resources:

- id: string type (do NOT use uuid format)
- createdAt: date-time
- updatedAt: date-time
- Use camelCase for all property names

### 10. Error Handling

Standard error schema:

```json
"Error": {
    "type": "object",
    "properties": {
        "code": { "type": "string" },
        "message": { "type": "string" },
        "details": { "type": "string" },
        "hint": { "type": "string" }
    }
}
```

### 11. Tags Organization

- Group related endpoints under tags
- Each tag should have:
  - name: Resource name
  - description: Resource purpose
- Use consistent naming across paths and tags

### 12. Documentation

- Every schema property must have a description
- Every endpoint must have a summary and description
- Include examples where helpful
- Document all possible response codes

### 13. Pagination

Two supported patterns:

1. Offset-based:

```json
{
    "items": [],
    "page": 1,
    "limit": 20,
    "totalItems": 100
}
```

2. Cursor-based:

```json
{
    "items": [],
    "cursor": "last_id",
    "nextCursor": "next_id",
    "limit": 20,
    "totalItems": 100
}
```

### 14. Filtering

Standard filter object structure:

```json
"filter": {
    "ids": ["uuid1", "uuid2"],
    "search": "free text search",
    "specificField": "exact match",
    "dateRange": {
        "start": "2024-01-01",
        "end": "2024-12-31"
    }
}
```

## Example Resource Structure

For a new resource named "Widget":

1. Add tag:

```json
{
    "name": "Widgets",
    "description": "Operations related to widgets"
}
```

2. Add paths:

```json
"/api/widgets": {
    "get": {
        "parameters": [
            {
                "name": "order",
                "in": "query",
                "description": "Order by fields (comma separated with +/- prefix)",
                "schema": {
                    "type": "string",
                    "example": "+createdAt,-name"
                }
            },
            {
                "name": "filter",
                "in": "query",
                "style": "deepObject",
                "explode": true,
                "schema": {
                    "$ref": "#/components/schemas/WidgetFiltersDto"
                }
            }
        ]
    },
    "post": { ... }
},
"/api/widgets/{id}": {
    "get": { ... },
    "put": { ... },
    "patch": { ... },
    "delete": { ... }
}
```

3. Add schemas:

```json
"Widget": {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "createdAt": {
            "type": "string",
            "format": "date-time"
        },
        "updatedAt": {
            "type": "string",
            "format": "date-time"
        }
    }
},
"WidgetFiltersDto": {
    "type": "object",
    "properties": {
        "ids": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "search": {
            "type": "string",
            "description": "Free text search"
        }
    }
}
```

## Implementation Notes

1. Filtering:

- Use query parameters with style: "deepObject"
- Support multiple filter criteria
- Allow search across fields
- Consider adding enum filters where appropriate

2. Sorting:

- Use order parameter with +/- prefix
- Support multiple fields
- Format: "+field" for ascending, "-field" for descending
- Allow comma-separated values (e.g., "+createdAt,-name")

3. Relations and Resource Nesting:

- Include foreign keys using camelCase (e.g., boardId)
- Nest related resources in GET responses when they're commonly used together:
  ```json
  // GET /api/columns/{id}
  {
      "id": "uuid",
      "name": "In Progress",
      "tasks": [
          {
              "id": "uuid",
              "title": "Implement auth",
              "description": "...",
              "columnId": "uuid"
          }
      ]
  }
  ```
- Common scenarios where nesting makes sense:
  - Parent-child relationships (e.g., columns with their tasks)
  - Aggregated views (e.g., board with columns and tasks)
  - When child data is always shown with parent
  - When reducing API calls improves UX

4. Access Control:

- Use x-acl for defining permissions
- Example:
  ```json
  "x-acl": [
      {
          "subject": "resource",
          "action": "read"
      }
  ]
  ```
