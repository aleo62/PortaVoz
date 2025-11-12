# GET Methods from API

## GET Hashtags (search)

### URL

```
    https://portavoz.onrender.com/api/v1/hashtags?hashtag={query}
```

Query params:
```
    hashtag: string (optional, search query)
```

### BODY

No Body

### HEADERS

```
    Authorization: Bearer (current user token) - Not required
```

### RETURN

```
    hashtags: [
        {
            id: string
            content: string
            usageCount: number
        }
    ]
```

