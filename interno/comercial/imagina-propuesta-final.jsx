import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Target, Shield, Check, AlertCircle, Zap, MessageSquare, Phone, Instagram, BarChart3, Clock, ArrowRight, Calendar, Sparkles } from 'lucide-react';

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-stone-200 rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
);

export default function ImaginaPropuestaFinal() {
  const [activeTab, setActiveTab] = useState('conservador');

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .gold-gradient { background: linear-gradient(135deg, #C4A35A 0%, #D4B86A 50%, #B8995A 100%); }
      `}</style>

      {/* Hero */}
      <section className="relative px-6 pt-16 pb-12 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-amber-400 text-sm font-medium">AnÃ¡lisis Operativo â€” Imagina</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            1 Setup. Todos los Proyectos.<br/>ROI desde el Primer Mes.
          </h1>
          <p className="text-stone-300 text-lg max-w-2xl mx-auto">
            Con tus nÃºmeros actuales: <span className="text-amber-400 font-semibold">1 solo cierre adicional</span> recupera la inversiÃ³n completa.
          </p>
        </div>
      </section>

      {/* RadiografÃ­a Operativa */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-amber-600 text-sm font-semibold uppercase tracking-wide mb-2">Tu operaciÃ³n hoy</p>
          <h2 className="font-serif text-3xl text-stone-900">RadiografÃ­a con Tus NÃºmeros</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-stone-500 text-sm font-medium mb-3">Leads Mensuales</p>
            <p className="text-5xl font-bold text-stone-900 mb-2">6,000</p>
            <p className="text-sm text-stone-500">$36k USD invertidos en marketing</p>
          </Card>

          <Card className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-stone-500 text-sm font-medium mb-3">Tareas Totales</p>
            <p className="text-5xl font-bold text-stone-900 mb-2">27,000</p>
            <p className="text-sm text-stone-500">Por mes en el pipeline</p>
          </Card>

          <Card className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <Target className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <p className="text-stone-500 text-sm font-medium mb-3">ConversiÃ³n a Visita</p>
            <p className="text-5xl font-bold text-stone-900 mb-2">7%</p>
            <p className="text-sm text-stone-500">420 visitados/mes de 6,000</p>
          </Card>
        </div>

        <Card className="p-6 bg-red-50 border-red-200">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-stone-900 mb-2">Cuello de Botella CrÃ­tico</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-stone-700"><strong>Contactabilidad:</strong> 4 personas</p>
                  <p className="text-stone-600">12,439 tareas â†’ <strong className="text-red-700">130 tareas/dÃ­a/persona</strong></p>
                </div>
                <div>
                  <p className="text-stone-700"><strong>75% de la carga</strong> operativa estÃ¡ <strong>antes de la visita</strong></p>
                  <p className="text-stone-600 mt-1">FricciÃ³n en primeras 24-72h = leads perdidos</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* ProyecciÃ³n ROI */}
      <section className="px-6 py-16 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-amber-600 text-lg font-semibold uppercase tracking-wide mb-2" style={{ fontSize: '1.35em' }}>Impacto Esperado</p>
            <h2 className="font-serif text-3xl text-stone-900 mb-3">ProyecciÃ³n de ROI con Tus NÃºmeros</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Estas cifras asumen solo optimizaciÃ³n en contactabilidad (primeras 24-72h) sin tocar el proceso de ventas.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveTab('conservador')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'conservador'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              Escenario Conservador
            </button>
            <button
              onClick={() => setActiveTab('mediano')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'mediano'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              Escenario Mediano
            </button>
          </div>

          {/* Escenario Conservador */}
          {activeTab === 'conservador' && (
            <div className="space-y-6">
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-stone-900">+2% ConversiÃ³n (7% â†’ 9%)</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">Muy conservador</span>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm text-stone-500 uppercase tracking-wide mb-3">MatemÃ¡tica</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-stone-700">6,000 leads Ã— 9% = <strong className="text-stone-900">540 visitados/mes</strong></p>
                      <p className="text-stone-700">Actual: 420 visitados/mes</p>
                      <p className="text-amber-600 font-semibold text-base">= 120 visitados EXTRA/mes</p>
                      <div className="border-t border-stone-200 my-3 pt-3">
                        <p className="text-stone-700">120 Ã— 35% asistencia = <strong>42 visitas reales extra</strong></p>
                        <p className="text-stone-700">42 Ã— 14% cierre = <strong className="text-green-600 text-lg">6 cierres extra/mes</strong></p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 font-medium mb-2">Ingreso Incremental Mensual</p>
                    <p className="text-4xl font-bold text-green-900 mb-1">$2.52M</p>
                    <p className="text-sm text-green-600">6 cierres Ã— $420k ticket promedio</p>
                    <div className="mt-4 pt-4 border-t border-green-200">
                      <p className="text-xs text-green-700 uppercase tracking-wide mb-1">Anual proyectado</p>
                      <p className="text-2xl font-bold text-green-900">$30.24M</p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-stone-800">
                      <strong>InversiÃ³n FIXU setup:</strong> $2,360 USD (setup con IGV)
                    </p>
                    <p className="text-sm text-stone-800 mt-1">
                      <strong>Fee mensual:</strong> $236 USD/mes una vez funcional
                    </p>
                    <p className="text-sm text-amber-700 font-semibold mt-2">
                      Setup se recupera con 0.14 cierres (menos de 1 cierre adicional)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Escenario Mediano */}
          {activeTab === 'mediano' && (
            <div className="space-y-6">
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-stone-900">+4% ConversiÃ³n (7% â†’ 11%)</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">Realista</span>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm text-stone-500 uppercase tracking-wide mb-3">MatemÃ¡tica</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-stone-700">6,000 leads Ã— 11% = <strong className="text-stone-900">660 visitados/mes</strong></p>
                      <p className="text-stone-700">Actual: 420 visitados/mes</p>
                      <p className="text-amber-600 font-semibold text-base">= 240 visitados EXTRA/mes</p>
                      <div className="border-t border-stone-200 my-3 pt-3">
                        <p className="text-stone-700">240 Ã— 35% asistencia = <strong>84 visitas reales extra</strong></p>
                        <p className="text-stone-700">84 Ã— 14% cierre = <strong className="text-blue-600 text-lg">12 cierres extra/mes</strong></p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700 font-medium mb-2">Ingreso Incremental Mensual</p>
                    <p className="text-4xl font-bold text-blue-900 mb-1">$5.04M</p>
                    <p className="text-sm text-blue-600">12 cierres Ã— $420k ticket promedio</p>
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <p className="text-xs text-blue-700 uppercase tracking-wide mb-1">Anual proyectado</p>
                      <p className="text-2xl font-bold text-blue-900">$60.48M</p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-stone-800">
                      Este escenario asume mejor filtrado de intenciÃ³n + seguimiento automatizado en primeras 72h + nutriciÃ³n activa de leads tibios.
                    </p>
                    <p className="text-sm text-blue-700 font-semibold mt-2">
                      ROI: 1,744% en el primer mes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Por quÃ© este pricing */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-amber-600 text-sm font-semibold uppercase tracking-wide mb-2">JustificaciÃ³n de InversiÃ³n</p>
          <h2 className="font-serif text-3xl text-stone-900">Por QuÃ© Este Pricing Es Ã“ptimo</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="font-semibold text-stone-900 mb-4">Si Contratas por "Horas TÃ©cnicas"</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-600">AuditorÃ­a operativa (8h)</span>
                <span className="font-medium">$320</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">DiseÃ±o conversacional (12h)</span>
                <span className="font-medium">$480</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">IntegraciÃ³n HubSpot (20h)</span>
                <span className="font-medium">$800</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">ConstrucciÃ³n agente IA (30h)</span>
                <span className="font-medium">$1,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Testing + ajustes (15h)</span>
                <span className="font-medium">$600</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">PersonalizaciÃ³n marca (10h)</span>
                <span className="font-medium">$400</span>
              </div>
              <div className="border-t border-stone-200 pt-3 flex justify-between font-bold text-base">
                <span>Total horas tÃ©cnicas</span>
                <span className="text-red-600">$3,800</span>
              </div>
            </div>
            <p className="text-xs text-stone-500 mt-4">Asumiendo $40/hora (tu referencia de HubSpot)</p>
          </Card>

          <Card className="p-6 bg-green-50 border-green-200">
            <h3 className="font-semibold text-stone-900 mb-4">Con FIXU</h3>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-stone-600">Setup completo (todo incluido)</span>
                <span className="font-medium">$2,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">IGV (18%)</span>
                <span className="font-medium">$360</span>
              </div>
              <div className="border-t border-stone-300 pt-3 flex justify-between font-bold text-base">
                <span>Total setup</span>
                <span className="text-green-600">$2,360</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-green-300">
              <p className="text-xs text-stone-600 uppercase tracking-wide mb-2">Ahorro vs horas tÃ©cnicas</p>
              <p className="text-2xl font-bold text-green-700">$1,440 USD</p>
              <p className="text-xs text-stone-500 mt-1">38% menos + garantÃ­a de resultados</p>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-amber-50 border-amber-200">
          <div className="flex items-start gap-4">
            <DollarSign className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-stone-900 mb-2">Valor Multiplicador del Setup</h3>
              <p className="text-sm text-stone-700 mb-3">
                Este setup <strong>NO es por proyecto</strong>. Una vez implementado, sirve para:
              </p>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-stone-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Alto Metro Park</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Alto Lima Park</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Alto Bellavista</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Ocean Breath</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Unity Park</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Family Too</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>One Place</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span><strong>Proyecto $1.1M</strong> (Q1 2026)</span>
                </div>
              </div>
              <p className="text-sm text-amber-700 font-semibold mt-4">
                1 inversiÃ³n. 8+ proyectos. Escalabilidad sin costo adicional de setup.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Proyecto ImaginIA */}
      <section className="px-6 py-16 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-wide mb-2">VisiÃ³n a Largo Plazo</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-3">Proyecto ImaginIA</h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              El agente de WhatsApp es la base. El ecosistema completo potencia cada etapa del pipeline.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border-stone-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="font-bold text-stone-900">Agente WhatsApp</h3>
              </div>
              <p className="text-sm text-stone-600 mb-4">
                Contacto inicial, nutriciÃ³n, filtrado, agendamiento. ReducciÃ³n inmediata de carga en contactabilidad.
              </p>
              <span className="inline-block px-3 py-1 bg-green-500/20 text-green-700 text-xs font-semibold rounded-full">
                Setup actual
              </span>
            </Card>

            <Card className="p-6 bg-white border-stone-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-bold text-stone-900">Seguimientos AutomÃ¡ticos</h3>
              </div>
              <p className="text-sm text-stone-600 mb-4">
                Tareas SLA en HubSpot ejecutadas automÃ¡ticamente. ReasignaciÃ³n inteligente de leads estancados.
              </p>
              <p className="text-xs text-blue-600 font-semibold">ROI: +15-25% eficiencia equipo</p>
            </Card>

            <Card className="p-6 bg-white border-stone-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Instagram className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="font-bold text-stone-900">Agentes en RRSS</h3>
              </div>
              <p className="text-sm text-stone-600 mb-4">
                Respuestas en Instagram/Facebook DM. Mismo tono premium, cero chatbot genÃ©rico.
              </p>
              <p className="text-xs text-purple-600 font-semibold">ROI: captura 20-30% leads perdidos</p>
            </Card>

            <Card className="p-6 bg-white border-stone-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Phone className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="font-bold text-stone-900">Agente de Voz</h3>
              </div>
              <p className="text-sm text-stone-600 mb-4">
                ConfirmaciÃ³n de visitas, recordatorios, reagendamientos. Voz natural, no robÃ³tica.
              </p>
              <p className="text-xs text-amber-600 font-semibold">ROI: +10-15% asistencia a visitas</p>
            </Card>

            <Card className="p-6 bg-white border-stone-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Target className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-bold text-stone-900">NutriciÃ³n Avanzada</h3>
              </div>
              <p className="text-sm text-stone-600 mb-4">
                CampaÃ±as personalizadas post-funnel. Revive leads de meses anteriores con contexto.
              </p>
              <p className="text-xs text-red-600 font-semibold">ROI: recupera 5-10% base histÃ³rica</p>
            </Card>

            <Card className="p-6 bg-white border-stone-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-indigo-500" />
                </div>
                <h3 className="font-bold text-stone-900">Analytics Predictivo</h3>
              </div>
              <p className="text-sm text-stone-600 mb-4">
                IdentificaciÃ³n de leads de alto valor antes de asignar. Scoring inteligente en tiempo real.
              </p>
              <p className="text-xs text-indigo-600 font-semibold">ROI: optimiza asignaciÃ³n equipo</p>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-stone-400 text-sm">
              Cada mÃ³dulo se aÃ±ade progresivamente segÃºn resultados y capacidad operativa.
              <br/>
              <strong className="text-white">1 setup base, ecosistema completo escalable.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Lo que incluye el setup */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl text-stone-900">QuÃ© Incluye Esta InversiÃ³n</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              Semanas 1-2: FundaciÃ³n
            </h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>AuditorÃ­a operativa completa con equipo contactabilidad y ventas</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Mapeo de buyer personas por proyecto (ticket bajo vs alto)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>DefiniciÃ³n de tono, lÃ­mites y criterios de escalamiento al humano</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>IntegraciÃ³n HubSpot: lectura/escritura negocios, etapas, tareas</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600" />
              Semanas 3-8: ConstrucciÃ³n & ProducciÃ³n
            </h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Agente IA completo: contacto, nutriciÃ³n, filtrado, agendamiento</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Automatizaciones SLA (mover etapas, crear tareas, reasignar)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Testing interno + ajustes con equipo comercial</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Lanzamiento controlado + optimizaciÃ³n con datos reales</span>
              </li>
            </ul>
          </div>
        </div>

        <Card className="p-6 bg-blue-50 border-blue-200 mt-8">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-stone-900 mb-2">GarantÃ­a de 60 DÃ­as</h3>
              <p className="text-sm text-stone-700">
                Si en 60 dÃ­as no entregamos la soluciÃ³n funcional, te devolvemos el 100% del setup o seguimos trabajando sin costo hasta tenerlo operativo.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* InversiÃ³n Final */}
      <section className="px-6 py-16 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl text-stone-900 mb-3">InversiÃ³n Propuesta</h2>
            <p className="text-stone-600">Todo incluido, sin sorpresas</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-8">
              <p className="text-sm text-stone-500 uppercase tracking-wide mb-2">Setup Inicial (Ãºnico)</p>
              <p className="text-4xl font-bold text-stone-900 mb-1">$2,000</p>
              <p className="text-sm text-stone-600 mb-6">+ $360 IGV = <strong>$2,360 total</strong></p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-stone-700">
                  <Check className="w-4 h-4 text-green-600" />
                  ImplementaciÃ³n completa 60 dÃ­as
                </li>
                <li className="flex items-center gap-2 text-stone-700">
                  <Check className="w-4 h-4 text-green-600" />
                  VÃ¡lido para todos los proyectos
                </li>
                <li className="flex items-center gap-2 text-stone-700">
                  <Check className="w-4 h-4 text-green-600" />
                  GarantÃ­a de resultados
                </li>
              </ul>
            </Card>

            <Card className="p-8 border-2 border-amber-400 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-white text-xs font-semibold rounded-full">
                RECOMENDADO
              </div>
              <p className="text-sm text-stone-500 uppercase tracking-wide mb-2">Fee Mensual</p>
              <p className="text-4xl font-bold text-stone-900 mb-1">$200</p>
              <p className="text-sm text-stone-600 mb-6">+ $36 IGV = <strong>$236/mes</strong></p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-stone-700">
                  <Check className="w-4 h-4 text-green-600" />
                  30,000 conversaciones IA incluidas (~6k leads)
                </li>
                <li className="flex items-center gap-2 text-stone-700">
                  <Check className="w-4 h-4 text-green-600" />
                  Soporte y ajustes continuos
                </li>
                <li className="flex items-center gap-2 text-stone-700">
                  <Check className="w-4 h-4 text-green-600" />
                  EvoluciÃ³n del asistente
                </li>
              </ul>
            </Card>
          </div>

          <div className="bg-stone-900 text-white p-8 rounded-lg text-center">
            <p className="text-sm text-stone-400 mb-2">InversiÃ³n Setup (se paga antes de iniciar)</p>
            <p className="text-5xl font-bold mb-4">$2,360</p>
            <p className="text-stone-300 text-sm mb-2">Setup con IGV incluido</p>
            <p className="text-stone-400 text-xs mb-6">Fee mensual de $236 se activa una vez la soluciÃ³n estÃ© funcional</p>
            <div className="inline-block bg-green-500/20 border border-green-500/30 rounded-lg px-6 py-3">
              <p className="text-xs text-green-300 uppercase tracking-wide mb-1">ROI Conservador</p>
              <p className="text-2xl font-bold text-green-400">$2.52M incremental/mes</p>
              <p className="text-xs text-green-300 mt-1">Setup se recupera con menos de 1 cierre adicional</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-stone-600 text-sm mb-6">
              Â¿Listo para validar el piloto y activar Semana 1?
            </p>
            <a 
              href="https://wa.me/51991747887?text=Estoy%20interesado%20Santi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="gold-gradient text-white px-8 py-4 rounded-lg font-semibold text-sm uppercase tracking-wide hover:shadow-lg transition-all inline-flex items-center gap-3 group"
            >
              <span>Confirmar Alcance y Arrancar</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-stone-900 text-stone-400 text-center text-sm">
        <p>Propuesta confidencial â€” Imagina Ã— FIXU AI â€” Enero 2026</p>
      </footer>
    </div>
  );
}
