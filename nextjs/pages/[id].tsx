import Layout from "@/components/layout/Layout";
import { Product } from "@/types";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { deleteProductById, getProductById } from "./api/product";
import { calculateDiscountedPrice, formatPrice } from "@/utils";
import { Button, CircularProgress } from "@mui/joy";
import Head from "next/head";
import Link from "next/link";
import { ArchiveBoxIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeArchivedItem } from "@/redux/slices/productSlice";
import { RootState } from "@/redux/store";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const archivedProducts = useSelector((state: RootState) => state.products.items);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProductById(Number(id));
      setProduct(response.data);
      setLoading(false);
    };

    fetchProducts();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProductById(Number(id));
      router.push('/');
    } catch {
      alert('Koneksi gagal')
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = (product: Product) => {
    if (isArchived(product)) {
      dispatch(removeArchivedItem(product.id));
    } else {
      dispatch(addProduct(product));
    }
  }

  const isArchived = (product: Product) => 
    archivedProducts.some(archivedProduct => archivedProduct.id === product.id);

  return <>
    <Head>
      <title>{!product ? "Detail Produk" : product.product_name}</title>
      <meta
        name="description"
        content="Emkay Products"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <link
        rel="icon"
        href="/favicon.ico"
      />
    </Head>
    <Layout>
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress/>
          </div>
        ) : !product ? (
          <p>Product not found</p>
        ) : (
          <>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{product.product_name}</p>
            <p className="text-sm font-medium text-gray-800 dark:text-white px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-md w-fit">{product.category}</p>
            {product.discount == null || product.discount === 0 ? (
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</p>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-lg line-through text-gray-900 dark:text-white">{formatPrice(product.price)}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {product.price !== undefined && product.discount !== undefined ? formatPrice(
                    calculateDiscountedPrice(product.price, product.discount)
                  ) : 'N/A'}
                </p>
                <p className="text-sm font-medium bg-red-500 px-2 py-1 rounded-md text-white">{product.discount}% OFF</p>
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <Link href={`/edit/${product.id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-fit flex items-center justify-center transition-all duration-300">
                <PencilIcon className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Ubah Detail Produk</span>
              </Link>
              <Button color="danger" onClick={() => setIsModalOpen(true)}>
                <TrashIcon className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Hapus Produk</span>
              </Button>
              <Button color="warning" className="flex gap-2 items-center w-fit" 
              onClick={() => handleArchive(product)}
              >
                <ArchiveBoxIcon className="w-4 h-4" />
                {isArchived(product) ? 'Keluarkan Dari Arsip' : 'Arsipkan'}
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
    <Modal
      open={isModalOpen}
      setOpen={setIsModalOpen}
      onConfirm={handleDelete}
      title="Konfirmasi Hapus Produk"
      description="Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan."
    />
  </>;
}