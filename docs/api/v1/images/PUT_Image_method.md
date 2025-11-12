# PUT Methods from API

## PUT Update Image

### URL

```
    https://portavoz.onrender.com/api/v1/images?url={old_image_url}
```

‎

### BODY

```
    image: File (required, new image file)
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
    message: "Image Deleted and Uploaded Successfully"
    url: string
```
