import Image from "next/image";

export const ProductoPromocion = ({ productos }) => {
  return (
    <div className="flex flex-col">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="flex bg-white shadow-secondary-1 dark:bg-surface-dark text-gray-900 border-gray-800 border p-1 m-1 rounded"
        >
          <Image
            className="rounded-l-lg object-contain"
            src={producto.foto}
            alt={producto.nombre}
            width={60}
            height={60}
          />
          <div className="flex flex-col justify-start p-2 ml-4">
            <h3 className="font-bold text-lg">{producto.nombre}</h3>
            {producto.precioOriginal && (
              <p className="text-gray-500 line-through">
                ₡{producto.precioOriginal}
              </p>
            )}
            {producto.precio && (
              <p className="text-gray-500">₡{producto.precio}</p>
            )}
            {producto.precioConDescuento && (
              <p className="text-red-500 font-semibold">
                ₡{producto.precioConDescuento} ({producto.descuento})
              </p>
            )}
            {producto.categoria && (
              <div className="flex gap-1">
                <p className="text-gray-500">{"Categoria"}</p>
                <p className="text-red-500 font-semibold">
                  {producto.categoria}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
