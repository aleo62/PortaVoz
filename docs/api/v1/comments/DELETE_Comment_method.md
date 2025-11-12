# DELETE Methods from API

## DELETE Comment

### URL

```
    https://portavoz.onrender.com/api/v1/posts/comments/:commentId
```

‎

### BODY

No Body

‎

### HEADERS

```
    Authorization: Bearer (current user token)
```

‎

### RETURN

```
    message: "Comment deleted"
    data: <CommentType>{}
```

‎

## DELETE Comments by Parent

### URL

```
    https://portavoz.onrender.com/api/v1/posts/comments/parent/:parentId
```

‎

### BODY

No Body

‎

### HEADERS

```
    Authorization: Bearer (current user token)
```

‎

### RETURN

```
    message: "All comments children of {parentId} deleted"
```
