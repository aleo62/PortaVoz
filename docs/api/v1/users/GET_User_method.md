# GET Methods from API

## GET Users by name

### URL

```
    https://portavoz.onrender.com/api/v1/users?name={query}
```

### BODY

No Body

### HEADERS

```
    Authorization: Bearer (current user token)
```

### RETURN

```
    users: [
        {
            id: string
            username: string
            fName: string
            lName: string
            image?: string
        }
    ]
    hasMore: boolean
    count: number
```

## GET User by ID

### URL

```
    https://portavoz.onrender.com/api/v1/users/:userId
```

### BODY

No Body

### HEADERS

```
    Authorization: Bearer (current user token)
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
        meta: {
            counters: {
                following: number
                followers: number
            }
        }
    }
    isFollowing: boolean
```

## GET Posts by User ID

### URL

```
    https://portavoz.onrender.com/api/v1/users/:userId/posts
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
```

See: [PostType](../posts/MODEL_Post_method.md)

## GET Remaining Reports

### URL

```
    https://portavoz.onrender.com/api/v1/users/:userId/remaining-reports
```

### BODY

No Body

### HEADERS

```
    Authorization: Bearer (current user token)
```

### RETURN

```
    canReport: boolean
    remaining: number
    resetAt: string (ISO date)
```
