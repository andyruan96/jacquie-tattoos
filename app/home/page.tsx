import { Button } from '@nextui-org/react';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <div className="flex flex-col justify-center md:flex-row">
        <Image
          src="/artist.jpg"
          alt="Picture of the artist, Jacquie-Tattoos"
          width="0"
          height="0"
          sizes="100vw"
          className="h-[500px] w-full object-cover md:h-auto md:max-w-xl"
        />
        <div className="flex h-full flex-col gap-4 bg-black p-10 text-sm text-gray-400 md:-ml-20 md:mr-20 md:mt-20 md:max-w-lg md:max-w-xl">
          <h3 className="text-lg font-bold text-white">JACQUIETATTOOS</h3>
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
          <Button radius="sm" className="text-md flex-initial bg-white md:w-48">
            BOOK NOW
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center md:mt-10 md:flex-row">
        <div className="md:w- m-10 md:max-w-sm">
          <div className="flex flex-col gap-4 text-gray-600">
            <h3 className="text-4xl text-black">Hobby Illustrator</h3>
            <p>
              On top of tattooing, Jacquie dabbles in character illustration as
              a stress outlet from tattoo art. She likes to make stickers,
              prints and other small merch on the side.
            </p>
            <p>All illustrations are published under the pseudonym ’xaint’.</p>
            <Button
              radius="sm"
              className="mt-8 flex-initial bg-black text-sm text-white md:w-48"
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
          className="h-auto w-full object-contain md:w-2/3 md:max-w-xl"
        />
      </div>
    </div>
  );
}
