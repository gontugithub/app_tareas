import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Card, Stack } from './Layout';

const PRIORITY_ICONS = {
    'baja': '📌',
    'media': '⭐',
    'alta': '🔥',
};

const CATEGORIES = {
    'Trabajo': { color: 'bg-blue-100 text-blue-800', icon: '💼' },
    'Personal': { color: 'bg-purple-100 text-purple-800', icon: '👤' },
    'Hogar': { color: 'bg-orange-100 text-orange-800', icon: '🏠' },
    'Salud': { color: 'bg-red-100 text-red-800', icon: '⚕️' },
    'Otros': { color: 'bg-gray-100 text-gray-600', icon: '📌' },
};

function AddTaskInput({ onAdd }) {
    const inputRef = useRef(null);
	const [inputValue, setInputValue] = useState('');
    const [priority, setPriority] = useState('media');
	const [category, setCategory] = useState('Personal');
	const [dueDate, setDueDate] = useState('');

	const handleAdd = () => {
		if (inputValue.trim()) {
			onAdd(inputValue, priority, category, dueDate); 
			setInputValue(''); 
            setPriority('media');
			setCategory('Personal');
			setDueDate('');
            inputRef.current?.focus();
		}
	};

    // si se presiona la tecla enter se añade la tarea
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleAdd();
		}
	};

	return (
        <Card className="border-2 border-indigo-200">
            {/* INPUT Y BOTÓN PRINCIPAL */}
            <Stack vertical={false} gap="gap-3" className="mb-4">
				<input
                    ref={inputRef}
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="¿Qué necesitas hacer?"
					className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors font-medium"
				/>
                
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
					onClick={handleAdd}
					className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-bold hover:shadow-lg transition-all whitespace-nowrap">
					➕ Añadir
				</motion.button>
			</Stack>

            {/* SELECTORES DE FECHA Y CATEGORÍA */}
            <Stack vertical={false} gap="gap-3" className="mb-4">
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors text-sm"
                />
                
                <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors text-sm font-medium bg-white"
                >
                    {Object.keys(CATEGORIES).map(cat => (
                        <option key={cat} value={cat}>{CATEGORIES[cat].icon} {cat}</option>
                    ))}
                </select>
            </Stack>

            {/* SELECTOR DE PRIORIDAD */}
            <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Prioridad:</span>
                <Stack vertical={false} gap="gap-2">
                    {['baja', 'media', 'alta'].map((p) => (
                        <motion.button
                            key={p}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setPriority(p)}
                            className={`px-4 py-2 rounded-full font-bold transition-all ${
                                priority === p 
                                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {PRIORITY_ICONS[p]} {p.charAt(0).toUpperCase() + p.slice(1)}
                        </motion.button>
                    ))}
                </Stack>
            </div>
        </Card>
	);
}

export default AddTaskInput;
