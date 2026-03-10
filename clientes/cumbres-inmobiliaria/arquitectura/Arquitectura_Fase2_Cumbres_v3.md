const C = {
  bg: "#0B0F1A",
  surface: "#141B2D",
  surfaceBorder: "#1E293B",
  card: "#1A2235",
  navy: "#0EA5E9",
  teal: "#14B8A6",
  purple: "#8B5CF6",
  amber: "#F59E0B",
  green: "#10B981",
  rose: "#F43F5E",
  text: "#F1F5F9",
  textSoft: "#CBD5E1",
  muted: "#64748B",
  border: "#334155",
  white: "#FFFFFF",
};

const font = "'DM Sans', system-ui, -apple-system, sans-serif";

const Node = ({ icon, title, sub, color, badge, highlight }) => (
  <div style={{
    background: C.card,
    border: `2px solid ${color}`,
    borderRadius: 12,
    padding: "14px 16px",
    minWidth: 145,
    maxWidth: 180,
    boxShadow: highlight ? `0 0 24px ${color}30` : "0 1px 4px rgba(0,0,0,0.3)",
    position: "relative",
    flexShrink: 0,
  }}>
    {badge && (
      <div style={{
        position: "absolute", top: -9, right: -6,
        background: C.teal,
        color: C.bg, fontSize: 7.5, fontWeight: 800,
        padding: "2px 8px", borderRadius: 10, letterSpacing: 0.8,
      }}>{badge}</div>
    )}
    <div style={{ fontSize: 20, marginBottom: 5 }}>{icon}</div>
    <div style={{ fontSize: 11.5, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{title}</div>
    {sub && <div style={{ fontSize: 9.5, color: C.textSoft, marginTop: 4, lineHeight: 1.5 }}>{sub}</div>}
  </div>
);

const Arr = ({ label, color = C.border }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "0 3px", flexShrink: 0,
  }}>
    <div style={{ width: 28, height: 2, background: color, position: "relative" }}>
      <div style={{
        position: "absolute", right: -4, top: -4,
        width: 0, height: 0,
        borderTop: "5px solid transparent",
        borderBottom: "5px solid transparent",
        borderLeft: `6px solid ${color}`,
      }} />
    </div>
    {label && <span style={{ fontSize: 7.5, color: C.muted, marginTop: 3, textAlign: "center", maxWidth: 55 }}>{label}</span>}
  </div>
);

const DownArr = ({ label, color = C.border }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "5px 0",
  }}>
    <div style={{ width: 2, height: 18, background: color, position: "relative" }}>
      <div style={{
        position: "absolute", bottom: -4, left: -4,
        width: 0, height: 0,
        borderLeft: "5px solid transparent",
        borderRight: "5px solid transparent",
        borderTop: `6px solid ${color}`,
      }} />
    </div>
    {label && <span style={{ fontSize: 8, color: C.muted, marginTop: 3 }}>{label}</span>}
  </div>
);

const SectionHead = ({ num, title, color }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 12,
    marginBottom: 14,
  }}>
    <div style={{
      width: 30, height: 30, borderRadius: 8,
      background: color, display: "flex", alignItems: "center",
      justifyContent: "center", color: C.bg,
      fontSize: 13, fontWeight: 800, flexShrink: 0,
    }}>{num}</div>
    <div style={{ fontSize: 14, fontWeight: 700, color: C.text, letterSpacing: -0.3 }}>{title}</div>
  </div>
);

const FlowRow = ({ children }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 4,
    overflowX: "auto", padding: "4px 0",
  }}>{children}</div>
);

const SubRow = ({ children }) => (
  <div style={{
    display: "flex", gap: 10, flexWrap: "wrap",
    justifyContent: "center", padding: "0 16px",
  }}>{children}</div>
);

const MiniNode = ({ icon, title, sub }) => (
  <div style={{
    background: C.surface, border: `1px solid ${C.border}`,
    borderRadius: 10, padding: "10px 14px",
    minWidth: 125, maxWidth: 170, flex: 1,
  }}>
    <div style={{ fontSize: 15, marginBottom: 3 }}>{icon}</div>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: C.text }}>{title}</div>
    {sub && <div style={{ fontSize: 9, color: C.muted, marginTop: 2, lineHeight: 1.4 }}>{sub}</div>}
  </div>
);

const FlowCard = ({ children, borderColor }) => (
  <div style={{
    background: C.surface, borderRadius: 16,
    border: `1px solid ${borderColor || C.surfaceBorder}`,
    padding: "18px 22px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
  }}>{children}</div>
);

