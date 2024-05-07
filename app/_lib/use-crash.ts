import { useCallback, useState } from 'react';

// util to bring event handler errors into the error boundary to trigger error.js
export function useCrash() {
  const [, setState] = useState();
  return useCallback(
    (err: unknown) =>
      setState(() => {
        throw err;
      }),
    [],
  );
}
