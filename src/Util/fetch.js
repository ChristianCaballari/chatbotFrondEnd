export const obtenerData = async (recurso) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${recurso}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return { data };
  } catch (error) {
    console.error("Error al obtener la data:", error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

export const obtenerRespuesta = async (recurso, identificador = "") => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${recurso}${identificador}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const respuesta = await response.json();
    return respuesta;
  } catch (error) {
    console.error("Error al obtener la data:", error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};
