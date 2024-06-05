import InstagramItem from '@/app/_components/instagram-item/instagram-item';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function Photo({ params: { id } }: { params: { id: string } }) {
  return (
    <div className="w-auto">
      <Link href="/gallery">
        <FontAwesomeIcon
          className="text-xl"
          icon={faCaretLeft}
        ></FontAwesomeIcon>
        <span className="text-xl font-medium hover:underline dark:text-blue-500">
          Back To Gallery
        </span>
      </Link>
      <div className="mt-2 h-[85vh]">
        <InstagramItem mediaId={id}></InstagramItem>
      </div>
    </div>
  );
}
