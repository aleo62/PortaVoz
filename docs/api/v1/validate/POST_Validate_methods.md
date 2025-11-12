# Validate Methods from API

Validação por etapas para criação de post. Use `:stage` como um destes valores: `content`, `images`, `hashtags`.

## POST Validate by stage

### URL

```
    https://portavoz.onrender.com/api/v1/validate/:stage
```

### BODY

Para `content`:

```
    title: string (required)
    desc: string (required)
```

Para `images` (envie também arquivos):

```
    title: string (required)
    desc: string (required)
    images?: File[] (até 3 arquivos)
```

Para `hashtags`:

```
    title: string (required)
    desc: string (required)
    hashtags: string[] (required)
```

### HEADERS

```
    Content-Type: multipart/form-data
```

### RETURN

```
    valid: boolean
    errors?: { field: string; message: string }[]
    suggestions?: string[]
```
