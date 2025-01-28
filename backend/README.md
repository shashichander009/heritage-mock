
# Documentation for Heritage

This documentation provides an overview of the API endpoints and their functionalities for a Heritage Project built using Django and Django REST Framework. The API allows users to perform actions such as logging in, creating posts, liking posts, following users, and more.

---

## Table of Contents

1. **Authentication**
   - [Login](#login)
   - [Logout](#logout)

2. **User Management**
   - [Create/Update/Delete User](#user-management)
   - [Update Password](#update-password)

3. **Post Management**
   - [Create/Update/Delete Post](#post-management)
   - [Like/Unlike Post](#like-unlike-post)
   - [Bookmark/Remove Bookmark](#bookmark-remove-bookmark)
   - [Report/Remove Report](#report-remove-report)

4. **Follow Management**
   - [Follow/Unfollow User](#follow-unfollow-user)
   - [Get Followers](#get-followers)
   - [Get Followings](#get-followings)

5. **Search and Suggestions**
   - [Search Users and Posts](#search-users-and-posts)
   - [Get User Suggestions](#get-user-suggestions)

6. **Profile and Timeline**
   - [Get User Profile](#get-user-profile)
   - [Get Timeline Status](#get-timeline-status)
   - [Get Trending Topics](#get-trending-topics)
   - [Get Bookmarks](#get-bookmarks)
   - [Get Liked Posts](#get-liked-posts)

---

## 1. Authentication

### Login
**Endpoint:** `/api/login/`  
**Method:** `POST`  
**Description:** Authenticates a user and returns JWT tokens.  
**Request Body:**
```json
{
  "username": "user123",
  "password": "password123"
}
```
**Response:**
```json
{
  "refresh": "refresh_token",
  "access": "access_token",
  "is_first_login": true
}
```

### Logout
**Endpoint:** `/api/logout/`  
**Method:** `POST`  
**Description:** Logs out the currently authenticated user.  
**Response:**
```json
{
  "detail": "Logout Successful"
}
```

---

## 2. User Management

### Create/Update/Delete User
**Endpoint:** `/api/user/`  
**Methods:** `GET`, `POST`, `PATCH`, `DELETE`  
**Permissions:** `IsAuthenticated` or `UserViewPermission`  
**Description:**  
- **GET:** Checks if a username or email is available.  
- **POST:** Creates a new user.  
- **PATCH:** Updates the authenticated user's details.  
- **DELETE:** Deletes the authenticated user.  

**Request Body (POST):**
```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (POST):**
```json
{
  "detail": "User Created"
}
```

### Update Password
**Endpoint:** `/api/update_password/`  
**Method:** `POST`  
**Description:** Updates the user's password using security questions.  
**Request Body:**
```json
{
  "email": "user@example.com",
  "date_of_birth": "1990-01-01",
  "security_que": "What is your pet's name?",
  "security_ans": "Fluffy",
  "new_password": "newpassword123"
}
```

**Response:**
```json
{
  "detail": "Password Updated"
}
```

---

## 3. Post Management

### Create/Update/Delete Post
**Endpoint:** `/api/post/`  
**Methods:** `GET`, `POST`  
**Permissions:** `IsAuthenticated`  
**Description:**  
- **GET:** Fetches the timeline of posts for the authenticated user.  
- **POST:** Creates a new post.  

**Request Body (POST):**
```json
{
  "content": "This is a new post!",
  "has_media": "true"
}
```

**Response (POST):**
```json
{
  "detail": "Post Created"
}
```

### Like/Unlike Post
**Endpoint:** `/api/like_post/<post_id>/`  
**Method:** `POST`  
**Permissions:** `IsAuthenticated`  
**Description:** Likes or unlikes a post.  
**Response:**
```json
{
  "detail": "Like Added"
}
```

### Bookmark/Remove Bookmark
**Endpoint:** `/api/bookmark_post/<post_id>/`  
**Method:** `POST`  
**Permissions:** `IsAuthenticated`  
**Description:** Bookmarks or removes a bookmark from a post.  
**Response:**
```json
{
  "detail": "Bookmark Added"
}
```

### Report/Remove Report
**Endpoint:** `/api/report_post/<post_id>/`  
**Method:** `POST`  
**Permissions:** `IsAuthenticated`  
**Description:** Reports or removes a report from a post.  
**Request Body:**
```json
{
  "remarks": "This post is inappropriate."
}
```

**Response:**
```json
{
  "detail": "Report Added"
}
```

---

## 4. Follow Management

### Follow/Unfollow User
**Endpoint:** `/api/follow/<user_id>/`  
**Method:** `POST`  
**Permissions:** `IsAuthenticated`  
**Description:** Follows or unfollows a user.  
**Response:**
```json
{
  "detail": "Started Following"
}
```

### Get Followers
**Endpoint:** `/api/followers/`  
**Method:** `GET`  
**Permissions:** `IsAuthenticated`  
**Description:** Fetches the list of followers for a user.  
**Response:**
```json
{
  "followers": [
    {
      "user_id": 1,
      "name": "John Doe",
      "username": "johndoe",
      "profile_picture": "url_to_image",
      "bio": "Hello, I'm John!",
      "followers": 100,
      "following": 50,
      "is_own_id": false,
      "is_following": true
    }
  ]
}
```

### Get Followings
**Endpoint:** `/api/followings/`  
**Method:** `GET`  
**Permissions:** `IsAuthenticated`  
**Description:** Fetches the list of users that the authenticated user is following.  
**Response:**
```json
{
  "followings": [
    {
      "user_id": 2,
      "name": "Jane Doe",
      "username": "janedoe",
      "profile_picture": "url_to_image",
      "bio": "Hello, I'm Jane!",
      "followers": 200,
      "following": 100,
      "is_own_id": false,
      "is_following": true
    }
  ]
}
```

---

## 5. Search and Suggestions

### Search Users and Posts
**Endpoint:** `/api/search/`  
**Method:** `GET`  
**Permissions:** `IsAuthenticated`  
**Description:** Searches for users and posts based on a query parameter.  
**Query Parameters:** `param` (search term)  
**Response:**
```json
{
  "user_search_result": [
    {
      "user_id": 1,
      "name": "John Doe",
      "username": "johndoe",
      "profile_picture": "url_to_image",
      "bio": "Hello, I'm John!",
      "followers": 100,
      "following": 50,
      "is_own_id": false,
      "is_following": true
    }
  ],
  "post_search_result": [
    {
      "name": "John Doe",
      "username": "johndoe",
      "profile_picture": "url_to_image",
      "post_id": 1,
      "content": "This is a post!",
      "sentiment": "positive",
      "has_media": true,
      "image": "url_to_image",
      "created_at": "2023-10-01T12:00:00Z",
      "likes_count": 10,
      "is_liked": true,
      "is_bookmarked": false,
      "user_id": 1,
      "is_owner": false
    }
  ]
}
```

### Get User Suggestions
**Endpoint:** `/api/suggestions/`  
**Method:** `GET`  
**Permissions:** `IsAuthenticated`  
**Description:** Fetches a list of suggested users to follow.  
**Query Parameters:** `items` (number of suggestions to return)  
**Response:**
```json
{
  "suggestions": [
    {
      "user_id": 3,
      "name": "Alice",
      "username": "alice",
      "profile_picture": "url_to_image",
      "bio": "Hello, I'm Alice!",
      "followers": 50,
      "following": 20,
      "is_own_id": false,
      "is_following": false
    }
  ]
}
```

---

## 6. Profile and Timeline

### Get User Profile
**Endpoint:** `/api/profile/`  
**Method:** `GET`  
**Permissions:** `IsAuthenticated`  
**Description:** Fetches the profile details and posts of a user.  
**Query Parameters:** `user_id` (optional, defaults to authenticated user)  
**Response:**
```json
{
  "profile": {
    "user_id": 1,
    "name": "John Doe",
    "username": "johndoe",
    "profile_picture": "url_to_image",
    "bio": "Hello, I'm John!",
    "followers": 100,
    "following": 50,
    "is_own_id": true,
    "is_following": false
  },
  "posts": [
    {
      "name": "John Doe",
      "username": "johndoe",
      "profile_picture": "url_to_image",
      "post_id": 1,
      "content": "This is a post!",
      "sentiment": "positive",
      "has_media": true,
      "image": "url_to_image",
      "created_at": "2023-10-01T12:00:00Z",
      "likes_count": 10,
      "is_liked": true,
      "is_bookmarked": false,
      "user_id": 1,
      "is_owner": true
    }
  ]
}
```

### Get Timeline Status
**Endpoint:** `/api/timeline_status/`  
**Method:** `GET`  
**Permissions:** `IsAuthenticated`  
**Description:** Checks for new posts and notifications since the last request.  
**Response:**
```json
{
  "has_new_post": true,
  "has_new_notification": true,
  "notifications": [
    "Alice (@alice) Started Following You",
    "Bob (@bob) Liked Your Post"
  ]
}
```

### Get Trending Topics
**Endpoint:** `/api/trending/`  
**Method:** `GET`  
**Permissions:** `IsAuthenticated`  
**Description:** Fetches the top 10 trending hashtags and words from posts in the last 3 days.  
**Response:**
```json
{
  "trending": ["#Django", "#Python", "AI"]
}
```

### Get Bookmarks
**Endpoint:** `/api/bookmarks/`  
**Method:** `GET`  
**Permissions:** `IsAuthenticated`  
**Description:** Fetches all bookmarked posts by the authenticated user.  
**Response:**
```json
{
  "bookmarked_posts": [
    {
      "name": "John Doe",
      "username": "johndoe",
      "profile_picture": "url_to_image",
      "post_id": 1,
      "content": "This is a post!",
      "sentiment": "positive",
      "has_media": true,
      "image": "url_to_image",
      "created_at": "2023-10-01T12:00:00Z",
      "likes_count": 10,
      "is_liked": true,
      "is_bookmarked": true,
      "user_id": 1,
      "is_owner": false
    }
  ]
}
```

### Get Liked Posts
**Endpoint:** `/api/likes/`  
**Method:** `GET`  
**Permissions:** `IsAuthenticated`  
**Description:** Fetches all posts liked by a user.  
**Query Parameters:** `user_id` (optional, defaults to authenticated user)  
**Response:**
```json
{
  "liked_posts": [
    {
      "name": "John Doe",
      "username": "johndoe",
      "profile_picture": "url_to_image",
      "post_id": 1,
      "content": "This is a post!",
      "sentiment": "positive",
      "has_media": true,
      "image": "url_to_image",
      "created_at": "2023-10-01T12:00:00Z",
      "likes_count": 10,
      "is_liked": true,
      "is_bookmarked": false,
      "user_id": 1,
      "is_owner": false
    }
  ]
}
```

---

This documentation provides a comprehensive guide to the API endpoints and their functionalities. For further details, refer to the source code or contact the development team