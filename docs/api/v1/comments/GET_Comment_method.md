# GET Methods from API

## GET Comments by Parent ID

### URL

```
    https://portavoz.onrender.com/api/v1/posts/:parentId/comments?page={number}
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
    comments: [
        {
            id: string
            parentId: string
            parentType: "Post" | "Comment"
            content: string
            user: {
                id: string
                username: string
                image?: string
            }
            repliesCount: number
            isUpvoted: boolean
            createdAt: string
        }
    ]
    hasMore: boolean
```

