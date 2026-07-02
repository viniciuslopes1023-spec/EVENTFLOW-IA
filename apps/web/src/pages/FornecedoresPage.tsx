import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type CreateSupplierData, type Supplier, supplierService } from '../services/supplierService';
import { Sidebar } from '../components/Sidebar/Sidebar';
import '../styles/dashboard.css';
import '../styles/events.css';

const STATUS_LABELS: Record<string, string> = {
  negotiating: 'Negociando',
  confirmed: 'Confirmado',
  paid: 'Pago',
  cancelled: 'Cancelado',
};

export default function FornecedoresPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreateSupplierData>({
    name: '',
    category: '',
    contact: '',
    value: undefined,
    status: 'negotiating',
  });

  useEffect(() => {
    loadSuppliers();
  }, [eventId]);

  async function loadSuppliers() {
    setLoading(true);
    try {
      const data = await supplierService.getByEvent(eventId!);
      setSuppliers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name) return;
    try {
      await supplierService.create(eventId!, form);
      setForm({ name: '', category: '', contact: '', value: undefined, status: 'negotiating' });
      setShowForm(false);
      loadSuppliers();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleStatusChange(id: string, status: string) {
    try {
      await supplierService.update(eventId!, id, { status });
      loadSuppliers();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    try {
      await supplierService.delete(eventId!, id);
      loadSuppliers();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="dashboard-page">
      <Sidebar />

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1>Fornecedores</h1>
            <p>Gerencie os fornecedores deste evento.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Novo fornecedor'}
          </button>
        </header>

        {showForm && (
          <article className="dashboard-panel event-form-panel">
            <h2 className="event-form-title">Novo fornecedor</h2>
            <form onSubmit={handleSubmit} className="event-form-grid">
              <div className="event-form-row">
                <label className="event-label">
                  Nome *
                  <input
                    type="text"
                    className="event-input"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </label>
                <label className="event-label">
                  Categoria
                  <input
                    type="text"
                    className="event-input"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    placeholder="ex: buffet, som, decoração..."
                  />
                </label>
              </div>
              <div className="event-form-row">
                <label className="event-label">
                  Contato
                  <input
                    type="text"
                    className="event-input"
                    value={form.contact}
                    onChange={e => setForm({ ...form, contact: e.target.value })}
                    placeholder="telefone, e-mail..."
                  />
                </label>
                <label className="event-label">
                  Valor (R$)
                  <input
                    type="number"
                    className="event-input"
                    value={form.value ?? ''}
                    onChange={e => setForm({ ...form, value: e.target.value ? Number(e.target.value) : undefined })}
                  />
                </label>
              </div>
              <label className="event-label">
                Status
                <select
                  className="event-input"
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                >
                  <option value="negotiating">Negociando</option>
                  <option value="confirmed">Confirmado</option>
                  <option value="paid">Pago</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </label>
              <button type="submit" className="event-submit-btn">Salvar</button>
            </form>
          </article>
        )}

        <article className="dashboard-panel">
          <div className="panel-header">
            <h2>Fornecedores</h2>
            <span className="events-count">{suppliers.length} fornecedor(es)</span>
          </div>
          <div className="event-list">
            {loading && <p className="event-empty">Carregando...</p>}
            {!loading && suppliers.length === 0 && (
              <p className="event-empty">Nenhum fornecedor cadastrado ainda.</p>
            )}
            {suppliers.map(supplier => (
              <div className="event-row" key={supplier.id}>
                <div>
                  <strong>{supplier.name}</strong>
                  <span>
                    {supplier.category || 'Sem categoria'}
                    {supplier.contact && ` · ${supplier.contact}`}
                  </span>
                </div>
                <div className="event-row-actions">
                  <small>
                    {supplier.value ? `R$ ${supplier.value.toLocaleString('pt-BR')}` : 'Sem valor'}
                  </small>
                  <select
                    className="event-input"
                    value={supplier.status}
                    onChange={e => handleStatusChange(supplier.id, e.target.value)}
                  >
                    {Object.entries(STATUS_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  <button className="event-delete-btn" onClick={() => handleDelete(supplier.id)}>
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}