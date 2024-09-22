"use client";
import { useChatStore } from "@/store/chat/chat";
import { obtenerRespuesta } from "@/Util/fetch";
import { sleep } from "@/Util/sleep";
import {
  MULTIPLE,
  RECURSO_OPCIONES,
  RESPUESTASIMPLE,
  MESSAJE_DEFAULT,
  MESSAGE_DEFAULT_QUESTION,
  GENERICA,
} from "@/Util/constantes";
export const OpcionesChatBot = ({ opcionItem }) => {
  const { id, opcion, codigo } = opcionItem;

  const recurso = codigo === MULTIPLE ? RECURSO_OPCIONES : RESPUESTASIMPLE;
  const identificador = codigo === MULTIPLE ? id : codigo;

  const {
    agregarMensaje,
    ocultarOpcionesChat,
    setLoading,
    agregarOpcionesPreguntasMultiples,
    opcionesPreguntasMultiplesChatbot,
    ocultarOpcionesPreguntasMultiplesChat,
    setInputDisabled,
  } = useChatStore();

  const agregarMensajeAlChat = async () => {
    if (codigo === GENERICA) {
      setInputDisabled(false);
      // return;
    } else {
      setInputDisabled(true);
      ocultarOpcionesChat(true);
      agregarHistorialMensajes(false, opcion);
      setLoading(true);

      const data = await obtenerRespuesta(recurso, identificador);
      const respuesta = data.respuesta;

      if (respuesta) {
        await sleep(1);
        agregarHistorialMensajes(true, respuesta);
        agregarHistorialMensajes(true, MESSAGE_DEFAULT_QUESTION);
        ocultarOpcionesChat(false);
        setLoading(false);
      } else {
        // if (opcionesPreguntasMultiplesChatbot.length === 0) {
        agregarHistorialMensajes(true, MESSAJE_DEFAULT);
        agregarOpcionesPreguntasMultiples(data.preguntas);
        ocultarOpcionesPreguntasMultiplesChat(false);
        setLoading(false);
        // }
      }
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
      className="mx-2 p-2 rounded bg-gray-200 text-start text-gray-900 leading-4 text-sm border border-gray-900"
    >
      {opcion}
    </button>
  );
};
