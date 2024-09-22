import { create } from "zustand";

export const useChatStore = create((set, get) => ({
  ocultarOpciones: false,
  ocultarOpcionesPreguntasMultiples: false,
  loading: false,
  opcionesChatbot: [],
  opcionesPreguntasMultiplesChatbot: [],
  inputDisabled: true,

  agregarOpcionesChatbot: (nuevaOpciones) =>
    set((state) => {
      console.log(nuevaOpciones);
      if (state.opcionesChatbot.length === 0) {
        return { opcionesChatbot: [...nuevaOpciones] };
      }
      return state; // No agrega nada si ya hay opciones
    }),

  agregarOpcionesPreguntasMultiples: (opcionesPreguntas) =>
    set((state) => {
      console.log(opcionesPreguntas);
      if (state.opcionesPreguntasMultiplesChatbot.length === 0) {
        return { opcionesPreguntasMultiplesChatbot: [...opcionesPreguntas] };
      }
      return state; // No agrega nada si ya hay opciones
    }),

  mensajes: [
    {
      id: 1,
      item: "¡Hola! Estoy encantado de poder ayudarle. 👋",
      chatbot: true,
    },
    {
      id: 2,
      item: "¿Con qué tipo de información le puedo ayudar hoy?",
      chatbot: true,
    },
  ],
  ocultarOpcionesChat: (ocultar) => {
    set({ ocultarOpciones: ocultar }); // Simplemente establece el valor
  },

  ocultarOpcionesPreguntasMultiplesChat: (ocultar) => {
    set({ ocultarOpcionesPreguntasMultiples: ocultar }); // Simplemente establece el valor
  },

  setInputDisabled: (desactivar) => {
    set({ inputDisabled: desactivar }); // Simplemente establece el valor
  },

  setLoading: (load) => {
    set({ loading: load }); // Simplemente establece el valor
  },
  tamanioListaMensajes: () => {
    const { mensajes } = get();
    return mensajes.length;
  },
  agregarMensaje: (mensajeProp) => {
    const { mensajes } = get();

    // Revisar si existe el mensaje
    const mensajeInState = mensajes.some((item) => item.id === mensajeProp.id);

    // Insertar nuevo
    if (!mensajeInState) {
      set({ mensajes: [...mensajes, mensajeProp] });
    }
  },
  // Aquí puedes agregar otros métodos si es necesario
}));
