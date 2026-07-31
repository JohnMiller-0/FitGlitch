
import { HttpInterceptorFn } from '@angular/common/http';
import { delay } from 'rxjs/operators';

/**
 * Functional HTTP interceptor that introduces a fixed delay to all outgoing HTTP requests.
 * This interceptor is useful for testing loading states and simulating network latency.
 * @param req 
 * @param next 
 * @returns 
 */
export const delayTestInterceptor: HttpInterceptorFn = (req, next) => 
    next(req).pipe(delay(1000));