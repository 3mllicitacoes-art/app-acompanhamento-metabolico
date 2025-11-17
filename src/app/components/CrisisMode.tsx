"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertTriangle, Activity, Droplet, Clock, Phone } from "lucide-react"

interface CrisisModeProps {
  onBack: () => void
  userProfile: any
}

export default function CrisisMode({ onBack, userProfile }: CrisisModeProps) {
  const currentGlucose = 180 // Simulado - alto

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-red-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Modo Crise</h1>
              <p className="text-xs text-gray-600">Orientações para glicemia alta</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Alert Banner */}
        <Card className="bg-gradient-to-r from-red-500 to-orange-600 text-white p-6 mb-6 border-0">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-2">Glicemia elevada detectada</h2>
              <p className="text-red-50 mb-4">
                Sua glicemia está em {currentGlucose} mg/dL. Siga as orientações abaixo para normalizar.
              </p>
              <div className="flex gap-2">
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Normal: 70-100 mg/dL
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Atual: {currentGlucose} mg/dL
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Immediate Actions */}
        <Card className="p-6 mb-4 border-red-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-red-600" />
            Ações imediatas
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-red-50 rounded-lg">
              <div className="bg-red-100 p-2 rounded-lg h-fit">
                <Droplet className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">1. Beba água</h4>
                <p className="text-sm text-gray-700">
                  Beba 2 copos de água imediatamente. A hidratação ajuda a diluir o açúcar no sangue.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-lg h-fit">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">2. Caminhe levemente</h4>
                <p className="text-sm text-gray-700">
                  Faça uma caminhada leve de 10-15 minutos. O movimento ajuda a baixar a glicose.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="bg-purple-100 p-2 rounded-lg h-fit">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">3. Aguarde 30 minutos</h4>
                <p className="text-sm text-gray-700">
                  Espere 30 minutos e meça novamente. Não tome decisões precipitadas.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* What to Eat */}
        <Card className="p-6 mb-4 border-green-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">✓ O que você PODE comer agora</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-gray-900">Vegetais crus (pepino, tomate, alface)</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-gray-900">Proteínas magras (frango grelhado, peixe)</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-gray-900">Chá sem açúcar</span>
            </div>
          </div>
        </Card>

        {/* What to Avoid */}
        <Card className="p-6 mb-4 border-red-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">✕ O que você deve EVITAR</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span className="text-gray-900">Qualquer tipo de açúcar ou doce</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span className="text-gray-900">Pães, massas e arroz branco</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span className="text-gray-900">Frutas (temporariamente)</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span className="text-gray-900">Refrigerantes e sucos</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span className="text-gray-900">Exercícios intensos</span>
            </div>
          </div>
        </Card>

        {/* When to Seek Help */}
        <Card className="p-6 mb-4 border-amber-200 bg-amber-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Phone className="w-6 h-6 text-amber-600" />
            Quando procurar ajuda médica
          </h3>
          <div className="space-y-2 text-gray-900">
            <p>• Glicemia acima de 250 mg/dL</p>
            <p>• Sintomas como náusea, vômito ou dor abdominal</p>
            <p>• Confusão mental ou sonolência excessiva</p>
            <p>• Respiração rápida ou dificuldade para respirar</p>
            <p>• Glicemia não baixa após 2 horas</p>
          </div>
          <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
            <Phone className="w-4 h-4 mr-2" />
            Ligar para emergência
          </Button>
        </Card>

        {/* Prevention Tips */}
        <Card className="p-6 border-emerald-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Como evitar que aconteça novamente</h3>
          <div className="space-y-3 text-gray-700">
            <p className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">1.</span>
              <span>Siga rigorosamente o plano alimentar personalizado</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">2.</span>
              <span>Meça a glicemia nos horários recomendados</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">3.</span>
              <span>Tome os medicamentos conforme prescrito</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">4.</span>
              <span>Faça caminhadas leves após as refeições</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">5.</span>
              <span>Mantenha-se hidratado ao longo do dia</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">6.</span>
              <span>Evite pular refeições</span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
