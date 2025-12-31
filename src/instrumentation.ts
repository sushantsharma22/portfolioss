// Web Vitals reporting for performance monitoring
// This file is automatically picked up by Next.js

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side instrumentation can go here
  }
}

export function onRequestError(
  error: { digest: string } & Error,
  request: {
    path: string;
    method: string;
    headers: { [key: string]: string };
  },
  context: {
    routerKind: 'Pages Router' | 'App Router';
    routePath: string;
    routeType: 'render' | 'route' | 'action' | 'middleware';
    renderSource: 'react-server-components' | 'react-server-components-payload' | 'server-rendering';
    revalidateReason: 'on-demand' | 'stale' | undefined;
    renderType: 'dynamic' | 'dynamic-resume';
  }
) {
  // Log errors in production
  console.error('Request Error:', {
    digest: error.digest,
    message: error.message,
    path: request.path,
    routePath: context.routePath,
  });
}
