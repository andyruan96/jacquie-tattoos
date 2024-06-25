'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { Button } from '@nextui-org/button';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en">
      <body className={inter.className}>
        <main className="flex h-screen flex-col items-center justify-center gap-5">
          <h2 className="text-center">
            Oops, something went wrong! Please try again now or a little bit
            later.
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
      </body>
    </html>
  );
}
