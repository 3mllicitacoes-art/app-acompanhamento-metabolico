"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Camera, Bell, MessageCircle, AlertTriangle, BarChart3, TrendingDown, Droplet, Utensils, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface DashboardProps {
  userProfile: any
  trialDaysLeft: number
  onNavigate: (view: string) => void
}

export default function Dashboard({ userProfile, trialDaysLeft, onNavigate }: DashboardProps) {
  const glucoseLevel = 110 // Simulado
  const todayCalories = 1450
  const targetCalories = 1800

  // Sugestões de refeições brasileiras personalizadas
  const getMealSuggestions = () => {
    const cafeDaManha = [
      { name: "Pão francês com manteiga + Café com leite", calories: 380 },
      { name: "Tapioca com queijo + Suco de laranja", calories: 420 },
      { name: "Pão de queijo + Café com leite", calories: 350 },
      { name: "Bolo simples + Café com leite + Fruta", calories: 400 },
      { name: "Mingau de aveia + Banana + Mel", calories: 320 }
    ]

    const almoco = [
      { name: "Arroz + Feijão + Frango grelhado + Salada", calories: 580 },
      { name: "Arroz + Feijão + Carne moída + Legumes", calories: 620 },
      { name: "Macarrão com molho de tomate + Carne + Salada", calories: 550 },
      { name: "Arroz + Feijão + Peixe grelhado + Legumes", calories: 520 },
      { name: "Arroz + Feijão tropeiro + Bisteca + Couve", calories: 640 }
    ]

    const jantar = [
      { name: "Sopa de legumes + Pão integral", calories: 380 },
      { name: "Omelete com queijo + Salada verde", calories: 420 },
      { name: "Sanduíche natural + Suco natural", calories: 450 },
      { name: "Arroz + Feijão + Frango desfiado (porção menor)", calories: 480 },
      { name: "Tapioca com frango + Salada", calories: 410 }
    ]

    const lanche = [
      { name: "Frutas da estação (banana, maçã, mamão)", calories: 120 },
      { name: "Iogurte natural + Granola", calories: 180 },
      { name: "Pão integral com queijo branco", calories: 200 },
      { name: "Mix de castanhas", calories: 150 },
      { name: "Vitamina de frutas", calories: 160 }
    ]

    // Seleciona aleatoriamente uma opção de cada refeição
    const randomCafe = cafeDaManha[Math.floor(Math.random() * cafeDaManha.length)]
    const randomAlmoco = almoco[Math.floor(Math.random() * almoco.length)]
    const randomJantar = jantar[Math.floor(Math.random() * jantar.length)]

    return {
      cafeDaManha: randomCafe,
      almoco: randomAlmoco,
      jantar: randomJantar
    }
  }

  const mealPlan = getMealSuggestions()

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
                <p className="text-xs text-gray-600">Olá, {userProfile?.name || "Usuário"}!</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Perfil
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Trial Banner */}
        {trialDaysLeft > 0 && (
          <Card className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 mb-6 border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">🎉 Teste grátis ativo</p>
                <p className="text-sm text-amber-50">Restam {trialDaysLeft} dias de acesso completo</p>
              </div>
              <Button className="bg-white text-orange-600 hover:bg-amber-50">
                Assinar agora
              </Button>
            </div>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Glicemia atual</span>
              <Droplet className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{glucoseLevel}</p>
            <p className="text-xs text-emerald-600">mg/dL • Normal</p>
          </Card>

          <Card className="p-4 border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Calorias hoje</span>
              <TrendingDown className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{todayCalories}</p>
            <Progress value={(todayCalories / targetCalories) * 100} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">Meta: {targetCalories} kcal</p>
          </Card>

          <Card className="p-4 border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Peso atual</span>
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{userProfile?.weight || "75"}</p>
            <p className="text-xs text-gray-600">kg</p>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card 
            className="p-6 hover:shadow-xl transition-all cursor-pointer border-emerald-200 hover:border-emerald-400"
            onClick={() => onNavigate("scanner")}
          >
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-xl">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Escanear Alimento</h3>
                <p className="text-sm text-gray-600">Aponte a câmera e veja análise completa</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 hover:shadow-xl transition-all cursor-pointer border-red-200 hover:border-red-400"
            onClick={() => onNavigate("crisis")}
          >
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-red-500 to-orange-600 p-3 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Modo Crise</h3>
                <p className="text-sm text-gray-600">Glicose alta? Ajuda imediata aqui</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Today's Meal Plan - Personalizado para o público brasileiro */}
        <Card className="p-6 mb-6 border-emerald-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Plano de hoje</h2>
            <Utensils className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
              <Clock className="w-5 h-5 text-emerald-600" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Café da manhã • 7h</p>
                <p className="text-sm text-gray-600">{mealPlan.cafeDaManha.name}</p>
              </div>
              <span className="text-sm font-medium text-emerald-700">{mealPlan.cafeDaManha.calories} kcal</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Almoço • 12h</p>
                <p className="text-sm text-gray-600">{mealPlan.almoco.name}</p>
              </div>
              <span className="text-sm font-medium text-gray-700">{mealPlan.almoco.calories} kcal</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Jantar • 19h</p>
                <p className="text-sm text-gray-600">{mealPlan.jantar.name}</p>
              </div>
              <span className="text-sm font-medium text-gray-700">{mealPlan.jantar.calories} kcal</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <strong>Dica:</strong> Essas sugestões são baseadas em alimentos comuns da culinária brasileira e adaptadas para controle glicêmico. Você pode ajustar as porções conforme sua necessidade.
            </p>
          </div>
        </Card>

        {/* Additional Features */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card 
            className="p-4 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => onNavigate("nutrients")}
          >
            <BarChart3 className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Tabela de Nutrientes</h3>
            <p className="text-sm text-gray-600">Consulte valores nutricionais</p>
          </Card>

          <Card 
            className="p-4 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => onNavigate("chat")}
          >
            <MessageCircle className="w-8 h-8 text-cyan-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Chat Nutricional</h3>
            <p className="text-sm text-gray-600">Tire suas dúvidas com IA</p>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer">
            <Bell className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Lembretes</h3>
            <p className="text-sm text-gray-600">Configure notificações</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
