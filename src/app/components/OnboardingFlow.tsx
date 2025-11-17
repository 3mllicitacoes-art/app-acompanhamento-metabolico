"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Activity, ChevronRight, ChevronLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface OnboardingFlowProps {
  onComplete: (profile: any) => void
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({
    dailyRoutine: "",
    sleepHours: "",
    weight: "",
    ageRange: "",
    physicalActivity: "",
    lifestyle: "",
    medications: "",
    mealTimes: "",
    glucoseControl: "",
    goal: ""
  })

  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onComplete(profile)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const updateProfile = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Activity className="w-4 h-4" />
            Passo {step} de {totalSteps}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Vamos conhecer você
          </h1>
          <p className="text-gray-600">
            Essas informações nos ajudam a criar seu plano personalizado
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
                  Como é seu dia típico?
                </h2>
                <Textarea
                  placeholder="Ex: Acordo às 7h, trabalho das 9h às 18h, almoço ao meio-dia..."
                  value={profile.dailyRoutine}
                  onChange={(e) => updateProfile("dailyRoutine", e.target.value)}
                  className="min-h-32"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Horas de sono por noite</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 7"
                    value={profile.sleepHours}
                    onChange={(e) => updateProfile("sleepHours", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Peso atual (kg)</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 75"
                    value={profile.weight}
                    onChange={(e) => updateProfile("weight", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Faixa de idade
                </h2>
                <RadioGroup value={profile.ageRange} onValueChange={(value) => updateProfile("ageRange", value)}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="18-30" id="age1" />
                    <Label htmlFor="age1" className="cursor-pointer flex-1">18-30 anos</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="31-45" id="age2" />
                    <Label htmlFor="age2" className="cursor-pointer flex-1">31-45 anos</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="46-60" id="age3" />
                    <Label htmlFor="age3" className="cursor-pointer flex-1">46-60 anos</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="60+" id="age4" />
                    <Label htmlFor="age4" className="cursor-pointer flex-1">Acima de 60 anos</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Atividade física
                </h2>
                <RadioGroup value={profile.physicalActivity} onValueChange={(value) => updateProfile("physicalActivity", value)}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="sedentary" id="act1" />
                    <Label htmlFor="act1" className="cursor-pointer flex-1">Sedentário (pouca ou nenhuma atividade)</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="light" id="act2" />
                    <Label htmlFor="act2" className="cursor-pointer flex-1">Leve (1-3 dias por semana)</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="moderate" id="act3" />
                    <Label htmlFor="act3" className="cursor-pointer flex-1">Moderado (3-5 dias por semana)</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="intense" id="act4" />
                    <Label htmlFor="act4" className="cursor-pointer flex-1">Intenso (6-7 dias por semana)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Estilo de vida</Label>
                <Textarea
                  placeholder="Ex: Trabalho sentado, estressante, como fora frequentemente..."
                  value={profile.lifestyle}
                  onChange={(e) => updateProfile("lifestyle", e.target.value)}
                  className="min-h-24"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Medicamentos e saúde
                </h2>
                <Label>Usa algum medicamento? Quais?</Label>
                <Textarea
                  placeholder="Ex: Metformina 500mg, Insulina NPH..."
                  value={profile.medications}
                  onChange={(e) => updateProfile("medications", e.target.value)}
                  className="min-h-24 mb-4"
                />
              </div>

              <div>
                <Label>Horários habituais de refeição</Label>
                <Textarea
                  placeholder="Ex: Café 7h, Almoço 12h, Jantar 19h..."
                  value={profile.mealTimes}
                  onChange={(e) => updateProfile("mealTimes", e.target.value)}
                  className="min-h-24"
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Controle glicêmico atual
                </h2>
                <RadioGroup value={profile.glucoseControl} onValueChange={(value) => updateProfile("glucoseControl", value)}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="normal" id="gluc1" />
                    <Label htmlFor="gluc1" className="cursor-pointer flex-1">Normal (não diabético)</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="prediabetic" id="gluc2" />
                    <Label htmlFor="gluc2" className="cursor-pointer flex-1">Pré-diabético</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="type2" id="gluc3" />
                    <Label htmlFor="gluc3" className="cursor-pointer flex-1">Diabetes tipo 2</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="type1" id="gluc4" />
                    <Label htmlFor="gluc4" className="cursor-pointer flex-1">Diabetes tipo 1</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Seu objetivo principal
                </h2>
                <RadioGroup value={profile.goal} onValueChange={(value) => updateProfile("goal", value)}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="weight-loss" id="goal1" />
                    <Label htmlFor="goal1" className="cursor-pointer flex-1">Perder peso</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="glucose-control" id="goal2" />
                    <Label htmlFor="goal2" className="cursor-pointer flex-1">Controlar glicemia</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <RadioGroupItem value="both" id="goal3" />
                    <Label htmlFor="goal3" className="cursor-pointer flex-1">Ambos</Label>
                  </div>
                </RadioGroup>
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
            >
              {step === totalSteps ? "Finalizar" : "Próximo"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
