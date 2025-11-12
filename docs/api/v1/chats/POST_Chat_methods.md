# Chat Methods from API

## POST Start or fetch chat between current user and another user

### URL

```
    https://portavoz.onrender.com/api/v1/chats/start
```

### BODY

```
    otherUserId: string (required)
```

### HEADERS

```
    Authorization: Bearer (current user token)
    Content-Type: application/json
```

### RETURN

```
    chatId: string
```
