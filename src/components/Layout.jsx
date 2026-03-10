// Componente Container: envolvente principal con ancho máximo
export function Container({ children, className = '' }) {
  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {children}
    </div>
  );
}

// Componente Section: agrupa contenido en bloques claros
export function Section({ title, subtitle, children, className = '' }) {
  return (
    <section className={`mb-6 ${className}`}>
      {title && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-indigo-900 mb-1">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

// Componente Stack: agrupa elementos con espaciado consistente
export function Stack({ children, vertical = true, gap = 'gap-3', className = '' }) {
  const direction = vertical ? 'flex-col' : 'flex-row';
  return (
    <div className={`flex ${direction} ${gap} ${className}`}>
      {children}
    </div>
  );
}

// Componente Card: tarjeta reutilizable con estilos consistentes
export function Card({ children, interactive = false, className = '' }) {
  const interactiveClass = interactive 
    ? 'hover:shadow-lg hover:border-indigo-200 transition-all duration-200 cursor-pointer' 
    : '';
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-100 p-4 ${interactiveClass} ${className}`}>
      {children}
    </div>
  );
}

// Componente Badge: para categorías y etiquetas
export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-indigo-100 text-indigo-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
  };
  return (
    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
