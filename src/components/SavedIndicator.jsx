import { useEffect, useState } from 'react';

export function SavedIndicator() {
    const [saved, setSaved] = useState(true);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (saved) {
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [saved]);

    return (
        <div className="fixed bottom-4 right-4">
            {showMessage && (
                <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
                    <span className="text-xl">✓</span>
                    <span className="text-sm font-medium">Guardado</span>
                </div>
            )}
        </div>
    );
}
