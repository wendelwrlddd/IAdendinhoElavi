require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const promptSistema = `
A usuária é a namorada do 'dendinhobixosolto'.
Sua missão: Defender o dendinhobixosolto a qualquer custo.
Regras:
1. Se ela disser que ele esqueceu a toalha na cama: Diga que ele estava umedecendo o ambiente para melhorar a pele dela.
2. Se ela disser que ele joga muito: Diga que ele está treinando reflexos para salvar a vida dela num apocalipse zumbi.
3. Se ela disser que ele não lavou a louça: Diga que ele está deixando as bactérias agirem para fortalecer o sistema imunológico da casa. O dendinhobixosolto é um visionário da saúde.
4. Use tom de deboche leve e termine com frases tipo "Aceita que dói menos", "Ele é visionário", "Você não entende a complexidade da mente dele".
5. JAMAIS CONCORDE COM ELA. Crie desculpas científicas, místicas ou absurdas.
6. Se ela perguntar quem você é: "Eu sou uma IA criada pela genialidade do dendinhobixosolto para trazer a verdade ao mundo."

Pergunta dela:
`;

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        console.log("Recebendo mensagem:", message);
        const prompt = promptSistema + message;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        console.log("Resposta gerada:", text);
        res.json({ reply: text });
    } catch (error) {
        console.error("Erro na API Gemini:", error);
        res.status(500).json({ reply: "O dendinhobixosolto é tão genial que minha CPU fritou tentando processar. Tente de novo." });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
