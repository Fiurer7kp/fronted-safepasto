import { supabase } from './supabase';
import type { Alert } from '../types';

export const AlertService = {
  // Crear nueva alerta
  async createAlert(alertData: Omit<Alert, 'id' | 'created_at'>): Promise<Alert> {
    const { data, error } = await supabase
      .from('alerts')
      .insert([alertData])
      .select()
      .single();

    if (error) {
      console.error('Error creando alerta:', error);
      throw new Error(`Error creando alerta: ${error.message}`);
    }
    
    return data;
  },

  // Obtener todas las alertas
  async getAlerts(): Promise<Alert[]> {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error obteniendo alertas:', error);
      throw new Error(`Error obteniendo alertas: ${error.message}`);
    }
    
    return data || [];
  },

  // Obtener alertas por tipo
  async getAlertsByType(type: string): Promise<Alert[]> {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Suscribirse a nuevas alertas en tiempo real
  subscribeToAlerts(callback: (alert: Alert) => void) {
    return supabase
      .channel('alerts-changes')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'alerts' 
        },
        (payload) => {
          console.log('Nueva alerta en tiempo real:', payload.new);
          callback(payload.new as Alert);
        }
      )
      .subscribe();
  }
};