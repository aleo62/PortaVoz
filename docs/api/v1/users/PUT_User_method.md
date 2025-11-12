# PUT Methods from API

## PUT Update User

### URL

```
    https://portavoz.onrender.com/api/v1/users/:userId
```

### BODY

```
    username: string (optional)
    fName: string (optional)
    lName: string (optional)
    about: string (optional)
    image: File (optional, max 1 file)
    banner: File (optional, max 1 file)
```

### HEADERS

```
    Authorization: Bearer (current user token)
    Content-Type: multipart/form-data
```

### RETURN

```
    user: {
        id: string
        username: string
        fName: string
        lName: string
        image?: string
        banner?: string
        about?: string
    }
```

