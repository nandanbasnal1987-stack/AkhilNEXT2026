import GalleryView from '@/views/Gallery';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/Gallery",
  title: "Gallery | Akhil Systems",
  description: "Photos and videos from Akhil Systems Healthcare Solutions.",
});

export default function Page() {
  return <GalleryView />;
}
