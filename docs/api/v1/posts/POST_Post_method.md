# POST Methods from API

## POST Create

### URL

```
    https://portavoz.onrender.com/api/v1/posts
```

‎

### BODY

```
    title: string (required)
    desc: string (required)
    hashtags: string[] (required)
    location: {
        latitude: number (required, -90 to 90)
        longitude: number (required, -180 to 180)
    }
    address: string (required)
    status: "ativo" | "resolvido" | "oculto" (optional, default: "ativo")
    images: File[] (optional, up to 3 files)
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
    message: "New post created"
    data: <PostType>{}
```

See: [PostType](MODEL_Post_method.md)
