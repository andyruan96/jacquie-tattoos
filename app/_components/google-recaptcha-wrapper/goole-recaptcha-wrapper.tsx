'use client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function GoogleRecaptchaWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={
        process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ??
        'MISSING RECAPTCHA SITE KEY'
      }
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
