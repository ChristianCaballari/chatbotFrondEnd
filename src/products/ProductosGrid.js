"use client";
import { ProductoCard } from "./ProductoCard";
import { useChatStore } from "@/store/chat/chat";
import { useEffect } from "react";
export const ProductosGrid = ({ productos, opciones }) => {
  const { agregarOpcionesChatbot, opcionesChatbot } = useChatStore();

  useEffect(() => {
    // Solo se llama cuando 'opciones' cambia
    if (opcionesChatbot.length === 0) {
      agregarOpcionesChatbot(opciones);
    }
  }, [agregarOpcionesChatbot, opciones]); // Dependencias

  return (
    <div className="mx-auto max-w-screen-lg">
      <main className="grid grid-cols-2 gap-x-6 gap-y-10 px-2 pb-20 sm:grid-cols-3 sm:px-8 lg:mt-16 lg:grid-cols-4 lg:gap-x-4 lg:px-0">
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </main>
    </div>
  );
};
