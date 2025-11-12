# GET Methods from API

## GET All Posts
### URL
```
    https://portavoz.onrender.com/api/v1/posts
```
Query params:
```
    page: number (optional, pagination)
```

### BODY
No Body

### HEADERS
```
    Authorization: Bearer (current user token)
```

### RETURN
```
    posts: [
        <PostType>{}
    ]
    hasMore: true | false
    count: number
```
See: [PostType](MODEL_Post_method.md)

## GET Post by ID
### URL
```
    https://portavoz.onrender.com/api/v1/posts/:postId
```

### BODY
No Body

### HEADERS
```
    Authorization: Bearer (current user token)
```

### RETURN
```
    post: <PostType>{}
```
See: [PostType](MODEL_Post_method.md)



