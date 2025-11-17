"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Camera, Loader2, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"

interface FoodScannerProps {
  onBack: () => void
  userProfile: any
}

export default function FoodScanner({ onBack, userProfile }: FoodScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)

  const handleScan = () => {
    setIsScanning(true)
    // Simula escaneamento
    setTimeout(() => {
      setScanResult({
        food: "Banana média",
        calories: 105,
        carbs: 27,
        protein: 1.3,
        fiber: 3.1,
        glycemicIndex: 51,
        glucoseImpact: "+25 mg/dL",
        recommendation: "moderate",
        alternatives: [
          { name: "Maçã", benefit: "Menor índice glicêmico (38)" },
          { name: "Morango", benefit: "Menos carboidratos (7g)" }
        ]
      })
      setIsScanning(false)
    }, 2000)
  }

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
              <h1 className="text-xl font-bold text-gray-900">Escaneamento AI</h1>
              <p className="text-xs text-gray-600">Análise nutricional inteligente</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Scanner Area */}
        <Card className="p-8 mb-6 border-emerald-200">
          <div className="text-center space-y-4">
            {!scanResult && (
              <>
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                  {isScanning ? (
                    <Loader2 className="w-16 h-16 text-emerald-600 animate-spin" />
                  ) : (
                    <Camera className="w-16 h-16 text-emerald-600" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isScanning ? "Analisando..." : "Aponte para o alimento"}
                </h2>
                <p className="text-gray-600">
                  {isScanning 
                    ? "Identificando nutrientes e calculando impacto glicêmico"
                    : "Posicione a câmera sobre o alimento ou embalagem"
                  }
                </p>
                {!isScanning && (
                  <Button 
                    size="lg"
                    onClick={handleScan}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Iniciar Escaneamento
                  </Button>
                )}
              </>
            )}
          </div>
        </Card>

        {/* Scan Results */}
        {scanResult && (
          <div className="space-y-4">
            <Card className="p-6 border-emerald-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{scanResult.food}</h3>
                  <p className="text-sm text-gray-600">Análise completa</p>
                </div>
                {scanResult.recommendation === "good" && (
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    ✓ Boa escolha
                  </div>
                )}
                {scanResult.recommendation === "moderate" && (
                  <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                    ⚠ Moderação
                  </div>
                )}
                {scanResult.recommendation === "avoid" && (
                  <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                    ✕ Evitar
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Calorias</p>
                  <p className="text-2xl font-bold text-gray-900">{scanResult.calories}</p>
                  <p className="text-xs text-gray-500">kcal</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Carboidratos</p>
                  <p className="text-2xl font-bold text-gray-900">{scanResult.carbs}g</p>
                  <p className="text-xs text-gray-500">total</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Proteínas</p>
                  <p className="text-2xl font-bold text-gray-900">{scanResult.protein}g</p>
                  <p className="text-xs text-gray-500">total</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Fibras</p>
                  <p className="text-2xl font-bold text-gray-900">{scanResult.fiber}g</p>
                  <p className="text-xs text-gray-500">total</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Índice Glicêmico</span>
                  <span className="text-lg font-bold text-amber-600">{scanResult.glycemicIndex}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Impacto na glicose</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                    <span className="text-lg font-bold text-orange-600">{scanResult.glucoseImpact}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Alternatives */}
            <Card className="p-6 border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                Alternativas mais saudáveis
              </h3>
              <div className="space-y-3">
                {scanResult.alternatives.map((alt: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{alt.name}</p>
                      <p className="text-sm text-gray-600">{alt.benefit}</p>
                    </div>
                    <TrendingDown className="w-5 h-5 text-green-600" />
                  </div>
                ))}
              </div>
            </Card>

            <Button 
              onClick={() => setScanResult(null)}
              variant="outline"
              className="w-full"
            >
              Escanear outro alimento
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
