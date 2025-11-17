"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, TrendingUp, TrendingDown, CheckCircle2, Plus, Trash2, UtensilsCrossed } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface NutrientTableProps {
  onBack: () => void
}

interface ConsumedFood {
  food: any
  quantity: number
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
  const [consumedFoods, setConsumedFoods] = useState<ConsumedFood[]>([])
  const [selectedFood, setSelectedFood] = useState<any>(null)
  const [quantity, setQuantity] = useState("100")

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addFood = (food: any) => {
    const qty = parseFloat(quantity) || 100
    setConsumedFoods([...consumedFoods, { food, quantity: qty }])
    setSelectedFood(null)
    setSearchTerm("")
    setQuantity("100")
  }

  const removeFood = (index: number) => {
    setConsumedFoods(consumedFoods.filter((_, i) => i !== index))
  }

  const calculateTotals = () => {
    return consumedFoods.reduce(
      (acc, item) => {
        const multiplier = item.quantity / 100
        return {
          calories: acc.calories + item.food.calories * multiplier,
          carbs: acc.carbs + item.food.carbs * multiplier,
          protein: acc.protein + item.food.protein * multiplier,
          fiber: acc.fiber + item.food.fiber * multiplier,
        }
      },
      { calories: 0, carbs: 0, protein: 0, fiber: 0 }
    )
  }

  const totals = calculateTotals()

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
              <p className="text-xs text-gray-600">Adicione o que você comeu</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Add Food Section */}
        <Card className="p-6 mb-6 border-emerald-200">
          <div className="flex items-center gap-2 mb-4">
            <UtensilsCrossed className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-gray-900">Adicionar Alimento</h2>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar alimento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
              {filteredFoods.map((food, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedFood?.name === food.name
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200 hover:border-emerald-300"
                  }`}
                  onClick={() => setSelectedFood(food)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{food.name}</span>
                      {food.preDiabeticFriendly && (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Recomendado
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">{food.calories} kcal</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity Input */}
          {selectedFood && (
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Quantidade (gramas)
                  </label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="100"
                    className="bg-white"
                  />
                </div>
                <Button
                  onClick={() => addFood(selectedFood)}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white mt-6"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{selectedFood.name}</span> - {selectedFood.calories} kcal por 100g
              </p>
            </div>
          )}
        </Card>

        {/* Consumed Foods List */}
        {consumedFoods.length > 0 && (
          <>
            <Card className="p-6 mb-6 border-emerald-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Alimentos Consumidos</h2>
              <div className="space-y-3">
                {consumedFoods.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{item.food.name}</span>
                        {item.food.preDiabeticFriendly && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Recomendado
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>{item.quantity}g</span>
                        <span>{Math.round((item.food.calories * item.quantity) / 100)} kcal</span>
                        <span>{Math.round((item.food.carbs * item.quantity) / 100)}g carb</span>
                        <span>{Math.round((item.food.protein * item.quantity) / 100)}g prot</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFood(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Nutrient Summary Table */}
            <Card className="p-6 border-emerald-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumo Nutricional Total</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-xl text-white text-center shadow-lg">
                  <p className="text-sm opacity-90 mb-1">Calorias Totais</p>
                  <p className="text-3xl font-bold">{Math.round(totals.calories)}</p>
                  <p className="text-xs opacity-80 mt-1">kcal</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-xl text-white text-center shadow-lg">
                  <p className="text-sm opacity-90 mb-1">Carboidratos</p>
                  <p className="text-3xl font-bold">{Math.round(totals.carbs)}</p>
                  <p className="text-xs opacity-80 mt-1">gramas</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-xl text-white text-center shadow-lg">
                  <p className="text-sm opacity-90 mb-1">Proteínas</p>
                  <p className="text-3xl font-bold">{Math.round(totals.protein)}</p>
                  <p className="text-xs opacity-80 mt-1">gramas</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl text-white text-center shadow-lg">
                  <p className="text-sm opacity-90 mb-1">Fibras</p>
                  <p className="text-3xl font-bold">{Math.round(totals.fiber)}</p>
                  <p className="text-xs opacity-80 mt-1">gramas</p>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="border-t pt-6">
                <h3 className="font-bold text-gray-900 mb-4">Detalhamento por Alimento</h3>
                <div className="space-y-3">
                  {consumedFoods.map((item, index) => {
                    const multiplier = item.quantity / 100
                    return (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{item.food.name}</span>
                            <span className="text-sm text-gray-600">({item.quantity}g)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.food.gi <= 40 ? (
                              <TrendingDown className="w-4 h-4 text-green-600" />
                            ) : (
                              <TrendingUp className="w-4 h-4 text-orange-600" />
                            )}
                            <span
                              className={`text-sm font-bold ${
                                item.food.gi <= 40
                                  ? "text-green-600"
                                  : item.food.gi <= 60
                                  ? "text-amber-600"
                                  : "text-red-600"
                              }`}
                            >
                              IG {item.food.gi}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-3 text-center">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Calorias</p>
                            <p className="font-bold text-gray-900">
                              {Math.round(item.food.calories * multiplier)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Carboidratos</p>
                            <p className="font-bold text-gray-900">
                              {Math.round(item.food.carbs * multiplier)}g
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Proteínas</p>
                            <p className="font-bold text-gray-900">
                              {Math.round(item.food.protein * multiplier)}g
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Fibras</p>
                            <p className="font-bold text-gray-900">
                              {Math.round(item.food.fiber * multiplier)}g
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Recommendations */}
              <div className="border-t pt-6 mt-6">
                <h3 className="font-bold text-gray-900 mb-4">Análise Geral</h3>
                {consumedFoods.some((item) => !item.food.preDiabeticFriendly) ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-amber-900 mb-1">Atenção aos alimentos</p>
                        <p className="text-sm text-amber-700">
                          Você consumiu alguns alimentos com alto índice glicêmico. Considere substituí-los por
                          opções mais saudáveis nas próximas refeições.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-900 mb-1">Excelentes escolhas!</p>
                        <p className="text-sm text-green-700">
                          Todos os alimentos consumidos são recomendados para controle glicêmico. Continue assim!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </>
        )}

        {/* Empty State */}
        {consumedFoods.length === 0 && (
          <Card className="p-12 text-center border-emerald-200">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UtensilsCrossed className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum alimento adicionado</h3>
            <p className="text-gray-600 mb-6">
              Comece buscando e adicionando os alimentos que você consumiu para ver a tabela nutricional completa.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
