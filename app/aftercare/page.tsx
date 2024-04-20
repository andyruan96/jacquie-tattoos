import Image from 'next/image';

export default function Aftercare() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div>
        <h2 className="mb-5 text-2xl font-bold">Aftercare</h2>

        <h3 className="uppercase">✦Second Skin</h3>
        <p className="mb-3">
          Keep on for 3-5 days, but no longer than 5 days. If the second skin
          starts to peel, take off the second skin and give your tattoo a good
          wash.
        </p>
        <p className="mb-5">
          ✦ You can shower with your second skin, but do no submerge your tattoo
          under water while it’s still healing. This means no swimming! No
          pools, beach or lake.
        </p>

        <h3 className="uppercase">✦ Suran Wrap</h3>
        <p className="mb-5">
          If we wrapped your tattoo in suran wrap, take it off once you get home
          and give your tattoo a wash.
        </p>

        <h3 className="uppercase">✦ After bandage is removed</h3>
        <p className="mb-3">
          ✦ Use unscented soap, and aftercare cream/lotion to avoid irritation.
          Any irritation can lead to an infection.
        </p>
        <p className="mb-3">
          ✦ You don’t need to put any aftercare/lotion on the tattoo until it
          scabs over. Too much moisture can slow the healing. Just use a little
          bit if you feel like you need it. Aquaphor’s healing ointment is my
          recommended product!
        </p>
        <p className="mb-3">
          ✦ No make up, bronzer, fake tan, perfume on the tattoo until full
          healed or it might get infected.
        </p>
        <p className="mb-3">
          ✦ Try not to go to the gym until your tattoo scabs. It’s an open wound
          and bacteria can get in.
        </p>
        <p className="mb-3">
          ✦ Keep your tattoo as clean as possible and it should heal in 2-4
          weeks depending on your body.
        </p>
        <p>
          ✦ If you have any questions, let me know. First touch up is free with
          no time restraint. Anything after may be charged depending what needs
          to be done.
        </p>
      </div>
      <Image
        src="/aftercare.jpg"
        alt="Picture of a fresh tattoo"
        width="0"
        height="0"
        sizes="100vw"
        className="h-auto w-full object-contain lg:max-w-sm lg:self-start"
      />
    </div>
  );
}
