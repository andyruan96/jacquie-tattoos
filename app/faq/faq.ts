type FAQ = {
  question: string;
  answer: string[];
};

const faqs: FAQ[] = [
  {
    question: 'How much do you charge?',
    answer: [
      'All flash designs are priced on the sheet at minimum size listed. Any size increase may be subjected to a price raise.',
      'Custom tattoos are quoted based on a $180 hourly rate.',
      'Tax is not included in rate.',
    ],
  },
  {
    question: 'Do you take walk-ins?',
    answer: [
      'Sorry, I am appointment only. I need time to brainstorm and draw for my appointments, and often am only in studio during the time I’ve scheduled for tattooing.',
    ],
  },
  {
    question: 'What forms of payment do you take? Can I e-Transfer you?',
    answer: ['Cash, credit and debit is accepted. No AMEX or e-transfers'],
  },
  {
    question: 'How should i prepare for my appointment?',
    answer: [
      'Come well rested. No alcohol the day before or after the appointment as it’s a blood thinner. Remember to have a decent sized lunch and be hydrated for your appointment. Feel free to bring snacks and water if the session is long. Wear clothing that is loose and of easy access to where the tattoo will be placed.',
      'If you wish to bring a friend or a family member, please ask first due to Covid. Thank you!',
    ],
  },
  {
    question: 'What is your touch-up policy?',
    answer: [
      'The first touch up is always free. There’s no time restraint on it, so feel free to reach out any time if you are in need of one. If you are unsure if you need one, you can always shoot me a message and ask.',
      'Anything after the second one may be charged, but I’m also always down to just do a quick touch up for free if I’m already tattooing you.',
    ],
  },
  {
    question: 'May I bring you a snack/drink? what would you like?',
    answer: [
      'I am always touched by any sort of snacks/drink! You’re literally the sweetest person ever if you bring me anything, and I truly appreciate it. Please don’t feel pressured to though.',
      'I’m not picky when it comes to food. My only request is that it’s milk/cream free as I am lactose intolerant. A little bit of lactose is sometimes okay lol.',
    ],
  },
];

export default faqs;
