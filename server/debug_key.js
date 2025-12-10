require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // Alternative: Try gemini-pro
  console.log("Tentando acessar gemini-pro...");
  try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent("Hello");
      console.log("SUCESSO: gemini-pro está funcionando!");
      return;
  } catch (e) {
      console.log("Falha no gemini-pro:", e.message);
  }

  // Alternative: Try gemini-1.0-pro
  console.log("Tentando acessar gemini-1.0-pro...");
  try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
      const result = await model.generateContent("Hello");
      console.log("SUCESSO: gemini-1.0-pro está funcionando!");
      return;
  } catch (e) {
      console.log("Falha no gemini-1.0-pro:", e.message);
  }
}

listModels();
