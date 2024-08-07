import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/react';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-5 text-ironstone">
      <h2 className="text-center">
        Oops, this booking type was not found. Please try again or contact
        jacquietattoos.
      </h2>
      <Button className="bg-ironstone text-coconut-cream" as={Link} href="/">
        Home
      </Button>
    </main>
  );
}
