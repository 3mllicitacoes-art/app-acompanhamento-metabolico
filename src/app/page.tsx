"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Activity, Camera, Bell, MessageCircle, AlertTriangle, BarChart3, User, Utensils, Star, CheckCircle, TrendingDown, Heart, Shield, Zap } from "lucide-react"
import OnboardingFlow from "./components/OnboardingFlow"
import Dashboard from "./components/Dashboard"
import FoodScanner from "./components/FoodScanner"
import NutrientTable from "./components/NutrientTable"
import CrisisMode from "./components/CrisisMode"
import AIChat from "./components/AIChat"
import QuizFlow from "./components/QuizFlow"
import SignUp from "./components/SignUp"
import Checkout from "./components/Checkout"
import Login from "./components/Login"

export default function Home() {
  const [currentView, setCurrentView] = useState<"welcome" | "login" | "signup" | "onboarding" | "dashboard" | "scanner" | "nutrients" | "crisis" | "chat" | "quiz" | "checkout">("welcome")
  const [userProfile, setUserProfile] = useState<any>(null)
  const [userData, setUserData] = useState<any>(null)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [trialDaysLeft, setTrialDaysLeft] = useState(3)

  const handleSignUpComplete = (data: any) => {
    setUserData(data)
    setCurrentView("onboarding")
  }

  const handleOnboardingComplete = (profile: any) => {
    setUserProfile({ ...profile, ...userData })
    setHasCompletedOnboarding(true)
    setCurrentView("dashboard")
  }

  const handleQuizComplete = (preferences: any) => {
    console.log("Quiz completo:", preferences)
    setCurrentView("dashboard")
  }

  const handleLoginSuccess = () => {
    // Simula usuário já com onboarding completo
    setHasCompletedOnboarding(true)
    setUserProfile({ name: "Usuário", email: "usuario@email.com" })
    setCurrentView("dashboard")
  }

  if (currentView === "login") {
    return <Login onBack={() => setCurrentView("welcome")} onLoginSuccess={handleLoginSuccess} />
  }

  if (currentView === "checkout") {
    return <Checkout onBack={() => setCurrentView("welcome")} />
  }

  if (currentView === "signup") {
    return <SignUp onComplete={handleSignUpComplete} />
  }

  if (currentView === "onboarding") {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />
  }

  if (currentView === "quiz") {
    return <QuizFlow userProfile={userProfile} onComplete={handleQuizComplete} />
  }

  if (currentView === "dashboard" && hasCompletedOnboarding) {
    return (
      <Dashboard 
        userProfile={userProfile}
        trialDaysLeft={trialDaysLeft}
        onNavigate={setCurrentView}
      />
    )
  }

  if (currentView === "scanner") {
    return <FoodScanner onBack={() => setCurrentView("dashboard")} userProfile={userProfile} />
  }

  if (currentView === "nutrients") {
    return <NutrientTable onBack={() => setCurrentView("dashboard")} />
  }

  if (currentView === "crisis") {
    return <CrisisMode onBack={() => setCurrentView("dashboard")} userProfile={userProfile} />
  }

  if (currentView === "chat") {
    return <AIChat onBack={() => setCurrentView("dashboard")} userProfile={userProfile} />
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
                <h1 className="text-lg font-bold text-gray-900">
                  Meta<span className="text-emerald-600">Health</span>
                </h1>
                <p className="text-xs text-gray-600">Seu acompanhante metabólico</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => setCurrentView("login")}
              >
                <User className="w-4 h-4" />
                Entrar
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white gap-2"
                onClick={() => setCurrentView("signup")}
              >
                Criar conta
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section com Imagem */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Conteúdo */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                <Activity className="w-4 h-4" />
                Teste grátis por 3 dias
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Controle sua glicemia e peso com{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  inteligência artificial
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600">
                Planos personalizados, escaneamento de alimentos, alertas inteligentes e acompanhamento em tempo real para pré-diabéticos, diabéticos e quem busca perder peso.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/30 gap-2 text-base px-8 py-6"
                  onClick={() => setCurrentView("signup")}
                >
                  <Activity className="w-5 h-5" />
                  Começar teste grátis
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8 py-6"
                >
                  Ver como funciona
                </Button>
              </div>

              <p className="text-sm text-gray-500">
                ✓ Sem cartão de crédito • ✓ Acesso completo • ✓ Cancele quando quiser
              </p>
            </div>

            {/* Imagem Hero */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop" 
                  alt="Alimentação saudável"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent"></div>
              </div>
              
              {/* Cards flutuantes */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">-12kg</p>
                    <p className="text-sm text-gray-600">Média em 3 meses</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">98%</p>
                    <p className="text-sm text-gray-600">Satisfação</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prova Social - Depoimentos */}
      <section className="bg-white py-12 md:py-16 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Mais de 50.000 pessoas já transformaram sua saúde
              </h2>
              <div className="flex items-center justify-center gap-2 text-yellow-500">
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
                <span className="text-gray-700 ml-2 font-semibold">4.9/5 (2.847 avaliações)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Depoimento 1 */}
              <Card className="p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-4 text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-gray-700 mb-4">
                  "Em 2 meses consegui baixar minha glicemia de 180 para 110. O app me ajudou a entender o que comer e quando comer. Mudou minha vida!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
                    MC
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Maria Clara</p>
                    <p className="text-sm text-gray-600">São Paulo, SP</p>
                  </div>
                </div>
              </Card>

              {/* Depoimento 2 */}
              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-emerald-200">
                <div className="flex items-center gap-2 mb-4 text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-gray-700 mb-4">
                  "Perdi 15kg em 4 meses! O escaneamento de alimentos é incrível, me ajuda a fazer escolhas melhores no dia a dia. Recomendo demais!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                    RS
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Roberto Silva</p>
                    <p className="text-sm text-gray-600">Rio de Janeiro, RJ</p>
                  </div>
                </div>
              </Card>

              {/* Depoimento 3 */}
              <Card className="p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-4 text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-gray-700 mb-4">
                  "Sou pré-diabética e estava perdida. O MetaHealth me deu um plano claro e fácil de seguir. Meus exames melhoraram muito!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
                    AP
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ana Paula</p>
                    <p className="text-sm text-gray-600">Belo Horizonte, MG</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">50k+</div>
              <p className="text-gray-600">Usuários ativos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">-12kg</div>
              <p className="text-gray-600">Perda média de peso</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">98%</div>
              <p className="text-gray-600">Taxa de satisfação</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">4.9★</div>
              <p className="text-gray-600">Avaliação média</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid com Imagens */}
      <section className="container mx-auto px-4 py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Recursos que fazem a diferença
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Tudo que você precisa para controlar sua saúde metabólica em um só lugar
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-emerald-100 hover:border-emerald-300 hover:scale-105 cursor-pointer">
              <div className="mb-4 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop" 
                  alt="Escaneamento de alimentos"
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Escaneamento AI</h3>
              <p className="text-gray-600">
                Aponte a câmera para qualquer alimento e receba análise completa: calorias, carboidratos, índice glicêmico e impacto na sua glicose.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-emerald-100 hover:border-emerald-300 hover:scale-105 cursor-pointer">
              <div className="mb-4 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=250&fit=crop" 
                  alt="Plano alimentar personalizado"
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Plano Personalizado</h3>
              <p className="text-gray-600">
                Dieta criada especialmente para você, com suas comidas favoritas adaptadas para controle glicêmico ou perda de peso.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-emerald-100 hover:border-emerald-300 hover:scale-105 cursor-pointer">
              <div className="mb-4 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=250&fit=crop" 
                  alt="Lembretes inteligentes"
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lembretes Inteligentes</h3>
              <p className="text-gray-600">
                Notificações personalizadas para medir glicemia, tomar medicamentos, beber água e fazer caminhadas pós-refeição.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-emerald-100 hover:border-emerald-300 hover:scale-105 cursor-pointer">
              <div className="bg-gradient-to-br from-red-500 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Modo Crise</h3>
              <p className="text-gray-600">
                Glicose disparou? Receba orientações imediatas sobre o que fazer, comer e evitar até normalizar.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-emerald-100 hover:border-emerald-300 hover:scale-105 cursor-pointer">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Chat Nutricional AI</h3>
              <p className="text-gray-600">
                Tire dúvidas em tempo real: "Posso comer isso agora?", "O que fazer depois dessa refeição?". A IA responde baseada no seu perfil.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-emerald-100 hover:border-emerald-300 hover:scale-105 cursor-pointer">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tabela de Nutrientes</h3>
              <p className="text-gray-600">
                Consulte rapidamente fibras, proteínas, carboidratos e compare alimentos com selo "Melhor para pré-diabéticos".
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefícios com Ícones */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Por que escolher o MetaHealth?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100% Seguro</h3>
              <p className="text-gray-600">
                Seus dados de saúde são criptografados e protegidos com os mais altos padrões de segurança
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Resultados Rápidos</h3>
              <p className="text-gray-600">
                Veja melhorias na sua glicemia e peso já nas primeiras semanas de uso
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fácil de Usar</h3>
              <p className="text-gray-600">
                Interface intuitiva e simples, pensada para todas as idades
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section com Imagem de Fundo */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=1200&h=600&fit=crop" 
              alt="Vida saudável"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/95 to-teal-600/95"></div>
          </div>
          
          <div className="relative p-8 md:p-12 text-center text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Comece sua transformação hoje
            </h2>
            <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já estão controlando sua saúde metabólica de forma inteligente e personalizada.
            </p>
            <Button 
              size="lg"
              className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl gap-2 text-base px-8 py-6"
              onClick={() => setCurrentView("signup")}
            >
              <Activity className="w-5 h-5" />
              Iniciar teste grátis de 3 dias
            </Button>
            <p className="text-sm text-emerald-100">
              Acesso completo • Sem compromisso • Cancele quando quiser
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Rápido */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Perguntas Frequentes
            </h2>
            
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">O teste grátis é realmente sem compromisso?</h3>
                <p className="text-gray-600">
                  Sim! Você tem 3 dias de acesso completo sem precisar cadastrar cartão de crédito. Cancele quando quiser.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">O app funciona para diabéticos tipo 1 e tipo 2?</h3>
                <p className="text-gray-600">
                  Sim! O MetaHealth é indicado para pré-diabéticos, diabéticos tipo 1 e 2, e também para quem busca perda de peso saudável.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">Preciso de equipamentos especiais?</h3>
                <p className="text-gray-600">
                  Não! Apenas seu smartphone. O app funciona com a câmera do celular para escanear alimentos.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">MetaHealth</span>
              </div>
              <p className="text-sm text-gray-400">
                Seu acompanhante metabólico inteligente
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Recursos</a></li>
                <li><button onClick={() => setCurrentView("checkout")} className="hover:text-emerald-400 transition-colors">Preços</button></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Depoimentos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 MetaHealth. Feito com ❤️ para sua saúde metabólica.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
