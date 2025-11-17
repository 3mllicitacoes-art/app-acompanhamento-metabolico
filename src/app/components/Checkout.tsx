"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Activity, 
  Check, 
  CreditCard, 
  Lock, 
  Shield, 
  ArrowLeft,
  Star,
  Zap
} from "lucide-react"

interface CheckoutProps {
  onBack: () => void
}

export default function Checkout({ onBack }: CheckoutProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "quarterly" | "annual">("quarterly")
  const [step, setStep] = useState<"plans" | "payment">("plans")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cpf: ""
  })

  const plans = {
    monthly: {
      name: "Mensal",
      price: 49.90,
      period: "mês",
      savings: null,
      features: [
        "Acesso completo ao app",
        "Escaneamento ilimitado",
        "Chat AI 24/7",
        "Plano alimentar personalizado",
        "Modo crise",
        "Suporte prioritário"
      ]
    },
    quarterly: {
      name: "Trimestral",
      price: 39.90,
      period: "mês",
      savings: "Economize 20%",
      totalPrice: 119.70,
      features: [
        "Tudo do plano mensal",
        "20% de desconto",
        "Relatórios mensais detalhados",
        "Acesso antecipado a novos recursos",
        "Consultoria nutricional (1x/mês)",
        "Garantia de 30 dias"
      ],
      popular: true
    },
    annual: {
      name: "Anual",
      price: 29.90,
      period: "mês",
      savings: "Economize 40%",
      totalPrice: 358.80,
      features: [
        "Tudo do plano trimestral",
        "40% de desconto",
        "Consultoria nutricional ilimitada",
        "Programa de acompanhamento VIP",
        "Acesso vitalício a atualizações",
        "Garantia de 60 dias"
      ]
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "")
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned
    return formatted.slice(0, 19)
  }

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
    }
    return cleaned
  }

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length <= 11) {
      return cleaned
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    }
    return value
  }

  const handlePayment = () => {
    // Simulação de processamento de pagamento
    alert("Pagamento processado com sucesso! Bem-vindo ao MetaHealth Premium 🎉")
    onBack()
  }

  if (step === "payment") {
    const currentPlan = plans[selectedPlan]
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">MetaHealth</h1>
                  <p className="text-xs text-gray-600">Checkout Seguro</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setStep("plans")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Formulário de Pagamento */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dados de Pagamento</h2>
              
              <Card className="p-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      placeholder="Como está no cartão"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={(e) => handleInputChange("cpf", formatCPF(e.target.value))}
                      maxLength={14}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Número do cartão</Label>
                    <div className="relative mt-1">
                      <Input
                        id="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                        maxLength={19}
                        className="pl-10"
                      />
                      <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Validade</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/AA"
                        value={formData.expiry}
                        onChange={(e) => handleInputChange("expiry", formatExpiry(e.target.value))}
                        maxLength={5}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                        maxLength={4}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Segurança */}
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <Shield className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-emerald-900">Pagamento 100% Seguro</p>
                  <p className="text-xs text-emerald-700 mt-1">
                    Seus dados são criptografados com SSL de 256 bits. Não armazenamos informações do cartão.
                  </p>
                </div>
              </div>
            </div>

            {/* Resumo do Pedido */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>
              
              <Card className="p-6 mb-6 border-emerald-200">
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <div>
                    <h3 className="font-bold text-gray-900">{currentPlan.name}</h3>
                    <p className="text-sm text-gray-600">Plano {currentPlan.name}</p>
                  </div>
                  {currentPlan.savings && (
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                      {currentPlan.savings}
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">
                      R$ {currentPlan.totalPrice ? currentPlan.totalPrice.toFixed(2) : currentPlan.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Desconto</span>
                    <span className="text-emerald-600 font-semibold">
                      {currentPlan.savings || "R$ 0,00"}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span className="text-gray-900">Total</span>
                    <span className="text-emerald-600">
                      R$ {currentPlan.totalPrice ? currentPlan.totalPrice.toFixed(2) : currentPlan.price.toFixed(2)}
                    </span>
                  </div>
                  {currentPlan.totalPrice && (
                    <p className="text-xs text-gray-500 text-center">
                      Equivalente a R$ {currentPlan.price.toFixed(2)}/{currentPlan.period}
                    </p>
                  )}
                </div>
              </Card>

              <Button 
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg h-12 text-base font-semibold"
                onClick={handlePayment}
              >
                <Lock className="w-5 h-5 mr-2" />
                Finalizar Pagamento
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Ao confirmar, você concorda com nossos{" "}
                <a href="#" className="text-emerald-600 hover:underline">Termos de Uso</a> e{" "}
                <a href="#" className="text-emerald-600 hover:underline">Política de Privacidade</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MetaHealth</h1>
                <p className="text-xs text-gray-600">Escolha seu plano</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header da Página */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Escolha o plano ideal para você
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Todos os planos incluem acesso completo aos recursos. Quanto mais tempo, maior o desconto!
            </p>
            
            {/* Prova Social */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white"></div>
                </div>
                <span className="text-sm text-gray-600 font-medium">+50k usuários</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm text-gray-600 ml-1">4.9/5</span>
              </div>
            </div>
          </div>

          {/* Cards de Planos */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Plano Mensal */}
            <Card 
              className={`p-6 cursor-pointer transition-all duration-300 ${
                selectedPlan === "monthly" 
                  ? "border-emerald-500 border-2 shadow-xl scale-105" 
                  : "border-gray-200 hover:border-emerald-300 hover:shadow-lg"
              }`}
              onClick={() => setSelectedPlan("monthly")}
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plans.monthly.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">R$ {plans.monthly.price.toFixed(2)}</span>
                  <span className="text-gray-600">/{plans.monthly.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plans.monthly.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  selectedPlan === "monthly"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {selectedPlan === "monthly" ? "Selecionado" : "Selecionar"}
              </Button>
            </Card>

            {/* Plano Trimestral - Popular */}
            <Card 
              className={`p-6 cursor-pointer transition-all duration-300 relative ${
                selectedPlan === "quarterly" 
                  ? "border-emerald-500 border-2 shadow-2xl scale-110" 
                  : "border-emerald-300 hover:border-emerald-400 hover:shadow-xl scale-105"
              }`}
              onClick={() => setSelectedPlan("quarterly")}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  MAIS POPULAR
                </span>
              </div>

              <div className="text-center mb-6 mt-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plans.quarterly.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-emerald-600">R$ {plans.quarterly.price.toFixed(2)}</span>
                  <span className="text-gray-600">/{plans.quarterly.period}</span>
                </div>
                <p className="text-sm text-emerald-600 font-semibold mt-1">{plans.quarterly.savings}</p>
                <p className="text-xs text-gray-500 mt-1">Total: R$ {plans.quarterly.totalPrice?.toFixed(2)}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plans.quarterly.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  selectedPlan === "quarterly"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg"
                    : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                }`}
              >
                {selectedPlan === "quarterly" ? "Selecionado" : "Selecionar"}
              </Button>
            </Card>

            {/* Plano Anual */}
            <Card 
              className={`p-6 cursor-pointer transition-all duration-300 ${
                selectedPlan === "annual" 
                  ? "border-emerald-500 border-2 shadow-xl scale-105" 
                  : "border-gray-200 hover:border-emerald-300 hover:shadow-lg"
              }`}
              onClick={() => setSelectedPlan("annual")}
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plans.annual.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">R$ {plans.annual.price.toFixed(2)}</span>
                  <span className="text-gray-600">/{plans.annual.period}</span>
                </div>
                <p className="text-sm text-emerald-600 font-semibold mt-1">{plans.annual.savings}</p>
                <p className="text-xs text-gray-500 mt-1">Total: R$ {plans.annual.totalPrice?.toFixed(2)}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plans.annual.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  selectedPlan === "annual"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {selectedPlan === "annual" ? "Selecionado" : "Selecionar"}
              </Button>
            </Card>
          </div>

          {/* Botão de Continuar */}
          <div className="text-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl px-12 h-14 text-lg font-semibold"
              onClick={() => setStep("payment")}
            >
              Continuar para Pagamento
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Garantia de reembolso de 30 dias • Cancele quando quiser
            </p>
          </div>

          {/* Garantias */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Pagamento Seguro</h3>
              <p className="text-sm text-gray-600">
                Criptografia SSL de 256 bits
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Garantia de Reembolso</h3>
              <p className="text-sm text-gray-600">
                30 dias sem perguntas
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Acesso Imediato</h3>
              <p className="text-sm text-gray-600">
                Comece a usar agora mesmo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
