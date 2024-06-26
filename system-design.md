# Frontend System Design

This document contains a template, along with general questions and approaches, which can serve as a solid foundation for the answer. Naturally, it can be combined with specific details related to a particular question.

## Requirements Clarification

### Functional Requirements

1. What features should be supported?
2. Will the application be used on mobile devices?
3. What will the pages be on website?
4. What are the user's regions?
5. Must users be logged in?
6. What pagination UX should be used for the feed?

### Non-functional Requirements

1. Do we have SEO requirements? Should the website be easily discoverable by search engines?
2. What are the accessibility (a11y) requirements?
3. Should we support low-end devices?
4. Should we support low internet connections?

## Architecture / High-level Design

### Data Storage

#### Cookies

Pros:

1. Has expire date
2. More secure. Some configuration can block access from JavaScript

Cons:

1. Only 4kb per domain

#### Local Storage

Pros:

1. Easy to use

Cons:

1. Serialization / deserialization overhead
2. Limited to 10 MB

#### IndexedDB

Pros:

1. Supports structured data
2. Has indexes, cursors, etc.

Cons:

1. Not yet mature. Has unsolved bugs

### Real-Time Updates

#### SSE

Pros:

1. Can work over https
2. Simple to implement
3. Automatic reconnection
4. Ordering out-of-the-box
5. Use Authentication and headers

Cons:

1. Supports only text
2. 1-directional

#### WebSocket

Pros:

1. bi-directional
2. Supports blob and large data

Cons:

1. Don't have reconnection out-of-the-box
2. Don't have ordering out-of-the-box

#### Long Polling

Pros:

1. Supported everywhere (100% comparing to 97% for other approaches)

Cons:

1. Establishing connection overhead 

#### Short Polling

Pros:

1. Simple to implement. Can be used as POC

Cons:

1. Latency for fresh updates
2. Establishing connection overhead 

### Rendering Approach

Based on our requirements, we have five different options to choose from.

![Rendering Approaches](.github/images/rendering-approaches.png)
image source: [web.dev](https://web.dev/articles/rendering-on-the-web)

## Data model

Will be individual for each case.

## Interface Definition / API

### Backend

#### API Design

1. Follow the correct naming convention
2. Follow the correct query params convention
   
[Read more about it](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design)

#### Pagination Approaches

1. Page + Limit page approach
2. Cursor-based approach: better for real-time feeds such as social network posts

### Frontend Components

#### Customization

1. Consider component composition. For instance, for `Select` component allow consumers to pass a custom `SelectOption` via **component prop** or **render prop**.

    ```jsx
    <Select Option={CustomOption} />
    ```

    ```jsx
    <Select renderOption={(option) => <CustomOption {...option}>} />
    ```

#### Style Customization

1. Classes overrides for each component
2. CSS Variables

## Optimizations

1. [Performance](https://github.com/Danilqa/web-performance-handbook)

## UX

1. [Form's UX](https://evilmartians.com/chronicles/html-best-practices-for-login-and-signup-forms)
2. Optimistic updates

## A11y

1. Keyboard navigation and shortcuts
2. Using `rem` instead of `px` to support the scaled version
3. Area label tag to screen readers

## Security

[OWASP - Big resource about security](https://owasp.org/)

### XSS

When a hacker inject some JavaScript to the website. It can take sensitive data from local / session storage, session storage or not only http cookies.

**How to prevent?**

Don't store sensitive data in web storages.

### CSRF

When your cookie with authentication token is sent to unsafe site. 

**How to prevent?**

Use `SameSite` flag and `HttpOnly`.
