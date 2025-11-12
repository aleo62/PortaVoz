# PUT Methods from API

## PUT Update Post
### URL
```
    https://portavoz.onrender.com/api/v1/posts/:postId
```

‎ 

### BODY
```
    title: string (optional, max 50 characters)
    desc: string (optional, max 500 characters)
    hashtags: string[] (optional)
    location: {
        latitude: number (optional, -90 to 90)
        longitude: number (optional, -180 to 180)
    }
    address: string (optional)
    status: "ativo" | "resolvido" | "oculto" (optional)
    images: string[] (optional, existing image URLs to keep)
    newImages: File[] (optional, 1-3 new image files)
```

‎ 

### HEADERS
```
    Authorization: Bearer (current user token)
    Content-Type: multipart/form-data
```

‎ 

### RETURN
```
    message: "Post updated"
    data: <PostType>{}
```
<[PostType](MODEL_Post_method.md)> <------ Link 