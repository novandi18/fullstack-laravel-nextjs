import { Button, Card, Skeleton } from "@mui/joy";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "./api/product";
import { Product } from "@/types";
import { addProduct } from "@/redux/slices/productSlice";
import { ArchiveBoxIcon } from "@heroicons/react/24/solid";
import { RootState } from "@/redux/store";
import { calculateDiscountedPrice, formatPrice } from "@/utils";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const archivedProducts = useSelector((state: RootState) => state.products.items);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();
      setProducts(response.data ?? []);
      setLoading(false);
    } catch {
      alert('Koneksi gagal');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product: Product) => !archivedProducts.some(archivedProduct => archivedProduct.id === product.id)
  );

  return (
    <div className="grid grid-cols-3 gap-5 items-stretch">
      {loading ? (
        Array.from(new Array(6)).map((_, index) => (
          <Skeleton key={index} variant="rectangular" className="h-40 p-5 bg-gray-50 dark:bg-gray-800 rounded-md" />
        ))
      ) : filteredProducts.length === 0 ? (
        <div className="col-span-3 text-center text-gray-800 dark:text-gray-100">
          <div className="col-span-3 text-center text-gray-800 dark:text-gray-100">Tidak ada data</div>
          <Button color="primary" className="w-fit mt-2" onClick={() => fetchProducts()}>Refresh</Button>
        </div>
      ) : (
        filteredProducts.map((product) => (
          <Card className="p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 hover:shadow-lg transition-shadow duration-300 h-full" key={product.id}>
            <Link href={`/${product.id}`} className="h-full">
              <div className="flex flex-col space-y-2 justify-between h-full">
                <span className="text-lg font-bold text-ellipsis line-clamp-2">{product.product_name}</span>
                <div className="flex flex-col space-y-2 justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 text-ellipsis line-clamp-2">{product.category}</span>
                  <span className="text-xl font-bold text-green-600 dark:text-green-400 bottom-0">
                    {product.discount == null || product.discount === 0 ? formatPrice(product.price) : formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                  </span>
                </div>
              </div>
            </Link>
            <Button color="warning" className="flex gap-2 items-center w-fit" 
              onClick={() => dispatch(addProduct(product))}
            >
              <ArchiveBoxIcon className="w-4 h-4" /> Arsipkan
            </Button>
          </Card>
        ))
      )}
    </div>
  )
}