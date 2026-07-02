import api from './api';

export interface Supplier {
  id: string;
  name: string;
  category?: string | null;
  contact?: string | null;
  value?: number | null;
  status: string;
  eventId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSupplierData {
  name: string;
  category?: string;
  contact?: string;
  value?: number;
  status?: string;
}

export const supplierService = {
  async getByEvent(eventId: string): Promise<Supplier[]> {
    const { data } = await api.get(`/api/events/${eventId}/suppliers`);
    return data;
  },

  async create(eventId: string, supplierData: CreateSupplierData): Promise<Supplier> {
    const { data } = await api.post(`/api/events/${eventId}/suppliers`, supplierData);
    return data;
  },

  async update(eventId: string, id: string, supplierData: Partial<CreateSupplierData>): Promise<Supplier> {
    const { data } = await api.patch(`/api/events/${eventId}/suppliers/${id}`, supplierData);
    return data;
  },

  async delete(eventId: string, id: string): Promise<void> {
    await api.delete(`/api/events/${eventId}/suppliers/${id}`);
  },
};