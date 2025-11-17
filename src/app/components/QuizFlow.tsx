"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Activity, ChevronRight, ChevronLeft, Mail, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface QuizFlowProps {
  userProfile: any
  onComplete: (preferences: any) => void
}

export default function QuizFlow({ userProfile, onComplete }: QuizFlowProps) {
  const [step, setStep] = useState(1)
  const [preferences, setPreferences] = useState({
    favoriteFoods: "",
    favoriteMeals: "",
    restrictions: "",
    favoriteFlavorProfile: "",
    hungerTimes: "",
    mainDifficulty: "",
    primaryGoal: "",
    email: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const updatePreferences = (field: string, value: string) => {
    setPreferences({ ...preferences, [field]: value })
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    // Simula envio de e-mail
    setTimeout(() => {
      onComplete(preferences)
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full p-8 md:p-12 text-center border-emerald-200">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dieta personalizada em criação!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Estamos gerando suas duas opções de dieta premium baseadas nas suas preferências.
          </p>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <Mail className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-bold text-gray-900 mb-2">Você receberá por e-mail:</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">A)</span>
                    <span><strong>Dieta para Perda de Peso:</strong> Suas comidas favoritas em versão baixa caloria</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">B)</span>
                    <span><strong>Dieta para Controle Glicêmico:</strong> Suas comidas favoritas sem ultrapassar limite de glicose</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600">
                📧 Enviando para: <strong className="text-gray-900">{preferences.email}</strong>
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center mb-6">
            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
          <p className="text-sm text-gray-500">
            Aguarde alguns instantes enquanto processamos suas informações...
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Activity className="w-4 h-4" />
            Quiz Premium • Passo {step} de {totalSteps}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Dieta com suas comidas favoritas
          </h1>
          <p className="text-gray-600">
            Responda rápido para receber seu plano personalizado por e-mail
          </p>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="mb-8" />

        {/* Step Content */}
        <Card className="p-6 md:p-8 shadow-xl border-emerald-100">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Suas comidas favoritas
                </h2>
                <Label>Quais são suas 3-5 comidas favoritas?</Label>
                <Textarea
                  placeholder="Ex: Pizza, lasanha, brigadeiro, hambúrguer, sorvete..."
                  value={preferences.favoriteFoods}
                  onChange={(e) => updatePreferences("favoriteFoods", e.target.value)}
                  className="min-h-32 mt-2"
                />
              </div>

              <div>
                <Label>Qual sua refeição preferida do dia?</Label>
                <RadioGroup value={preferences.favoriteMeals} onValueChange={(value) => updatePreferences("favoriteMeals", value)}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="breakfast" id="meal1" />
                    <Label htmlFor="meal1" className="cursor-pointer flex-1">Café da manhã</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="lunch" id="meal2" />
                    <Label htmlFor="meal2" className="cursor-pointer flex-1">Almoço</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="dinner" id="meal3" />
                    <Label htmlFor="meal3" className="cursor-pointer flex-1">Jantar</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Restrições e preferências
                </h2>
                <Label>Tem alguma restrição alimentar?</Label>
                <Textarea
                  placeholder="Ex: Intolerância à lactose, alergia a frutos do mar, vegetariano..."
                  value={preferences.restrictions}
                  onChange={(e) => updatePreferences("restrictions", e.target.value)}
                  className="min-h-24 mt-2"
                />
              </div>

              <div>
                <Label>Qual sabor você mais gosta?</Label>
                <RadioGroup value={preferences.favoriteFlavorProfile} onValueChange={(value) => updatePreferences("favoriteFlavorProfile", value)}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="sweet" id="flavor1" />
                    <Label htmlFor="flavor1" className="cursor-pointer flex-1">Doce</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="salty" id="flavor2" />
                    <Label htmlFor="flavor2" className="cursor-pointer flex-1">Salgado</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="spicy" id="flavor3" />
                    <Label htmlFor="flavor3" className="cursor-pointer flex-1">Picante</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="balanced" id="flavor4" />
                    <Label htmlFor="flavor4" className="cursor-pointer flex-1">Equilibrado</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Seus desafios
                </h2>
                <Label>Em quais horários você sente mais fome?</Label>
                <Textarea
                  placeholder="Ex: Meio da tarde (15h), depois do jantar (21h)..."
                  value={preferences.hungerTimes}
                  onChange={(e) => updatePreferences("hungerTimes", e.target.value)}
                  className="min-h-24 mt-2"
                />
              </div>

              <div>
                <Label>Qual sua maior dificuldade?</Label>
                <RadioGroup value={preferences.mainDifficulty} onValueChange={(value) => updatePreferences("mainDifficulty", value)}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="cravings" id="diff1" />
                    <Label htmlFor="diff1" className="cursor-pointer flex-1">Controlar vontade de comer doces</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="portions" id="diff2" />
                    <Label htmlFor="diff2" className="cursor-pointer flex-1">Controlar porções</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="routine" id="diff3" />
                    <Label htmlFor="diff3" className="cursor-pointer flex-1">Manter rotina alimentar</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="glucose" id="diff4" />
                    <Label htmlFor="diff4" className="cursor-pointer flex-1">Controlar picos de glicose</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Objetivo principal
                </h2>
                <RadioGroup value={preferences.primaryGoal} onValueChange={(value) => updatePreferences("primaryGoal", value)}>
                  <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="weight-loss" id="goal1" />
                    <div className="flex-1">
                      <Label htmlFor="goal1" className="cursor-pointer font-bold text-gray-900">Perder peso</Label>
                      <p className="text-sm text-gray-600">Receberá: Dieta com comidas favoritas em versão baixa caloria</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="glucose-control" id="goal2" />
                    <div className="flex-1">
                      <Label htmlFor="goal2" className="cursor-pointer font-bold text-gray-900">Controlar glicemia</Label>
                      <p className="text-sm text-gray-600">Receberá: Dieta sem ultrapassar limite de glicose</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="both" id="goal3" />
                    <div className="flex-1">
                      <Label htmlFor="goal3" className="cursor-pointer font-bold text-gray-900">Ambos</Label>
                      <p className="text-sm text-gray-600">Receberá: As duas opções de dieta por e-mail</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>E-mail para receber suas dietas personalizadas</Label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={preferences.email}
                  onChange={(e) => updatePreferences("email", e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Você receberá 2 PDFs completos com suas dietas personalizadas
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Voltar
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 gap-2"
              disabled={step === 4 && !preferences.email}
            >
              {step === totalSteps ? (
                <>
                  <Mail className="w-4 h-4" />
                  Gerar minhas dietas
                </>
              ) : (
                <>
                  Próximo
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
