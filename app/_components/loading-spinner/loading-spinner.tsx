import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LoadingSpinner({ sizeClass }: { sizeClass?: string }) {
  const size = sizeClass ?? 'text-4xl';

  return (
    <FontAwesomeIcon
      icon={faSpinner}
      className={`animate-spin ${size}`}
    ></FontAwesomeIcon>
  );
}
