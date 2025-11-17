"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Bot, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AIChatProps {
  onBack: () => void
  userProfile: any
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AIChat({ onBack, userProfile }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou seu assistente nutricional. Posso te ajudar com dúvidas sobre alimentação, glicemia e seu plano personalizado. Como posso ajudar?"
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages([...messages, userMessage])
    setInput("")
    setIsLoading(true)

    // Simula resposta da IA
    setTimeout(() => {
      let response = ""
      
      if (input.toLowerCase().includes("banana")) {
        response = "A banana tem índice glicêmico moderado (51). Você pode comer, mas prefira pela manhã ou após exercícios. Uma banana pequena é melhor que uma grande. Combine com uma fonte de proteína (como iogurte) para reduzir o impacto na glicose."
      } else if (input.toLowerCase().includes("bolo") || input.toLowerCase().includes("doce")) {
        response = "Bolos tradicionais têm alto índice glicêmico e podem elevar muito sua glicose. Se você fez um bolo, considere: 1) Comer uma porção muito pequena, 2) Fazer uma caminhada de 15 min depois, 3) Medir a glicose após 1-2h. Melhor ainda: experimente receitas com farinha de amêndoas e adoçante natural."
      } else if (input.toLowerCase().includes("exercício") || input.toLowerCase().includes("caminhar")) {
        response = "Excelente! Caminhadas leves de 10-15 minutos após as refeições ajudam muito a controlar a glicemia. O ideal é caminhar 30 minutos após comer. Evite exercícios intensos se sua glicose estiver acima de 250 mg/dL."
      } else if (input.toLowerCase().includes("água") || input.toLowerCase().includes("beber")) {
        response = "Ótima pergunta! Você deve beber pelo menos 2 litros de água por dia. A hidratação ajuda seus rins a eliminar o excesso de açúcar no sangue. Beba água antes das refeições também - ajuda no controle do apetite."
      } else {
        response = "Baseado no seu perfil, recomendo sempre verificar o índice glicêmico dos alimentos. Prefira alimentos integrais, proteínas magras e vegetais. Evite açúcares simples e carboidratos refinados. Quer saber sobre algum alimento específico?"
      }

      const assistantMessage: Message = { role: "assistant", content: response }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-cyan-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Chat Nutricional AI</h1>
                <p className="text-xs text-gray-600">Tire suas dúvidas em tempo real</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-3xl">
        <ScrollArea className="h-[calc(100vh-240px)]">
          <div className="space-y-4 pb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg h-fit">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <Card
                  className={`p-4 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0"
                      : "bg-white border-cyan-200"
                  }`}
                >
                  <p className={message.role === "user" ? "text-white" : "text-gray-900"}>
                    {message.content}
                  </p>
                </Card>
                {message.role === "user" && (
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg h-fit">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg h-fit">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <Card className="p-4 bg-white border-cyan-200">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="border-t border-cyan-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 max-w-3xl">
          <Card className="p-2 border-cyan-200">
            <div className="flex gap-2">
              <Input
                placeholder="Digite sua pergunta... Ex: Posso comer banana agora?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="border-0 focus-visible:ring-0"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>
          <p className="text-xs text-gray-500 text-center mt-2">
            As respostas são baseadas no seu perfil e em diretrizes nutricionais gerais
          </p>
        </div>
      </div>
    </div>
  )
}
