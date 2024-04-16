import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';

export default function LinkIcon({
  href,
  icon,
}: {
  href: string;
  icon: IconDefinition;
}) {
  return (
    <a
      className="flex h-8 w-8 items-center justify-center rounded-full border-2 hover:border-orange-600 hover:text-orange-600"
      target="__blank"
      href={href}
    >
      <FontAwesomeIcon className="text-xl" icon={icon}></FontAwesomeIcon>
    </a>
  );
}
