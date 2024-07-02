import { notFound } from 'next/navigation';

// Adds a dynamic catch-all route to catch all and in this route you can call notFound. This triggers the closest not-found.tsx.
// Doing this b/c global not-found.tsx does not currently work with multiple root layouts
export default function NotFoundDummy() {
  notFound();
}
