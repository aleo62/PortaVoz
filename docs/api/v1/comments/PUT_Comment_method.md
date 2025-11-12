# PUT Methods from API

## PUT Update Comment

### URL

```
    https://portavoz.onrender.com/api/v1/posts/comments/:commentId
```

‎

### BODY

```
    userName: string (optional, cannot be empty)
    userImage: string (optional, cannot be empty)
    content: string (optional, cannot be empty)
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
    message: "Comment updated"
    data: <CommentType>{}
```

<[CommentType](MODEL_Comment_method.md)> <------ Link
