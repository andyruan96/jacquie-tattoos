import InstagramItem from '@/app/_components/instagram-item/instagram-item';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function Photo({ params: { id } }: { params: { id: string } }) {
  return (
    <div className="flex max-w-screen-md flex-col gap-2">
      <Link href="/gallery" className="flex items-center">
        <FontAwesomeIcon
          className="text-xl"
          icon={faCaretLeft}
        ></FontAwesomeIcon>
        <span className="text-xl font-medium hover:underline dark:text-blue-500">
          Back To Gallery
        </span>
      </Link>

      <InstagramItem mediaId={id}></InstagramItem>
    </div>
  );
}
