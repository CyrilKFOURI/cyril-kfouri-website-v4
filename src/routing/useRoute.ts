import { useCallback, useEffect, useRef, useState } from 'react';

// The site is one page. An open dialog is that page plus one extra history entry:
//
//   open   -> pushState      (Back and the phone back gesture close the dialog)
//   close  -> history.back() (the entry is consumed, so Back on the home page never reopens it)
//
// A dialog reached from a shared link has no entry of ours underneath, so closing it
// rewrites the URL to "/" instead of going back and leaving the site.

export type Route =
  | { name: 'home' }
  | { name: 'project'; slug: string }
  | { name: 'experience'; id: string };

const HOME: Route = { name: 'home' };

// Marks the history entries this app pushed, so close() knows a home entry sits underneath.
const PUSHED_BY_APP = { dialog: true } as const;

const decode = (value: string): string => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const parseRoute = (pathname: string): Route => {
  const [section, key] = pathname.split('/').filter(Boolean);
  if (!section || !key) return HOME;
  if (section === 'projects') return { name: 'project', slug: decode(key) };
  if (section === 'experience') return { name: 'experience', id: decode(key) };
  return HOME;
};

const toPath = (route: Route): string => {
  if (route.name === 'project') return `/projects/${encodeURIComponent(route.slug)}`;
  if (route.name === 'experience') return `/experience/${encodeURIComponent(route.id)}`;
  return '/';
};

const currentEntryWasPushedByApp = (): boolean =>
  Boolean((window.history.state as { dialog?: boolean } | null)?.dialog);

export const useRoute = () => {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.pathname));

  // history.back() is asynchronous. Until its popstate arrives, a second close must not
  // go back again (it would leave the site), and an open must wait for the entry to be gone.
  const isGoingBack = useRef(false);
  const openAfterBack = useRef<Route | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      isGoingBack.current = false;
      const queued = openAfterBack.current;
      openAfterBack.current = null;
      if (queued) {
        window.history.pushState(PUSHED_BY_APP, '', toPath(queued));
        setRoute(queued);
        return;
      }
      setRoute(parseRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  /** Open a dialog from the home page. */
  const open = useCallback((next: Route) => {
    if (isGoingBack.current) {
      openAfterBack.current = next;
      return;
    }
    if (parseRoute(window.location.pathname).name === 'home') {
      window.history.pushState(PUSHED_BY_APP, '', toPath(next));
    } else {
      window.history.replaceState(window.history.state, '', toPath(next));
    }
    setRoute(next);
  }, []);

  /** Close the dialog and land on the home page. */
  const close = useCallback(() => {
    if (isGoingBack.current) return;
    if (currentEntryWasPushedByApp()) {
      isGoingBack.current = true;
      window.history.back();
    } else {
      window.history.replaceState(null, '', '/');
    }
    setRoute(HOME);
  }, []);

  /** Correct a URL that points at nothing (unknown slug). */
  const redirectHome = useCallback(() => {
    window.history.replaceState(null, '', '/');
    setRoute(HOME);
  }, []);

  return { route, open, close, redirectHome };
};
