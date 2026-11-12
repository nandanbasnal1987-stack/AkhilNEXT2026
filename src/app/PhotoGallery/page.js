import PhotoGalleryView from '@/views/PhotoGallery';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/PhotoGallery",
  title: "Photo Gallery | Akhil Systems",
  description: "Gallery of Akhil Systems Healthcare Solutions in action.",
  keywords: "photos, gallery, healthcare technology images, company photos, office gallery",
});

export default function Page() {
  return <PhotoGalleryView />;
}
