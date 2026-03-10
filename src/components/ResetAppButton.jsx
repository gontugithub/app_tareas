import { useState } from 'react';

export function ResetAppButton() {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleReset = () => {
        localStorage.clear();
        window.location.reload();
    };

    if (showConfirm) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">¿Estás seguro?</h3>
                    <p className="text-gray-600 mb-6">
                        Esta acción eliminará todas tus tareas. No se puede deshacer.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleReset}
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                            Resetear
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={() => setShowConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            title="Eliminar todas las tareas"
        >
            🔄 Resetear
        </button>
    );
}
