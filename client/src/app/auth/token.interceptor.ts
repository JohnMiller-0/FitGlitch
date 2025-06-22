import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';

/**
 * Token interceptor that attaches a JWT to outgoing HTTP requests
 * unless the request explicitly opts out using the `Skip-Auth` header.
 *
 * This interceptor:
 * - Looks for a `Skip-Auth` header to bypass token injection
 * - Retrieves a JWT from browser storage (key: 'fG-token')
 * - Attaches the JWT as a Bearer token in the `Authorization` header
 *
 * @param req - The outgoing HTTP request
 * @param next - The next handler in the interceptor chain
 * @returns An Observable of the handled HTTP event
 */
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storage: Storage = inject(BROWSER_STORAGE);
  const shouldSkip = req.headers.get('Skip-Auth');

  // Skip attaching token if explicitly marked
  if (shouldSkip) {
    // Clone request without the 'Skip-Auth' header
    // to prevent it from being sent to the server
    // This is useful for requests that do not require authentication
    // This allows the interceptor to be used flexibly
    const stripped = req.clone({
      headers: req.headers.delete('Skip-Auth') // Remove control header before sending
    });
    return next(stripped); // Forward unmodified request
  }

  const token = storage.getItem('fG-token');

  // Attach token if present
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned); // Forward request with token
  } else {
    return next(req); // Forward request as-is if no token found
  }
};