import { Button, Link } from '@nextui-org/react';
import Image from 'next/image';

export default function BookingConfirmed() {
  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className="hidden xl:block xl:w-4/12">
        <Image
          src="/thank-you.png"
          alt="A doodle, thanking the user"
          width="360"
          height="360"
          sizes="100vw"
          className="h-auto w-full scale-[-1] rounded-lg"
        />
      </div>
      <div className="my-auto flex h-auto flex-col gap-5 text-center text-ironstone md:w-8/12 xl:w-4/12">
        <h2 className="text-4xl font-bold uppercase text-raw-sienna-dark">
          Thank You!
        </h2>
        <p>
          You&apos;ve reached the end of the form! You should get an email
          confirmation. Make sure that you have received it so that you can
          double check your responses. I will also be responding to the same
          mailbox.
        </p>
        <p>
          I&apos;ll get back to you in 3 days (max). If you don&apos;t hear back
          from me in 3 days time, feel free to poke me or re-send your booking
          form. I may have missed it. I do my best to reply even if just to let
          you know that I am not the right artist for you. That way you&apos;re
          not left waiting.
        </p>
        <p>
          That being said, if you&apos;ve changed your mind after I replied,
          please let me know you&apos;re no longer interested so I&apos;m not
          left waiting.
        </p>
        <p>
          If you ever need to cancel a tattoo appointment, please let me know as
          well! I swear I won&apos;t hold it against you. I rather be told than
          have a no-show where I&apos;m wondering where you are.
        </p>
        <p>Looking forward to conversing with you. Have a great day.</p>
        <Button className="bg-ironstone">
          <Link href="/" className="text-coconut-cream">
            Back To Home
          </Link>
        </Button>
      </div>
      <div className="w-4/12 self-center md:self-end">
        <Image
          src="/thank-you.png"
          alt="A doodle, thanking the user"
          width="360"
          height="360"
          sizes="100vw"
          className="h-auto w-full rounded-lg"
        />
      </div>
    </div>
  );
}
