import { LogoUsuario } from "@/Util/constantes";
import Image from "next/image";

export const Usuario = () => {
  return (
    <div>
      <Image
        src={LogoUsuario}
        alt="Logo Usuario"
        width={25} // Especifica un ancho
        height={25} // Especifica una altura
      />
    </div>
  );
};
