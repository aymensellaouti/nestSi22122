import { RequestDurationInterceptor } from './request-duration.interceptor';

describe('RequestDurationInterceptor', () => {
  it('should be defined', () => {
    expect(new RequestDurationInterceptor()).toBeDefined();
  });
});
