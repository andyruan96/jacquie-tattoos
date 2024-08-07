import { Button, Link } from '@nextui-org/react';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center md:flex-row">
        <Image
          src="/artist.jpg"
          alt="Picture of the artist, Jacquie-Tattoos"
          width="0"
          height="0"
          sizes="100vw"
          className="h-[500px] w-full object-cover md:h-auto md:max-w-xl md:rounded-lg"
        />
        <div className="flex h-full flex-col gap-4 bg-porsche p-10 text-sm text-coconut-cream md:-ml-20 md:mr-20 md:mt-20 md:max-w-lg md:max-w-xl md:rounded-3xl">
          <h3 className="text-lg font-bold text-raw-sienna-dark">
            JACQUIETATTOOS
          </h3>
          <p>
            A tattoo artist based in Vancouver, Canada. Jacquie’s style can be
            described as illustrative black work, strongly influenced by anime
            and fine-line tattoo artists.
          </p>
          <p>
            Favourite tattoo subjects include florals, anime-related tattoos,
            and all things cute/spooky.
          </p>
          <p>Established in 2019.</p>
          <Button
            radius="sm"
            className="bg-ironstone font-bold text-coconut-cream md:w-48"
            as={Link}
            href="/booking"
          >
            BOOK NOW
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center md:mt-10 md:flex-row">
        <div className="md:w- m-10 md:max-w-sm">
          <div className="flex flex-col gap-4 text-gray-600">
            <h3 className="text-4xl font-bold text-porsche">
              Hobby Illustrator
            </h3>
            <p className="text-ironstone">
              On top of tattooing, Jacquie dabbles in character illustration as
              a stress outlet from tattoo art. She likes to make stickers,
              prints and other small merch on the side.
            </p>
            <p>All illustrations are published under the pseudonym ’xaint’.</p>
            <Button
              radius="sm"
              className="mt-8 flex-initial bg-black bg-porsche text-sm font-bold text-ironstone md:w-48"
              as={Link}
              href="https://www.instagram.com/xaintjpg/"
              target="__blank"
            >
              ART INSTAGRAM
            </Button>
          </div>
        </div>
        <Image
          src="/hobby_illustrator.jpeg"
          alt="Example of an illustration by Jacquie-Tattoos"
          width="0"
          height="0"
          sizes="100vw"
          className="h-[500px] w-full object-cover md:h-auto md:w-2/3 md:max-w-xl md:rounded-lg"
        />
      </div>
    </>
  );
}
