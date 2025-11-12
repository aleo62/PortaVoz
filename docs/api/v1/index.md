# API v1 Overview

- **Base URL**: `https://portavoz.onrender.com/api/v1`
- **Auth**: Bearer token required for most routes (except GET /hashtags)

## Resources

### Root
- `GET /` - API status check

### Posts
- `GET /posts?page={number}` - Get all posts (paginated)
- `GET /posts/:postId` - Get post by ID
- `POST /posts` - Create new post (requires verified user, multipart/form-data)
- `PUT /posts/:postId` - Update post (requires verified user, owner or admin, multipart/form-data)
- `DELETE /posts/:postId` - Delete post (requires verified user, owner or admin)

### Comments
- `GET /posts/:parentId/comments?page={number}` - Get comments by parent ID (paginated)
- `POST /posts/comments` - Create comment (requires verified user)
- `PUT /posts/comments/:commentId` - Update comment (requires verified user, owner or admin)
- `DELETE /posts/comments/:commentId` - Delete comment (requires owner or admin)
- `DELETE /posts/comments/parent/:parentId` - Delete all comments by parent (requires verified user, owner or admin)

### Votes
- `POST /posts/:parentId/upvote` - Create upvote (requires verified user)
- `DELETE /posts/:parentId/desupvote` - Delete upvote (requires verified user)

### Images
- `POST /images` - Upload image
- `PUT /images?url=...` - Update image
- `DELETE /images?url=...` - Delete image

### Users
- `GET /users?name={query}&page={number}` - Search users by name (paginated)
- `GET /users/:userId` - Get user by ID
- `GET /users/:userId/posts` - Get posts by user ID
- `GET /users/:userId/remaining-reports` - Get remaining reports (requires owner or admin)
- `POST /users/auth/` - Create user
- `PUT /users/:userId` - Update user (requires owner or admin, multipart/form-data)
- `GET /users/:userId/notifications` - Get user notifications (requires owner or admin)
- `GET /users/:followingId/following` - Check if following user
- `POST /users/:followingId/follow` - Follow user
- `DELETE /users/:unfollowId/unfollow` - Unfollow user

### Chats
- `GET /chats?page={number}` - Get user's chats (requires verified user, paginated)
- `GET /chats/:chatId` - Get chat by ID (requires verified user, owner)
- `GET /chats/:chatId/messages?page={number}` - Get messages by chat ID (requires verified user, owner, paginated)
- `POST /chats/start` - Start or fetch chat between users (requires verified user)

### Hashtags
- `GET /hashtags?hashtag={query}` - Search hashtags (no auth required)

### Validate
- `POST /validate/:stage` - Validate post by stage (stages: `content`, `images`, `hashtags`, multipart/form-data)

## Conventions

- **Pagination**: `page` query param on list endpoints that support it
- **Content types**:
  - JSON: `application/json`
  - File uploads: `multipart/form-data`
- **Authentication**: Most routes require `Authorization: Bearer {token}` header
- **Verified users**: Some routes require verified user status
- **Owner/Admin**: Some routes require ownership or admin privileges
- **Common responses**: Include `message` and resource payloads when applicable
- **Error format**: `{ code: string, message: string, errors: string[] }`
