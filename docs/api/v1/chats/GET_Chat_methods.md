# Chat Methods from API

## GET Chats (list of current user's chats)

### URL

```
    https://portavoz.onrender.com/api/v1/chats?page={number}
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
    chats: [
        {
            id: string
            participants: [
                {
                    id: string
                    username: string
                    image?: string
                }
            ]
            lastMessageAt: string
        }
    ]
    hasMore: boolean
```

## GET Chat by ID

### URL

```
    https://portavoz.onrender.com/api/v1/chats/:chatId
```

### HEADERS

```
    Authorization: Bearer (current user token)
```

### RETURN

```
    chat: {
        id: string
        participants: [
            {
                id: string
                username: string
                image?: string
            }
        ]
    }
```

## GET Messages by Chat ID

### URL

```
    https://portavoz.onrender.com/api/v1/chats/:chatId/messages?page={number}
```

Query params:
```
    page: number (optional, pagination)
```

### HEADERS

```
    Authorization: Bearer (current user token)
```

### RETURN

```
    chatId: string
    messages: [
        {
            id: string
            user: string
            content: string
            createdAt: string
        }
    ]
    hasMore: boolean
```
