'use client';
import { Button } from '@nextui-org/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center gap-5 text-ironstone">
      <h2 className="text-center">
        Oops, something went wrong! Please try again now or a little bit later.
        Alternatively, try my{' '}
        <a
          className="text-porsche hover:underline"
          href="https://forms.gle/6DqWrhELYcgvMByF6"
          target="__blank"
        >
          google form
        </a>{' '}
        instead.
      </h2>
      <Button
        className="bg-ironstone text-coconut-cream"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </Button>
    </main>
  );
}
