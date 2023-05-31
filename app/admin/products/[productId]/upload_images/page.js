import UploadImages from '@/app/features/admin/UploadImages';

export default async function UploadProductsPage({ params }) {
  return (
    <main>
      <UploadImages productId={params.productId} />
    </main>
  );
}
