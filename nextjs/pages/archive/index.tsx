import { Button, Card } from "@mui/joy";
import Link from "next/link";
import { ArchiveBoxIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { removeArchivedItem } from "@/redux/slices/productSlice";
import Layout from "@/components/layout/Layout";

export default function ArchivePage() {
  const dispatch = useDispatch();
  const archivedProducts = useSelector((state: RootState) => state.products.items);

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-5 items-stretch">
        {archivedProducts.length === 0 ? (
          <div className="col-span-3 text-center text-gray-800 dark:text-gray-100">
            <div className="col-span-3 text-center text-gray-800 dark:text-gray-100">Tidak ada data</div>
          </div>
        ) : (
          archivedProducts.map((product) => (
            <Card className="p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 hover:shadow-lg transition-shadow duration-300 h-full" key={product.id}>
              <Link href={`/${product.id}`} className="h-full">
                <div className="flex flex-col space-y-2 justify-between h-full">
                  <span className="text-lg font-bold text-ellipsis line-clamp-2">{product.product_name}</span>
                  <div className="flex flex-col space-y-2 justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400 text-ellipsis line-clamp-2">{product.category}</span>
                    <span className="text-xl font-bold text-green-600 dark:text-green-400 bottom-0">Rp. {product.price}</span>
                  </div>
                </div>
              </Link>
              <Button className="flex gap-2 items-center w-fit bg-yellow-300 text-yellow-800 dark:bg-yellow-500 hover:bg-yellow-400 dark:hover:bg-yellow-600 active:bg-yellow-500 dark:active:bg-yellow-600" 
              onClick={() => dispatch(removeArchivedItem(product.id))}
              >
                <ArchiveBoxIcon className="w-4 h-4" /> Hapus Dari Arsip
              </Button>
            </Card>
          ))
        )}
      </div>
    </Layout>
  )
}