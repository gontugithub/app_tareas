import { useState, memo } from 'react';
import { motion } from 'motion/react';
import { Badge } from './Layout';

const PRIORITY_STYLES = {
    'baja': { color: 'bg-blue-100 text-blue-800', icon: '📌' },
    'media': { color: 'bg-yellow-100 text-yellow-800', icon: '⭐' },
    'alta': { color: 'bg-red-100 text-red-800', icon: '🔥' },
};

const CATEGORIES = {
    'Trabajo': { color: 'bg-blue-100 text-blue-800' },
    'Personal': { color: 'bg-purple-100 text-purple-800' },
    'Hogar': { color: 'bg-orange-100 text-orange-800' },
    'Salud': { color: 'bg-red-100 text-red-800' },
    'Otros': { color: 'bg-gray-100 text-gray-600' },
};

const TaskItem = memo(({ task, onRemove, onToggle, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    // Verificar si la tarea está vencida
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
    
    // Formatear fecha
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const handleSave = () => {
        if (editText.trim() !== '') {
            onUpdate(task.id, editText);
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') {
            setEditText(task.text); // Cancelar
            setIsEditing(false);
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-lg shadow-md p-4 flex items-center gap-3 transition-all border-2 ${
                isOverdue 
                    ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300 shadow-red-100' 
                    : task.completed
                    ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
                    : 'bg-white border-gray-100 hover:border-indigo-300'
            }`}
        >
            <motion.input
                whileHover={{ scale: 1.2 }}
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            />

            <div className="flex-1 min-w-0">
                {isEditing ? (
                    <input
                        autoFocus
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        className="w-full border-b-2 border-indigo-500 focus:outline-none bg-indigo-50 px-2 py-1 rounded"
                    />
                ) : (
					<div className="flex flex-col gap-2">
                        {/* ETIQUETAS: PRIORIDAD Y CATEGORÍA */}
                        <div className="flex gap-2 flex-wrap items-center">
                            <Badge variant="default" className={PRIORITY_STYLES[task.priority]?.color}>
                                {PRIORITY_STYLES[task.priority]?.icon} {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </Badge>
                            <Badge className={CATEGORIES[task.category]?.color || 'bg-gray-100 text-gray-600'}>
                                {task.category || 'Otros'}
                            </Badge>
                        </div>
                        
                        <span className={`text-sm font-medium truncate ${
                            task.completed 
                                ? 'line-through text-gray-400' 
                                : 'text-gray-800'
                        }`}>
                            {task.text}
                        </span>
                        
                        {/* FECHA LÍMITE */}
                        {task.dueDate && (
                            <span className={`text-xs font-medium ${
                                isOverdue 
                                    ? 'text-red-600 bg-red-100 px-2 py-0.5 rounded' 
                                    : 'text-gray-500'
                            }`}>
                                📅 {formatDate(task.dueDate)} {isOverdue && '⚠️ VENCIDA'}
                            </span>
                        )}
                    </div>
					
                )}
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex gap-2 flex-shrink-0">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    className={`px-3 py-1.5 text-sm rounded font-medium transition-all ${
                        isEditing 
                            ? 'bg-green-500 hover:bg-green-600 text-white shadow-md' 
                            : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
                    }`}
                >
                    {isEditing ? '💾' : '✏️'}
                </motion.button>
                
                {!isEditing && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onRemove(task.id)}
                        className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded font-medium hover:bg-red-200 transition-all shadow-sm"
                    >
                        🗑️
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
});

export default TaskItem;