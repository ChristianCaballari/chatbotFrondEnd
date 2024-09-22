import nlp from "es-compromise";

export const getSustantivos = (frase) => {
  const doc = nlp(frase);
  // Extraer los sustantivos
  const sustantivos = doc.nouns().out("array");

  return sustantivos.join("|");
};

export const agregarHistorialMensajes = (isChatbot, content) => {
  const ms = {
    id: Date.now(),
    item: content,
    chatbot: isChatbot,
  };
  return ms;
};
