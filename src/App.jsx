import { useState, useMemo, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'motion/react';
import AddTaskInput from './components/AddTaskInput';
import TaskItem from './components/TaskItem';
import TaskList from './components/TaskList';
import ClearCompletedButton from './components/ClearCompletedButton';
import { SavedIndicator } from './components/SavedIndicator';
import { ResetAppButton } from './components/ResetAppButton';
import { Container, Section, Stack, Card, Badge } from './components/Layout';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDebounce } from './hooks/useDebounce'; 
import { useToggle } from './hooks/useToggle';
import { HideCompletedCheckbox } from './components/HideCompletedCheckbox';

function App() {
  /*

  const getInitialTasks = () => {
		try {
			const savedTasks = localStorage.getItem('tasks');

			// Si hay tareas guardadas, parsearlas
			if (savedTasks) {
				return JSON.parse(savedTasks);
			}
		} catch (error) {
			// Si hay error al parsear, usar tareas por defecto
			console.error('Error al cargar tareas:', error);
		}

		// Tareas por defecto si no hay nada guardado
		return [
			{
				id: 1,
				text: 'Aprender fundamentos de React',
				completed: false,
				priority: 'alta',
			},
			{
				id: 2,
				text: 'Construir una app de tareas',
				completed: false,
				priority: 'media',
			},
		];
	};

  */

  const [tasks, setTasks] = useLocalStorage('tasks', [
      { id: 1, text: 'Aprender fundamentos de React', completed: false, priority: 'alta', category: 'Trabajo', dueDate: '2026-03-20' },
      { id: 2, text: 'Construir una app de tareas', completed: false, priority: 'media', category: 'Trabajo', dueDate: '2026-03-25' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const [hideCompleted, toggleHideCompleted] = useToggle(false);
  const hasCompletedTasks = tasks.some(t => t.completed);

  const visibleTasks = useMemo(() => {
    const priorityOrder = { alta: 1, media: 2, baja: 3 };

    return tasks
      .filter(task => {
        const matchesSearch = 
          task.text.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          task.category.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          (task.dueDate && task.dueDate.includes(debouncedSearch));
        const matchesHide = hideCompleted ? !task.completed : true;
        return matchesSearch && matchesHide;
      })
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }, [tasks, debouncedSearch, hideCompleted]);

  // arrow function (declaramos la funcion addTask, 
  // esta recibe (text) 
  // como parámetro de entrada "el contenido que vamos añadir a la tarea")
  // seria lo mismo que esto var addTask = function(text)


  const addTask = (text, priority = 'media', category = 'Otros', dueDate = '') => { 

    // creamos una array con los campos que vamos añadir a la tarea

    const newTask = {
      id: Date.now(), // asignamos un id unico
      text: text,
      completed: false, // y como acabamos de crear la tarea sale como que no esta completada
      priority: priority,
      category: category,
      dueDate: dueDate,
    };

    // por ultimo añadimos la nueva tarea a las tareas ya existentes

    setTasks([...tasks, newTask]) // los puntos nos permiten traer los datos de la caja antigua y ponerlos en uno nuevo

  }

  const updateTask = useCallback((id, newText) => {
  setTasks(prev => prev.map(task => 
    task.id === id ? { ...task, text: newText } : task
  ));
  }, []); 


  const removeTask = useCallback((id) => {
    setTasks(prev => prev.filter((task) => task.id !== id));
    // filter nos devuelve todas las tasks que no tengan el id que queermeos eliminar 
    // asi guardamos todo con setTasks menos la que queremos eliminar que esta al no pasar por el filtro no se va a guardar

  },[]);


  const toggleTask = useCallback((id) => {

    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));

     // .map no sirve para cuando queremos cmabiar cosas dentro del array en este caso asi que este nos va a devlove
    // el mismo numero de elementos 
    // luego con el operador ternario si encuentras en el array con ese id entonces cambia el estado de la task a completadao
    // condicion ? A : B -> si se cumple haz A (...task, a la task que ya tengo le sobrescribes en comleted y cambias su valor negandolo "!")


  }, []);
    

  // Función para manejar el reordenamiento por drag & drop
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    
    // Si no se sueltó en un destino válido
    if (!destination) return;
    
    // Si se soltó en la misma posición
    if (source.index === destination.index) return;
    
    // Crear una nueva lista reordenada
    const newTasks = Array.from(visibleTasks);
    const [removed] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, removed);
    
    // Actualizar el estado con el nuevo orden
    setTasks(newTasks);
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };
  
  return(
      <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
          <Container>
            {/* ENCABEZADO */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h1 className="text-5xl font-bold text-indigo-900 mb-2">📝 Mi lista de tareas</h1>
              <p className="text-gray-600">Organiza, prioriza y completa tus tareas</p>
            </motion.div>

            {/* SECCIÓN DE ENTRADA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Section title="Nueva tarea">
                <AddTaskInput onAdd={addTask} />
              </Section>
            </motion.div>

            {/* SECCIÓN DE CONTROLES Y FILTROS */}
            {(tasks.length > 1 || hasCompletedTasks) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Section title="Filtros y controles">
                  <Stack vertical={false} gap="gap-4" className="flex-wrap">
                    {tasks.length > 1 && (
                      <div className="flex-1 min-w-[200px]">
                        <input
                          type="text"
                          placeholder="🔍 Buscar tareas..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                        />
                      </div>
                    )}
                  
                    {hasCompletedTasks && (
                      <div className="flex items-center">
                        <HideCompletedCheckbox
                          checked={hideCompleted} 
                          onChange={toggleHideCompleted} 
                        />
                      </div>
                    )}
                  </Stack>
                </Section>
              </motion.div>
            )}

            {/* SECCIÓN DE LISTA DE TAREAS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Section title={`Tareas (${visibleTasks.length}/${tasks.length})`}>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="tasks">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`space-y-3 p-3 rounded-lg transition-all duration-200 ${
                          snapshot.isDraggingOver ? 'bg-indigo-50 border-2 border-indigo-300' : 'border-2 border-transparent'
                        }`}
                      >
                        {visibleTasks.length === 0 ? (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-12 text-gray-500"
                          >
                            <p className="text-lg">¡Aún no hay tareas. Añade una arriba!</p>
                          </motion.div>
                        ) : (
                          <AnimatePresence>
                            {visibleTasks.map((task, index) => (
                              <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                {(provided, snapshot) => (
                                  <motion.div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2 }}
                                    className={`transition-all ${
                                      snapshot.isDragging ? 'opacity-70 scale-105' : ''
                                    }`}
                                  >
                                    <TaskItem
                                      task={task}
                                      onUpdate={updateTask}
                                      onRemove={removeTask}
                                      onToggle={toggleTask}
                                    />
                                  </motion.div>
                                )}
                              </Draggable>
                            ))}
                          </AnimatePresence>
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </Section>
            </motion.div>

            {/* SECCIÓN DE RESUMEN Y ACCIONES */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Section title="Resumen">
                <Stack vertical={false} gap="gap-4" className="flex-wrap">
                  {/* ESTADÍSTICAS */}
                  <Card className="flex-1 min-w-[180px] bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-indigo-900">{tasks.length}</p>
                      <p className="text-sm text-gray-600">Total de tareas</p>
                    </div>
                  </Card>
                  
                  <Card className="flex-1 min-w-[180px] bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-900">{tasks.filter(t => t.completed).length}</p>
                      <p className="text-sm text-gray-600">Completadas</p>
                    </div>
                  </Card>
                  
                  <Card className="flex-1 min-w-[180px] bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-orange-900">{tasks.filter(t => !t.completed).length}</p>
                      <p className="text-sm text-gray-600">Pendientes</p>
                    </div>
                  </Card>
                </Stack>
              </Section>
            </motion.div>

            {/* SECCIÓN DE CONTROLES FINALES */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex justify-center gap-3 pt-4">
                <ClearCompletedButton count={tasks.filter((t) => t.completed).length} onClear={clearCompleted} />
                <ResetAppButton />
              </div>
            </motion.div>
          </Container>
      </div>
      <SavedIndicator />
      </>
	);



}

export default App
