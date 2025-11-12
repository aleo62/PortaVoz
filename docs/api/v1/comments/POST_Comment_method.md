# POST Methods from API

## POST Create Comment

### URL

```
    https://portavoz.onrender.com/api/v1/posts/comments
```

‎

### BODY

```
    parentId: string (required)
    content: string (required)
```

‎

### HEADERS

```
    Authorization: Bearer (current user token)
    Content-Type: application/json
```

‎

### RETURN

```
    message: "New comment created"
    data: {
        id: string
        parentId: string
        parentType: "Post" | "Comment"
        content: string
        user: string
        createdAt: string
    }
```
