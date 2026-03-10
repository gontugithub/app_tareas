import TaskItem from './TaskItem';

function TaskList({ tasks, onUpdate, onRemove, onToggle }) { 
    // en los parametros les pasamos funciones para que esos subcomponenetes puedan ejecutarlas
    // aqui le pasamos el array de tasks, y dos funciones la de quitar y la de editar si esta comletado 

	if (tasks.length === 0) {
		return (
			<div className="text-center py-12 text-gray-500">
				<p className="text-lg">¡Aún no hay tareas. Añade una arriba!</p>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			{tasks.map((task) => (
                // ahora por cada taksitem le vamos a pasar su id, la tarea y las dos funciones para cuando quiera ejecutar
				<TaskItem key={task.id} task={task} onUpdate={onUpdate} onRemove={onRemove} onToggle={onToggle} />
			))}
		</div>
	);
}

export default TaskList;
