# Networks

## Cache Directives

Allows you to control resource caches via default browser's mechanism.

### Cache-Control 

`no-cache` - Even it's still fresh, validates a cached resource with a origin server via `E-Tag`before using it. It sends a request for validation and if the response if `304` (No Modified), it doesn't download it again.

`must-revalidate` - Validates a stale response with the origin server before using it.

`no-store` - Doesn't cache anything. Good for sensitive data.

`private` - Prevents caching on intermediary agents, such as CDNs or proxy.

`stale-while-revalidate` - Stales content.

### E-Tag

`E-Tag` - unique identifier, sort of cache sum of the file.

### Max-age

This directive dictates the time to live, in other words how many seconds a resource can be served from cache after it's been downloaded. For example, if the max age is set to 1800, this means that for 1,800 seconds (30 minutes) after the resource was first requested from the server, the user will be served a cached version of that resource on subsequent requests. If the user requests the resource again after that 30 minutes has expired, the client will have to request a fresh copy from the origin server.

(source: [CloudFlare](https://www.cloudflare.com/learning/cdn/glossary/what-is-cache-control/))
