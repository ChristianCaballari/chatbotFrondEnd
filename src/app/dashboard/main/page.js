export const revalidate = 0;
import { ProductosGrid } from "@/products/ProductosGrid";
import { obtenerData } from "@/Util/fetch";

export default async function MainPage() {
  const { data: productosData } = await obtenerData("productos");
  const { data: opcionesData } = await obtenerData("opciones"); //opciones chatbot
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Listado de Productos{" "}
        <small className="text-blue-500">con sus Categorías</small>
      </span>
      <ProductosGrid productos={productosData} opciones={opcionesData} />
    </div>
  );
}
