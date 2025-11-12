# POST Methods from API

## POST Upload Image

### URL

```
    https://portavoz.onrender.com/api/v1/images
```

‎

### BODY

```
    image: File (required, image file)
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
    message: "Image Uploaded Successfully"
    url: string
```
