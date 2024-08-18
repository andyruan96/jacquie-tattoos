export type Flash = {
  kind: string;
  id: string;
  name: string;
  mimeType: string;
  isSold: boolean;
  duration: FlashTime;
};

const FLASH_TIMES = ['45', '60', '90', '120', '180'] as const;
type FlashTime = (typeof FLASH_TIMES)[number];
export const isValidFlashTime = (x: any): x is FlashTime =>
  FLASH_TIMES.includes(x);

export const soldPrefix = '#sold-';
