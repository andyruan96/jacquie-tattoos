import BookingForm from '@/app/_components/booking-form/booking-form';

export default function BookingConfirmed() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <h2 className="text-center">THANK YOU!</h2>
      <p>
        You've reached the end of the form! You should get an email
        confirmation. Make sure that you have received it so that you can double
        check your responses. I will also be responding to the same mailbox.
      </p>
      <p>
        I'll get back to you in 3 days (max). If you don't hear back from me in
        3 days time, feel free to poke me or re-send your booking form. I may
        have missed it. I do be best to reply even if I am just letting you know
        that I am not the right artist for you. That way you're not left
        waiting.
      </p>
      <p>
        That being said, if you've changed your mind after I replied, please let
        me know you're no longer interested so I'm not left waiting.
      </p>
      <p>
        If you ever need to cancel a tattoo appointment, please let me know as
        well! I swear I won't hold it against you. I rather be told than have a
        no-show where I'm wondering where you are.
      </p>
      <p>Looking forward to conversing with you. Have a great day.</p>
    </div>
  );
}
