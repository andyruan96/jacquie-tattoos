import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';

export default function LinkIcon({
  href,
  icon,
  classNames,
}: {
  href: string;
  icon: IconDefinition;
  classNames?: {
    linkWrapper?: string[];
    icon?: string[];
  };
}) {
  return (
    <a
      className={`flex min-h-8 min-w-8 items-center justify-center rounded-full border-2 border-coconut-cream hover:border-summer-blue hover:text-summer-blue ${classNames?.linkWrapper?.join(' ')}`}
      target="__blank"
      href={href}
    >
      <FontAwesomeIcon
        className={`text-xl ${classNames?.icon?.join(' ')}`}
        icon={icon}
      ></FontAwesomeIcon>
    </a>
  );
}
