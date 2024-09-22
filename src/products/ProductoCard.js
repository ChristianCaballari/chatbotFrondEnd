"use client";
import Image from "next/image";
import Link from "next/link";
export const ProductoCard = ({ producto }) => {
  const { id, nombre, precio, foto, categoria } = producto;

  return (
    <article className="relative border border-gray-800 p-2 rounded flex justify-between flex-col">
      <div className="aspect-square overflow-hidden">
        <Image
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
          src={foto}
          alt={nombre}
          width={300}
          height={200}
        />
      </div>
      <div className="absolute top-0 m-1 rounded-full bg-white">
        <p className="rounded-full bg-black p-1 text-[10px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
          En Venta
        </p>
      </div>
      <div className="mt-4 flex flex-col justify-center items-center md:flex-row md:justify-between">
        <div className="">
          <h3 className="text-xs font-semibold sm:text-sm md:text-base">
            <p className="">{nombre}</p>
          </h3>
        </div>

        <div className="text-right">
          <p className="text-xs font-normal sm:text-sm md:text-base">
            ₡{precio}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-center items-center md:flex-row md:justify-between">
        <div className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-start">
          <h3 className="text-xs font-semibold sm:text-sm md:text-base">
            <p className="">Categoria</p>
          </h3>
        </div>
        <div className="">
          <p className="text-xs font-normal sm:text-sm md:text-base">
            {categoria}
          </p>
        </div>
      </div>
      <button className="bg-gray-900 text-white p-2 flex items-center justify-center w-full mt-2">
        Agregar al Carrito
      </button>
    </article>
  );
};
