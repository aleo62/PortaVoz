# Notifications Methods from API

## GET Notifications of user

### URL

```
    https://portavoz.onrender.com/api/v1/users/:userId/notifications
```

### BODY

No Body

### HEADERS

```
    Authorization: Bearer (current user token)
```

### RETURN

```
    notifications: [
        {
            id: string
            type: string
            message: string
            createdAt: string
            read: boolean
        }
    ]
```
