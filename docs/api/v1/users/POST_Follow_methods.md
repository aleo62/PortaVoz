# Follow Methods from API

## GET Following (does current user follow target?)

### URL

```
    https://portavoz.onrender.com/api/v1/users/:followingId/following
```

### BODY

No Body

### HEADERS

```
    Authorization: Bearer (current user token)
```

### RETURN

```
    following: boolean
```

## POST Follow user

### URL

```
    https://portavoz.onrender.com/api/v1/users/:followingId/follow
```

### BODY

No Body

### HEADERS

```
    Authorization: Bearer (current user token)
```

### RETURN

```
    message: "Followed successfully"
```

## DELETE Unfollow user

### URL

```
    https://portavoz.onrender.com/api/v1/users/:unfollowId/unfollow
```

### BODY

No Body

### HEADERS

```
    Authorization: Bearer (current user token)
```

### RETURN

```
    message: "Unfollowed successfully"
```
