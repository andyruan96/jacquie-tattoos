import { createContext } from 'react';

const GalleryContext = createContext<{ handleBack?: () => void }>({});
export default GalleryContext;
