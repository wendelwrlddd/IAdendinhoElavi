require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function checkModels() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            console.error("ERRO DA API:", data.error.message);
        } else {
            console.log("Modelos Disponíveis para esta chave:");
            if (data.models) {
                data.models.forEach(m => console.log(`- ${m.name} (${m.supportedGenerationMethods})`));
            } else {
                console.log("Nenhum modelo encontrado.");
            }
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}

checkModels();
