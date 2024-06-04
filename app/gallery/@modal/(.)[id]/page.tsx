import InstagramItem from '@/app/_components/instagram-item/instagram-item';
import { Modal } from './modal';

export default function PhotoModal({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <InstagramItem mediaId={id}></InstagramItem>
    </Modal>
  );
}
