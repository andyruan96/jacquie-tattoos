import { createContext } from 'react';

export const GalleryContext = createContext<{ handleBack?: () => void }>({});

export const CaptionContext = createContext<string>('');
