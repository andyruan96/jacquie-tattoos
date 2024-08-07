'use client';
import Cal, { getCalApi } from '@calcom/embed-react';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CalComTool({ event }: { event: string }) {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') ?? '';
  const email = searchParams.get('email') ?? '';
  const title = searchParams.get('title') ?? '';

  // export these to share if used elsewhere
  const colorPorsche = '#e99e57';
  const colorRawSiennaDark = '#c06542';
  const colorCoconutCream = '#f8f7de';
  const colorIronstone = '#7e483a';
  const colorSummerGreen = '#9bbfa4';

  const [booked, setBooked] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal('ui', {
        theme: 'light',
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: {
          light: {
            'cal-brand': colorPorsche,

            'cal-text': colorPorsche,
            'cal-text-emphasis': colorPorsche,

            'cal-border': colorIronstone,
            'cal-border-default': colorIronstone,
            'cal-border-subtle': colorIronstone,
            'cal-border-booker': colorIronstone,
            'cal-border-emphasis': colorRawSiennaDark,

            'cal-text-muted': colorSummerGreen,
            'cal-bg-emphasis': colorCoconutCream,

            // todo: testing below vars
            'cal-text-subtle': colorRawSiennaDark,
            'cal-brand-emphasis': colorRawSiennaDark,
            // 'cal-bg-error': colorSummerGreen,
            // 'cal-border-error': colorSummerGreen,
            // 'cal-text-error': colorSummerGreen,
            // 'cal-bg': colorCoconutCream,
            // 'cal-bg-inverted': colorSummerGreen,
            // More CSS variables are defined here
            // https://github.com/calcom/cal.com/blob/b0ca7dae1a17f897e34b83c990f30ab65f615ee0/packages/config/tailwind-preset.js#L69
          },
          dark: {},
        },
      });

      cal('on', {
        action: 'bookingSuccessful',
        callback: () => {
          setBooked(true);
        },
      });
    })();
  }, []);

  return (
    <div className="relative">
      <Cal
        calLink={`jacquietattoos/${event}`}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
        config={{
          layout: 'month_view',
          name,
          email,
          title,
        }}
      />
      <div
        className={clsx(
          'invisible absolute bottom-5 h-10 w-full bg-coconut-cream',
          {
            invisible: booked,
            'min-[1205px]:visible': !booked,
          },
        )}
      ></div>
    </div>
  );
}
