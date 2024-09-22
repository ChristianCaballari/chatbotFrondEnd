"use client";
import { LogoChatbot } from "@/components/Chatbot/LogoChatbot";
import { Usuario } from "@/components/Chatbot/IconUser";
import {
  BUSQUEDA_GENERICA,
  OpcionesMenuChatbot,
  MESSAGE_DEFAULT_QUESTION,
} from "@/Util/constantes";
import { OpcionesChatBot } from "@/components/Chatbot/OpcionesChatBot";
import { OpcionesRespuestaMultiple } from "@/components/Chatbot/OpcionesRespuestaMutiple";
import { IoClose } from "react-icons/io5";
import { useChatStore } from "@/store/chat/chat";
import { ShowMessage } from "./ShowMessage";
import { Loading } from "@/components/Chatbot/Loading";
import { ProductoPromocion } from "@/products/ProductoPromocion";
import { getSustantivos, agregarHistorialMensajes } from "@/Util/util";
import { obtenerRespuesta } from "@/Util/fetch";
import { useRef, useEffect, useState } from "react";
import { sleep } from "@/Util/sleep";
export const ChatBot = () => {
  const {
    mensajes,
    ocultarOpciones,
    opcionesChatbot,
    loading,
    opcionesPreguntasMultiplesChatbot,
    ocultarOpcionesPreguntasMultiples,
    inputDisabled,
    setLoading,
    agregarMensaje,
  } = useChatStore();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [generica, setGenerica] = useState("");
  const messagesEndRef = useRef(null);
  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onChange = (evento) => {
    setGenerica(evento.target.value);
  };

  const sendMessage = async () => {
    if (!generica) return;
    const sustantivos = getSustantivos(generica);
    const data = await obtenerRespuesta(BUSQUEDA_GENERICA, sustantivos);

    const respuestaEmpty = data.respuesta;
    setLoading(true);
    await sleep(1);

    if (respuestaEmpty != null) {
      const mesageResponseChatbot = agregarHistorialMensajes(
        true,
        respuestaEmpty
      );
      agregarMensaje(mesageResponseChatbot);
      mensajeDefault();
    } else {
      const ms = {
        id: Date.now(),
        item: "Resultados obtenidos",
        chatbot: true,
        productos: data,
      };
      agregarMensaje(ms);
      mensajeDefault();
    }
    setLoading(false);
    // const respuesta = data.respuesta;
  };
  const mensajeDefault = () => {
    const mesageResponseChatbot = agregarHistorialMensajes(
      true,
      MESSAGE_DEFAULT_QUESTION
    );
    agregarMensaje(mesageResponseChatbot);
  };

  useEffect(() => {
    scrollToBottom(); // Hacer scroll al final cuando los mensajes cambien
  }, [mensajes]);

  return (
    <div className="relative">
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-gray-900 text-white p-3 rounded-full shadow-lg"
      >
        <LogoChatbot />
      </button>
      {isChatVisible && (
        <div className="fixed bottom-4 right-[210px] flex items-center justify-center min-h-[350px]">
          <div className="fixed bottom-16 m-2 w-[350px] h-[27rem] border flex flex-col rounded-xl bg-white shadow-2xl shadow-gray-700">
            <header className="w-full bg-gray-900 flex  justify-between px-2 py-1 rounded-t-lg items-center">
              <h2 className="text-sm font-semibold text-white flex items-center gap-1">
                <LogoChatbot />
                Chatbot
              </h2>
              <span className="text-white aspect-square w-8 cursor-pointer p-1">
                <IoClose size={25} />
              </span>
            </header>

            <div className="flex flex-col gap-2 p-2 select-none overflow-y-auto flex-grow">
              {mensajes &&
                mensajes.map((mensaje) => (
                  <div key={mensaje.id} className="mb-4">
                    <ShowMessage
                      key={mensaje.id}
                      mensaje={mensaje.item}
                      isChatbot={mensaje.chatbot}
                    />
                    {mensaje.productos && mensaje.productos && (
                      <ProductoPromocion productos={mensaje.productos} />
                    )}
                  </div>
                ))}
              <div ref={messagesEndRef} />
              {!ocultarOpciones && (
                <div className="flex flex-col justify-start items-start ml-[30px] gap-2">
                  {opcionesChatbot.map((item) => (
                    <OpcionesChatBot key={item.id} opcionItem={item} />
                  ))}
                </div>
              )}
              {!ocultarOpcionesPreguntasMultiples && (
                <div className="flex flex-col justify-start items-start ml-[30px] gap-2">
                  {opcionesPreguntasMultiplesChatbot.map((item) => (
                    <OpcionesRespuestaMultiple
                      key={item.id}
                      opcionItem={item}
                    />
                  ))}
                </div>
              )}
              {loading && (
                <div className="flex flex-col z-[600]">
                  <Loading />
                </div>
              )}
            </div>

            <div className="flex items-center my-2 mx-1">
              <input
                id="chat"
                onChange={onChange}
                disabled={inputDisabled}
                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ingresar pregunta"
              />
              <button
                onClick={() => sendMessage()}
                className="flex justify-center items-center aspect-square h-9 bg-gray-900 inline-flex  p-2 text-white rounded-full cursor-pointer hover:bg-gray-950"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M4.4 19.425q-.5.2-.95-.088T3 18.5V14l8-2l-8-2V5.5q0-.55.45-.837t.95-.088l15.4 6.5q.625.275.625.925t-.625.925z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
