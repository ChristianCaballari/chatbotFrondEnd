"use client";
import { useChatStore } from "@/store/chat/chat";
import { obtenerRespuesta } from "@/Util/fetch";
import { sleep } from "@/Util/sleep";
import {
  CODIGO,
  MULTIPLE,
  RECURSO_OPCIONES,
  RESPUESTASIMPLE,
  CATEGORIA,
  RECURSO_CATEGORIAS,
  MESSAGE_DEFAULT_QUESTION,
  PRODUCTOS_PROMOCION,
  MESSAGE_OFERTA,
} from "@/Util/constantes";
export const OpcionesRespuestaMultiple = ({ opcionItem }) => {
  const { id, pregunta, codigo } = opcionItem;

  const {
    agregarMensaje,
    ocultarOpcionesChat,
    setLoading,
    ocultarOpcionesPreguntasMultiplesChat,
  } = useChatStore();

  const recurso =
    codigo === CATEGORIA ? RECURSO_CATEGORIAS : PRODUCTOS_PROMOCION;

  const agregarMensajeAlChat = async () => {
    ocultarOpcionesPreguntasMultiplesChat(true);
    agregarHistorialMensajes(false, pregunta);
    setLoading(true);

    const data = await obtenerRespuesta(recurso);
    const categorias = data.categorias;

    if (categorias != null) {
      await sleep(1);
      agregarHistorialMensajes(true, categorias);
      agregarHistorialMensajes(true, MESSAGE_DEFAULT_QUESTION);
      ocultarOpcionesChat(false);
      ocultarOpcionesPreguntasMultiplesChat(true);
      setLoading(false);
    } else {
      //PROMO
      // agregarHistorialMensajes(true,data)
      await sleep(1);
      const ms = {
        id: Date.now(),
        item: MESSAGE_OFERTA,
        chatbot: true,
        productos: data,
      };
      agregarMensaje(ms);
      agregarHistorialMensajes(true, MESSAGE_DEFAULT_QUESTION);
      setLoading(false);
      ocultarOpcionesChat(false);
    }
  };

  const agregarHistorialMensajes = (isChatbot, content) => {
    //     console.log(isChatbot, content);
    const ms = {
      id: Date.now(),
      item: content,
      chatbot: isChatbot,
    };
    agregarMensaje(ms);
  };

  return (
    <button
      onClick={() => agregarMensajeAlChat()}
      className="mx-2 p-2 rounded bg-gray-200 text-gray-900 text-start leading-4 text-sm border border-gray-900"
    >
      {pregunta}
    </button>
  );
};
