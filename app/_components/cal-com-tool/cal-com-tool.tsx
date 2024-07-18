'use client';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

export default function CalComTool() {
  // export these to share if used elsewhere
  const colorPorsche = '#e99e57';
  const colorRawSiennaDark = '#c06542';
  const colorCoconutCream = '#f8f7de';
  const colorIronstone = '#7e483a';
  const colorSummerGreen = '#9bbfa4';

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal('ui', {
        theme: 'light',
        // styles: { branding: { brandColor: '#e99e57' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: {
          light: {
            'cal-brand': colorPorsche,
            'cal-text': colorPorsche,

            'cal-text-emphasis': colorPorsche,
            'cal-border-emphasis': colorRawSiennaDark,

            'cal-text-error': 'pink',

            'cal-border': colorIronstone,
            'cal-border-default': colorIronstone,
            'cal-border-subtle': colorIronstone,
            'cal-border-booker': colorIronstone,

            'cal-text-muted': colorSummerGreen,
            'cal-bg-emphasis': colorCoconutCream,

            // todo: testing below vars
            'cal-text-subtle': colorPorsche,
            // 'cal-bg': colorCoconutCream,
            // More CSS variables are defined here
            // https://github.com/calcom/cal.com/blob/b0ca7dae1a17f897e34b83c990f30ab65f615ee0/packages/config/tailwind-preset.js#L69

            'cal-bg-inverted': colorSummerGreen,
          },
          dark: {},
        },
      });
    })();
  }, []);

  return (
    <div className="relative">
      <Cal
        calLink="jacquietattoos/2-hour-tattoo"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
        config={{ layout: 'month_view', name: 'test name' }}
      />
      <div className="invisible absolute bottom-5 h-10 w-full bg-coconut-cream min-[1205px]:visible"></div>
    </div>
  );
}
