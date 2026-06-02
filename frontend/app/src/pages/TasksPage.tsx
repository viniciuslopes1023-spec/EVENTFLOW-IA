import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type Event, eventService } from '../services/eventService';
import { type Task, taskService } from '../services/tasksService';
import '../styles/dashboard.css';
import '../styles/tasks.css';

export function TasksPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadEvents() {
      const data = await eventService.getAll();
      setEvents(data);
      if (data.length > 0) setSelectedEvent(data[0].id);
    }
    loadEvents();
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;
    loadTasks();
  }, [selectedEvent]);

  async function loadTasks() {
    setLoading(true);
    try {
      const data = await taskService.getByEvent(selectedEvent);
      setTasks(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    if (!newTask.trim() || !selectedEvent) return;
    await taskService.create(selectedEvent, newTask.trim());
    setNewTask('');
    await loadTasks();
  }

  async function handleToggle(id: string) {
    await taskService.toggleDone(id);
    await loadTasks();
  }

  async function handleDelete(id: string) {
    await taskService.delete(id);
    await loadTasks();
  }

  const done = tasks.filter(t => t.done).length;
  const progress = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <strong>EventFlow IA</strong>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/events">Eventos</Link>
          <Link to="#">Financeiro</Link>
          <Link className="active" to="/tasks">Tarefas</Link>
          <Link to="#">Fornecedores</Link>
        </nav>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1>Tarefas</h1>
            <p>Gerencie o checklist dos seus eventos.</p>
          </div>
        </header>

        <div className="tasks-event-selector">
          <label>Evento</label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="tasks-select"
          >
            {events.length === 0 && <option>Nenhum evento encontrado</option>}
            {events.map(event => (
              <option key={event.id} value={event.id}>{event.title}</option>
            ))}
          </select>
        </div>

        {selectedEvent && (
          <>
            {tasks.length > 0 && (
              <article className="dashboard-panel tasks-progress-panel">
                <div className="tasks-progress-header">
                  <span>{done} de {tasks.length} tarefas concluídas</span>
                  <strong>{progress}%</strong>
                </div>
                <div className="tasks-progress-track">
                  <div className="tasks-progress-bar" style={{ width: `${progress}%` }} />
                </div>
              </article>
            )}

            <article className="dashboard-panel">
              <div className="tasks-input-row">
                <input
                  className="event-input"
                  placeholder="Nova tarefa..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                />
                <button className="tasks-add-btn" onClick={handleCreate}>
                  Adicionar
                </button>
              </div>

              <div className="tasks-list">
                {loading && <p className="event-empty">Carregando...</p>}
                {!loading && tasks.length === 0 && (
                  <p className="event-empty">Nenhuma tarefa ainda. Adicione a primeira!</p>
                )}
                {tasks.map(task => (
                  <div className={`task-row ${task.done ? 'task-done' : ''}`} key={task.id}>
                    <button
                      className="task-check"
                      onClick={() => handleToggle(task.id)}
                    >
                      {task.done ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : null}
                    </button>
                    <span className="task-title">{task.title}</span>
                    <button className="event-delete-btn" onClick={() => handleDelete(task.id)}>×</button>
                  </div>
                ))}
              </div>
            </article>
          </>
        )}

        {events.length === 0 && (
          <article className="dashboard-panel">
            <p className="event-empty">Crie um evento primeiro para adicionar tarefas.</p>
          </article>
        )}
      </section>
    </main>
  );
}