'use client';
import { useEffect, useState } from 'react';

const getHash = () =>
  typeof window !== 'undefined'
    ? decodeURIComponent(window.location.hash.replace('#', ''))
    : undefined;

const useHash = () => {
  const [hash, setHash] = useState(getHash());

  useEffect(() => {
    const handleHashChange = () => {
      // current use case only cares about the first hash
      if (!hash) {
        setHash(getHash());
        window.removeEventListener('hashchange', handleHashChange);
      }
    };
    handleHashChange(); // checks the first hash before any changes are detected
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [hash]);

  return hash;
};

export default useHash;