export default function JourneyDiagram() {
  return (
    <div style={{
      background: C.bg, minHeight: "100vh",
      fontFamily: font, color: C.text,
      maxWidth: 960, margin: "0 auto",
    }}>
      <div style={{
        padding: "26px 30px 18px",
        borderBottom: `2px solid ${C.navy}`,
      }}>
        <div style={{
          fontSize: 10, fontWeight: 800, color: C.navy,
          letterSpacing: 2.5, marginBottom: 6,
        }}>FIXU AI × CUMBRES INMOBILIARIA</div>
        <div style={{
          fontSize: 22, fontWeight: 800, color: C.white,
          letterSpacing: -0.5, lineHeight: 1.2,
        }}>Journey del Lead — MIA como Filtro Inteligente</div>
        <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6, lineHeight: 1.5 }}>
          Cada lead pasa por MIA antes de llegar al asesor. Solo los calificados avanzan al contacto humano.
        </div>
      </div>

      <div style={{ padding: "18px 30px 36px", display: "flex", flexDirection: "column", gap: 22 }}>

        {/* FLOW 1: WP DIRECTO */}
        <FlowCard borderColor={C.navy}>
          <SectionHead num="1" title="Lead escribe directamente a WhatsApp" color={C.navy} />
          <FlowRow>
            <Node icon="📱" title="Lead escribe a WhatsApp" sub="Mensaje entrante al numero oficial" color={C.navy} />
            <Arr color={C.navy} />
            <Node icon="🤖" title="MIA responde y califica" sub="Informa, precalifica y detecta interes real" color={C.navy} highlight />
            <Arr label="Calificado" color={C.green} />
            <Node icon="📅" title="Agenda visita" sub="Google Calendar + registro en Sperant" color={C.green} />
            <Arr color={C.amber} />
            <Node icon="🔔" title="MIA avisa al asesor" sub="Notificacion con datos del lead y visita agendada" color={C.amber} badge="NUEVO" />
            <Arr color={C.amber} />
            <Node icon="👤" title="Mensaje desde N° del asesor" sub="Contacto directo del asesor al lead" color={C.amber} badge="NUEVO" />
          </FlowRow>
          <DownArr color={C.border} label="En paralelo" />
          <SubRow>
            <MiniNode icon="💾" title="Sperant actualizado" sub="Lead + estado + interaccion registrada" />
            <MiniNode icon="🔄" title="Seguimientos automaticos" sub="Si no responde: 1h, 3h, 22h, post 24h" />
            <MiniNode icon="🚫" title="No califica" sub="Se descarta o agenda seguimiento futuro" />
          </SubRow>
        </FlowCard>

        {/* FLOW 2: FORMULARIO */}
        <FlowCard borderColor={C.teal}>
          <SectionHead num="2" title="Lead llena formulario (Meta Ads / Google / Web)" color={C.teal} />
          <FlowRow>
            <Node icon="📝" title="Formulario completado" sub="Meta Ads, Google Ads o web de Cumbres" color={C.teal} />
            <Arr color={C.teal} />
            <Node icon="⚡" title="Sperant registra lead" sub="Webhook 'Cliente digital' activa el flujo" color={C.navy} badge="NUEVO" />
            <Arr color={C.teal} />
            <Node icon="🤖" title="MIA escribe proactiva" sub="Plantilla WhatsApp con nombre + proyecto" color={C.teal} highlight badge="NUEVO" />
          </FlowRow>
          <DownArr color={C.teal} label="Lead responde" />
          <FlowRow>
            <Node icon="🎯" title="MIA califica" sub="Mismo flujo: info, FAQ, precalifica" color={C.teal} />
            <Arr label="Calificado" color={C.green} />
            <Node icon="📅" title="Agenda visita" sub="Calendar + Sperant + notificacion" color={C.green} />
            <Arr color={C.amber} />
            <Node icon="🔔" title="MIA avisa al asesor" sub="Notificacion con datos del lead y visita agendada" color={C.amber} badge="NUEVO" />
            <Arr color={C.amber} />
            <Node icon="👤" title="Mensaje desde N° del asesor" sub="Contacto directo del asesor al lead" color={C.amber} badge="NUEVO" />
          </FlowRow>
        </FlowCard>

        {/* FLOW 3: RRSS */}
        <FlowCard borderColor={C.purple}>
          <SectionHead num="3" title="Lead desde Instagram o Facebook" color={C.purple} />
          <FlowRow>
            <Node icon="📸" title="DM o comentario en IG / FB" sub="Instagram DM, comentario o Messenger" color={C.purple} />
            <Arr color={C.purple} />
            <Node icon="🤖" title="MIA en redes sociales" sub="Mismas capacidades: info, calificacion, agenda" color={C.purple} highlight badge="NUEVO" />
            <Arr label="Calificado" color={C.green} />
            <Node icon="📅" title="Visita agendada" sub="Directo desde RRSS" color={C.green} badge="NUEVO" />
            <Arr color={C.amber} />
            <Node icon="🔔" title="Aviso al asesor + disparo" sub="Se notifica y se envia mensaje desde N° del asesor" color={C.amber} badge="NUEVO" />
          </FlowRow>
          <DownArr color={C.purple} label="En paralelo" />
          <SubRow>
            <MiniNode icon="💾" title="Sperant sync" sub="Lead registrado con canal: IG o FB" />
            <MiniNode icon="🔄" title="Seguimientos RRSS" sub="Recontacto por el mismo canal de origen" />
            <MiniNode icon="📱" title="Derivar a WhatsApp" sub="Si el lead prefiere, MIA continua por WP" />
          </SubRow>
        </FlowCard>

        {/* SPERANT SYNC */}
        <FlowCard borderColor={C.navy}>
          <SectionHead num="⟳" title="Sincronizacion continua MIA ↔ Sperant" color={C.navy} />
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 16 }}>
            {[
              { icon: "📥", title: "Sperant → MIA", bg: "#0C4A6E20", border: "#0EA5E940", items: [
                "Webhook 'Cliente digital'",
                "Datos del formulario completos",
                "Proyecto + asesor asignado",
              ]},
              { icon: "📤", title: "MIA → Sperant", bg: "#115E5920", border: "#14B8A640", items: [
                "Crear / actualizar lead",
                "Cambiar estado comercial",
                "Registrar interacciones",
                "Crear evento / visita",
              ]},
              { icon: "🔄", title: "Sync Base Actual (20%)", bg: "#D9770620", border: "#F59E0B40", items: [
                "Migracion controlada",
                "Deduplicacion por tel / email",
                "Cero riesgo de borrar datos",
              ]},
              { icon: "📊", title: "Base Espejo Completa", bg: "#8B5CF620", border: "#8B5CF640", items: [
                "Replica del universo Sperant",
                "Consultas rapidas e insights",
                "No afecta operacion del CRM",
              ]},
            ].map((col, i) => (
              <div key={i} style={{
                flex: 1, minWidth: 175,
                background: col.bg, border: `1px solid ${col.border}`,
                borderRadius: 12, padding: "14px 16px",
              }}>
                <div style={{ fontSize: 18, marginBottom: 6 }}>{col.icon}</div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: C.text, marginBottom: 8 }}>{col.title}</div>
                {col.items.map((item, j) => (
                  <div key={j} style={{
                    fontSize: 9.5, color: C.textSoft, lineHeight: 1.6,
                    paddingLeft: 10, borderLeft: `2px solid ${C.border}`,
                    marginBottom: 3,
                  }}>{item}</div>
                ))}
              </div>
            ))}
          </div>

          <div style={{
            background: `linear-gradient(135deg, ${C.navy}25, ${C.teal}15)`,
            border: `1px solid ${C.navy}60`,
            borderRadius: 12, padding: "14px 20px",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{ fontSize: 26, flexShrink: 0 }}>🕐</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.white }}>
                2 actualizaciones diarias programadas en Sperant
              </div>
              <div style={{ fontSize: 10.5, color: C.textSoft, marginTop: 3, lineHeight: 1.5 }}>
                Dos cortes diarios de sincronizacion completa entre MIA y el CRM. 
                Los horarios se definen en conjunto con el equipo de Cumbres para 
                alinearse con la operacion comercial sin interrupciones.
              </div>
            </div>
          </div>
        </FlowCard>

        {/* Legend */}
        <div style={{
          display: "flex", gap: 18, flexWrap: "wrap",
          padding: "10px 4px 0",
          borderTop: `1px solid ${C.border}`,
          paddingTop: 14,
        }}>
          {[
            { color: C.navy, label: "Operativo hoy (WhatsApp)" },
            { color: C.teal, label: "Formularios (nuevo)" },
            { color: C.purple, label: "Redes sociales (nuevo)" },
            { color: C.amber, label: "Aviso + disparo asesor" },
            { color: C.green, label: "Agendamiento" },
          ].map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 11, height: 11, borderRadius: 3, background: l.color }} />
              <span style={{ fontSize: 10, color: C.muted, fontWeight: 500 }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
