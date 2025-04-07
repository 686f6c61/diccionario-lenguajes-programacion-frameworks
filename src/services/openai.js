import OpenAI from 'openai';

// Inicializar cliente de OpenAI con la API key del archivo .env
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Permitir uso en el navegador (solo para demo)
});

/**
 * Obtiene información sobre una tecnología usando GPT-3.5 Turbo
 * @param {string} technology - El nombre de la tecnología
 * @returns {Promise<{description: string, curiosity: string, officialUrl: string, wikipediaUrl: string}>} - Descripción, curiosidad y URLs
 */
export const getTechnologyInfo = async (technology) => {
  try {
    const prompt = `
    Dame la siguiente información sobre ${technology}:
    
    1. Una descripción técnica concisa pero completa en español (150-200 palabras) que incluya:
       - Propósito principal y casos de uso
       - Características técnicas distintivas
       - Ventajas clave respecto a tecnologías similares
       - Aspectos arquitectónicos importantes
       - Conceptos de programación fundamentales
       
    2. Una curiosidad o dato interesante poco conocido sobre esta tecnología (1-2 frases)
       
    3. La URL oficial de la tecnología (sitio web del proyecto, repositorio oficial, o documentación principal)
    
    4. La URL de Wikipedia en español si existe, o en inglés si no hay en español
    
    Devuelve la información en formato JSON con este formato exacto:
    {
      "description": "La descripción técnica aquí, enfocada en aspectos técnicos y conceptos de programación relevantes.",
      "curiosity": "El dato curioso o interesante sobre la tecnología aquí.",
      "officialUrl": "https://sitio-oficial-de-la-tecnologia.com",
      "wikipediaUrl": "https://es.wikipedia.org/wiki/..."
    }
    
    Si no encuentras la URL oficial, asegúrate de incluir al menos la URL de Wikipedia.
    Solo devuelve el JSON, nada más.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Eres un experto en ingeniería de software y tecnologías de programación. Proporcionas información técnica concisa pero completa que sea útil para desarrolladores. Tu enfoque es técnico y educativo. Evitas ser extenso y vas directo a los puntos clave. Siempre incluyes alguna curiosidad o dato interesante sobre cada tecnología." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 750,  // Reducir el límite para descripciones más concisas
    });

    const content = response.choices[0].message.content.trim();
    
    // Extraer el JSON de la respuesta
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const jsonContent = jsonMatch[0];
      return JSON.parse(jsonContent);
    }
    
    // Si no se pudo extraer el JSON, devolver un objeto con valores por defecto
    return {
      description: `No se pudo obtener información sobre ${technology}.`,
      curiosity: `No se encontraron datos curiosos sobre ${technology}.`,
      officialUrl: `https://www.google.com/search?q=${encodeURIComponent(technology)}+official+website`,
      wikipediaUrl: `https://es.wikipedia.org/wiki/${encodeURIComponent(technology)}`
    };
  } catch (error) {
    console.error("Error al obtener información de la tecnología:", error);
    return {
      description: `Error al obtener información sobre ${technology}: ${error.message}`,
      curiosity: `No se encontraron datos curiosos sobre ${technology}.`,
      officialUrl: `https://www.google.com/search?q=${encodeURIComponent(technology)}+official+website`,
      wikipediaUrl: `https://es.wikipedia.org/wiki/${encodeURIComponent(technology)}`
    };
  }
}; 