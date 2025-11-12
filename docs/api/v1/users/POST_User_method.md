# POST Methods from API

## POST Create User (propagate profile updates)

### URL

```
    https://portavoz.onrender.com/api/v1/users/auth/
```

### BODY

```
    fName: string (required)
    lName: string (required)
    image: string (optional, URL)
```

### HEADERS

```
    Authorization: Bearer (current user token)
    Content-Type: application/json
```

### RETURN

```
    user: {
        id: string
        username: string
        fName: string
        lName: string
        image?: string
        email: string
    }
```
