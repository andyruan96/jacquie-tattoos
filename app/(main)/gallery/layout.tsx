import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'See some of Jacquie’s previous pieces of work! Favourite tattoo subjects include florals, anime-related tattoos, and all things cute/spooky.',
};

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
