
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Adds page-home / page-<route> and body-inner classes to body.
 */
function BodyClassManager() {
  const pathname = usePathname();

  useEffect(() => {
    const isHome = pathname === '/';

    // Remove leading and trailing slashes
    const cleanPath = pathname
      .replace(/^\/+|\/+$/g, '')
      .replace(/\//g, '-')
      .toLowerCase();

    // Generate page class
    const pathClass = isHome
      ? 'page-home'
      : `page-${cleanPath}`;

    const innerPageClass = 'body-inner';

    // Add classes
    document.body.classList.add(pathClass);

    if (!isHome) {
      document.body.classList.add(innerPageClass);
    }

    // Cleanup previous page classes
    return () => {
      document.body.classList.remove(pathClass);
      document.body.classList.remove(innerPageClass);
    };

  }, [pathname]);

  return null;
}

export default BodyClassManager;
