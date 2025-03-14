"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<string | null>(null);
  const [showCryptoDeclaration, setShowCryptoDeclaration] = useState(false);

// Banco de FAQs
const faqs = [
  // FAQs Gerais
  { category: "geral", question: "O que é Bitcoin?", answer: "Bitcoin é uma criptomoeda descentralizada criada em 2009 por Satoshi Nakamoto." },
  { category: "geral", question: "O que é Ethereum?", answer: "Ethereum é uma plataforma descentralizada para contratos inteligentes e aplicativos descentralizados." },
  { category: "geral", question: "O que é um NFT?", answer: "NFTs são tokens não fungíveis que representam propriedade digital exclusiva." },
  { category: "geral", question: "O que são stablecoins?", answer: "Stablecoins são criptomoedas projetadas para manter um valor estável, geralmente atrelado ao dólar ou outro ativo." },
  { category: "geral", question: "O que é DeFi?", answer: "DeFi (Finanças Descentralizadas) refere-se a um conjunto de aplicações financeiras construídas sobre blockchains." },
  { category: "geral", question: "O que é um contrato inteligente?", answer: "Contrato inteligente é um protocolo autoexecutável com termos diretamente escritos em código na blockchain." },
  { category: "geral", question: "O que é mineração de Bitcoin?", answer: "Mineração é o processo de validar transações na blockchain e receber Bitcoin como recompensa." },
  { category: "geral", question: "O que são altcoins?", answer: "Altcoins são todas as criptomoedas alternativas ao Bitcoin, como Ethereum, Cardano e Solana." },
  { category: "geral", question: "O que é um airdrop?", answer: "Airdrop é a distribuição gratuita de tokens ou criptomoedas para incentivar a adoção de um projeto." },
  { category: "geral", question: "O que é uma carteira digital?", answer: "Uma carteira digital permite armazenar, enviar e receber criptomoedas com segurança." },

  // FAQs de Declaração
  { category: "declaracao", question: "Como declarar criptomoedas no Imposto de Renda?", answer: "Criptomoedas devem ser declaradas na ficha 'Bens e Direitos' com o código correspondente." },
  { category: "declaracao", question: "Qual o imposto sobre o lucro com criptomoedas?", answer: "Ganhos acima de R$ 35.000/mês são tributados com alíquotas entre 15% e 22,5%." },
  { category: "declaracao", question: "Há isenção de imposto na venda de criptomoedas?", answer: "Vendas abaixo de R$ 35.000/mês são isentas de imposto sobre o ganho de capital." },
  { category: "declaracao", question: "Como pagar o imposto sobre o ganho de capital com criptomoedas?", answer: "O imposto deve ser pago via DARF até o último dia útil do mês seguinte à venda." },
  { category: "declaracao", question: "Como declarar stablecoins no Imposto de Renda?", answer: "Stablecoins devem ser declaradas na ficha 'Bens e Direitos', utilizando o código 83." },
  { category: "declaracao", question: "O que é um airdrop e como declará-lo?", answer: "Airdrops recebidos devem ser informados na ficha 'Bens e Direitos' do Imposto de Renda." },
  { category: "declaracao", question: "Como declarar NFTs no Imposto de Renda?", answer: "NFTs devem ser declarados na ficha 'Bens e Direitos', utilizando o código 89." },
  { category: "declaracao", question: "O que é staking e como declarar os rendimentos?", answer: "Recompensas de staking são tratadas como rendimentos tributáveis e devem ser declaradas." },
  { category: "declaracao", question: "Como declarar mineração de criptomoedas?", answer: "Criptomoedas mineradas devem ser declaradas como bens e seus rendimentos como tributáveis." },
  { category: "declaracao", question: "Quais são as penalidades por não declarar criptomoedas?", answer: "A omissão pode resultar em multas e bloqueio do CPF pela Receita Federal." },
];


  // Filtrar FAQs
  const filteredFaqs = showCryptoDeclaration ? faqs.filter(faq => faq.category === "declaracao") : faqs;

  // Função para enviar a pergunta ao backend Flask
  const sendQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("https://b56c-2804-1b2-11c0-4927-8456-6eb7-1faf-fc90.ngrok-free.app/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Erro ao conectar com o servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-6">
      {/* LOGO */}
      <Image src="/logo3.png" alt="CryptoBot Logo" width={120} height={120} />

      {/* TÍTULO */}
      <h1 className="text-3xl sm:text-5xl font-bold mt-4 text-center">CryptoBot - Seu Assistente de Criptomoedas</h1>
      <p className="text-lg sm:text-xl text-center mt-2 opacity-90">
        Tire suas dúvidas sobre Bitcoin, Ethereum, NFTs e o universo das criptomoedas.
      </p>

      {/* CAMPO DE PERGUNTA COM DESTAQUE */}
      <div className="w-full max-w-xl mt-6 flex flex-col items-center">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Digite sua pergunta sobre cryptos, bitcoin, stable coins, mercados, tendências..."
          className="w-full p-3 rounded-xl text-black text-lg focus:outline-none
                     bg-gray-100 border-2 border-gray-300 focus:border-yellow-500 transition"
        />
        <button
          onClick={sendQuestion}
          className="mt-3 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 transition rounded-xl font-bold"
        >
          Perguntar
        </button>
      </div>

      {/* ÁREA DE RESPOSTA */}
      <div className="w-full max-w-xl mt-6 p-4 bg-white/20 rounded-lg shadow-md overflow-auto max-h-96">
        {loading ? (
          <p className="text-center text-xl font-semibold">Analisando... ⏳</p>
        ) : response ? (
          <pre className="text-lg font-medium whitespace-pre-wrap break-words">{response}</pre>
        ) : (
          <p className="text-center text-lg opacity-70">Aguardando sua pergunta...</p>
        )}
      </div>

      {/* BOTÃO PARA FILTRAR DECLARAÇÃO DE CRIPTO */}
      <button
        onClick={() => setShowCryptoDeclaration(!showCryptoDeclaration)}
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl font-bold"
      >
        {showCryptoDeclaration ? "Mostrar Todos os FAQs" : "Mostrar apenas FAQs de Declaração de Cripto"}
      </button>

      {/* LISTA DE FAQs */}
      <div className="w-full max-w-xl mt-6">
        <h2 className="text-2xl font-bold text-center">Perguntas Frequentes</h2>
        <ul className="mt-4 space-y-2">
          {filteredFaqs.map((faq, index) => (
            <li
              key={index}
              className="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition"
              onClick={() => setSelectedFaq(faq.question === selectedFaq ? null : faq.question)}
            >
              <p className="font-semibold">{faq.question}</p>
              {selectedFaq === faq.question && <p className="mt-2 text-sm text-gray-300">{faq.answer}</p>}
            </li>
          ))}
        </ul>
      </div>

      {/* RODAPÉ */}
      <footer className="mt-8 text-sm opacity-80">
        © {new Date().getFullYear()} CryptoBot - Todos os direitos reservados
      </footer>
    </div>
  );
}
