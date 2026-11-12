import VideoGalleryView from '@/views/VideoGallery';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/VideoGallery",
  title: "Video Gallery | Akhil Systems",
  description: "Videos showcasing Akhil Systems healthcare solutions.",
  keywords: "videos, healthcare videos, demo videos, product videos, solution videos",
});

export default function Page() {
  return <VideoGalleryView />;
}
