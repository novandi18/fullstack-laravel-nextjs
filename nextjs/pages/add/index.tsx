import Layout from "@/components/layout/Layout";
import { ProductForm } from "@/types";
import { Button, CircularProgress, FormControl, FormLabel, Input } from "@mui/joy";
import { useState } from "react";
import { createProduct } from "../api/product";
import { useRouter } from "next/router";
import Head from "next/head";

export default function AddPage() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<ProductForm>({
    product_name: "",
    price: "",
    category: "",
    discount: undefined
  });

  const [errors, setErrors] = useState({
    product_name: false,
    price: false,
    category: false
  });

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (validateForm()) {
      addProduct();
    } else setLoading(false);
  };

  const validateForm = () => {
    const newErrors = {
      product_name: value.product_name === "",
      price: isNaN(Number(value.price)) || Number(value.price) === 0,
      category: value.category === "",
      discount: value.discount && (isNaN(Number(value.discount)) || Number(value.discount) === 0)
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleInputChange = (field: string, newValue: string | number) => {
    if (field === "discount" && typeof newValue === "number" && newValue > 100) {
      newValue = 100;
    }
    setValue({ ...value, [field]: newValue });
    setErrors({ ...errors, [field]: false });
  };

  const addProduct = async () => {
    const response = await createProduct(value);
    if (response.success) {
      router.push("/");
    }
  }

  return <>
    <Head>
      <title>Tambah Produk</title>
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
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tambah Produk</h1>
      <form className="flex flex-col gap-4 lg:w-8/12" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel className="text-gray-900 dark:text-white">Nama Produk <span className="text-red-500">*</span></FormLabel>
          <Input
            value={value.product_name}
            type="text"
            onChange={(event) => handleInputChange("product_name", event.target.value)}
            placeholder="ex: Emkay Vape 1"
            name="prod"
            required
            className={errors.product_name ? "border-red-500" : "" + "dark:bg-gray-800 dark:text-white dark:border-gray-700"}
            error={errors.product_name}
            autoComplete="off"
          />
        </FormControl>
        <FormControl>
          <FormLabel className="text-gray-900 dark:text-white">Kategori <span className="text-red-500">*</span></FormLabel>
          <Input
            value={value.category}
            type="text"
            onChange={(event) => handleInputChange("category", event.target.value)}
            placeholder="ex: Vape X"
            name="category"
            required
            className={errors.category ? "border-red-500" : "" + "dark:bg-gray-800 dark:text-white dark:border-gray-700"}
            error={errors.category}
            autoComplete="off"
          />
        </FormControl>
        <FormControl>
          <FormLabel className="text-gray-900 dark:text-white">Harga (Rp) <span className="text-red-500">*</span></FormLabel>
          <Input
            value={value.price}
            type="number"
            onChange={(event) => handleInputChange("price", Number(event.target.value))}
            placeholder="ex: 10000"
            name="price"
            required
            className={errors.price ? "border-red-500" : "" + "dark:bg-gray-800 dark:text-white dark:border-gray-700"}
            error={errors.price}
            autoComplete="off"
          />
        </FormControl>
        <FormControl>
          <FormLabel className="text-gray-900 dark:text-white">Diskon (%) (Optional)</FormLabel>
          <Input
            value={value.discount}
            type="number"
            onChange={(event) => handleInputChange("discount", Number(event.target.value))}
            placeholder="ex: 10"
            name="discount"
            className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
            autoComplete="off"
          />
        </FormControl>

        <Button className="w-fit px-5 mt-4 flex items-center gap-3 transition-all duration-300 disabled:bg-gray-200 disabled:dark:bg-gray-950 disabled:cursor-not-allowed disabled:text-gray-400 dark:disabled:text-gray-700" type="submit" disabled={loading}>
          <span>Submit</span>
          {loading && <CircularProgress color="neutral" variant="plain" />}
        </Button>
      </form>

    </Layout>
  </>
}
