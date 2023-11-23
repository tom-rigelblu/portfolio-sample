// Copyright rigélblu inc. All rights reserved.
import { useRouter as useNextRouter } from 'next/router';

export function useRouter() {
  const router = useNextRouter();

  return {
    replaceRoute: (routeUrl: string, component = '') => {
      router.replace(routeUrl).catch((error) => {
        // REFACTOR: move logger to base-lib
        // eslint-disable-next-line no-console
        console.error(`${component}: error replacing routeUrl: ${String(error)}`);
      });
    },

    pushRoute: (routeUrl: string, component = '') => {
      router.push(routeUrl).catch((error) => {
        // REFACTOR: move logger to base-lib
        // eslint-disable-next-line no-console
        console.error(`${component}: error pushing routeUrl: ${String(error)}`);
      });
    },
  };
}
