"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, TrendingUp, TrendingDown, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface NutrientTableProps {
  onBack: () => void
}

const foodDatabase = [
  { name: "Abacate", calories: 160, carbs: 9, protein: 2, fiber: 7, gi: 15, preDiabeticFriendly: true },
  { name: "Arroz branco", calories: 130, carbs: 28, protein: 2.7, fiber: 0.4, gi: 73, preDiabeticFriendly: false },
  { name: "Arroz integral", calories: 111, carbs: 23, protein: 2.6, fiber: 1.8, gi: 50, preDiabeticFriendly: true },
  { name: "Banana", calories: 89, carbs: 23, protein: 1.1, fiber: 2.6, gi: 51, preDiabeticFriendly: false },
  { name: "Batata doce", calories: 86, carbs: 20, protein: 1.6, fiber: 3, gi: 44, preDiabeticFriendly: true },
  { name: "Brócolis", calories: 34, carbs: 7, protein: 2.8, fiber: 2.6, gi: 10, preDiabeticFriendly: true },
  { name: "Frango grelhado", calories: 165, carbs: 0, protein: 31, fiber: 0, gi: 0, preDiabeticFriendly: true },
  { name: "Maçã", calories: 52, carbs: 14, protein: 0.3, fiber: 2.4, gi: 38, preDiabeticFriendly: true },
  { name: "Morango", calories: 32, carbs: 8, protein: 0.7, fiber: 2, gi: 40, preDiabeticFriendly: true },
  { name: "Ovo cozido", calories: 155, carbs: 1.1, protein: 13, fiber: 0, gi: 0, preDiabeticFriendly: true },
  { name: "Pão branco", calories: 265, carbs: 49, protein: 9, fiber: 2.7, gi: 75, preDiabeticFriendly: false },
  { name: "Pão integral", calories: 247, carbs: 41, protein: 13, fiber: 7, gi: 51, preDiabeticFriendly: true },
  { name: "Refrigerante", calories: 42, carbs: 11, protein: 0, fiber: 0, gi: 63, preDiabeticFriendly: false },
  { name: "Salmão", calories: 208, carbs: 0, protein: 20, fiber: 0, gi: 0, preDiabeticFriendly: true },
]

export default function NutrientTable({ onBack }: NutrientTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFood, setSelectedFood] = useState<any>(null)

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tabela de Nutrientes</h1>
              <p className="text-xs text-gray-600">Consulta rápida de alimentos</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Search */}
        <Card className="p-4 mb-6 border-emerald-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar alimento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Food List */}
        <div className="space-y-3 mb-6">
          {filteredFoods.map((food, index) => (
            <Card
              key={index}
              className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                selectedFood?.name === food.name ? "border-emerald-500 border-2" : "border-emerald-100"
              }`}
              onClick={() => setSelectedFood(food)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{food.name}</h3>
                    {food.preDiabeticFriendly && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Recomendado
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>{food.calories} kcal</span>
                    <span>{food.carbs}g carb</span>
                    <span>{food.protein}g prot</span>
                    <span>{food.fiber}g fibra</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">IG</p>
                  <p className={`text-2xl font-bold ${
                    food.gi <= 40 ? "text-green-600" : 
                    food.gi <= 60 ? "text-amber-600" : 
                    "text-red-600"
                  }`}>
                    {food.gi}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Food Details */}
        {selectedFood && (
          <Card className="p-6 border-emerald-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedFood.name}</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-emerald-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Calorias</p>
                <p className="text-2xl font-bold text-gray-900">{selectedFood.calories}</p>
                <p className="text-xs text-gray-500">kcal/100g</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Carboidratos</p>
                <p className="text-2xl font-bold text-gray-900">{selectedFood.carbs}g</p>
                <p className="text-xs text-gray-500">por 100g</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Proteínas</p>
                <p className="text-2xl font-bold text-gray-900">{selectedFood.protein}g</p>
                <p className="text-xs text-gray-500">por 100g</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Fibras</p>
                <p className="text-2xl font-bold text-gray-900">{selectedFood.fiber}g</p>
                <p className="text-xs text-gray-500">por 100g</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">Índice Glicêmico</span>
                <div className="flex items-center gap-2">
                  {selectedFood.gi <= 40 ? (
                    <TrendingDown className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                  )}
                  <span className={`text-2xl font-bold ${
                    selectedFood.gi <= 40 ? "text-green-600" : 
                    selectedFood.gi <= 60 ? "text-amber-600" : 
                    "text-red-600"
                  }`}>
                    {selectedFood.gi}
                  </span>
                </div>
              </div>

              {selectedFood.preDiabeticFriendly ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 mb-1">Excelente escolha!</p>
                      <p className="text-sm text-green-700">
                        Este alimento é recomendado para pré-diabéticos e diabéticos devido ao baixo índice glicêmico e bom perfil nutricional.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900 mb-1">Consumir com moderação</p>
                      <p className="text-sm text-amber-700">
                        Este alimento pode elevar a glicemia rapidamente. Prefira alternativas com menor índice glicêmico.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
