import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <div className="flex">
        <Image
          src="/artist.jpg"
          alt="Picture of the artist, Jacquie-Tattoos"
          width="0"
          height="0"
          sizes="100vw"
          className="h-auto w-full max-w-2xl object-cover"
        />
        <div className="my-20 -ml-20 mr-20 bg-black p-10 text-white">
          <p className="z-10 text-white">
            A tattoo artist based in Vancouver, Canada. Jacquie’s style can be
            described as illustrative black work, strongly influenced by anime
            and fine-line tattoo artists. Favourite tattoo subjects include
            florals, anime-related tattoos, and all things cute/spooky.
            Established in 2019.
          </p>
          <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
