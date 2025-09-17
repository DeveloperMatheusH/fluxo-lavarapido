import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface Vehicle {
  id: string;
  placa: string;
  modelo: string;
  proprietario: string;
  contato: string;
  servico: string;
  taxa_estacionamento?: number;
  data_entrada: string;
  data_saida?: string;
}

interface VehicleFormData {
  placa: string;
  modelo: string;
  proprietario: string;
  contato: string;
  servico: string;
  taxa_estacionamento: string;
  data_entrada: string;
}

export function useVehicles() {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch vehicles from Supabase (when connected)
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      
      // TODO: When Supabase is connected, replace this with actual Supabase query:
      // const { data, error } = await supabase
      //   .from('veiculos')
      //   .select('*')
      //   .order('data_entrada', { ascending: false });
      
      // For now, return empty array (no sample data)
      const data: Vehicle[] = [];
      
      if (data) {
        setVehicles(data);
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      toast({
        title: "Erro ao carregar veículos",
        description: "Não foi possível carregar os dados do banco.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Add new vehicle
  const addVehicle = async (formData: VehicleFormData) => {
    try {
      const newVehicle: Omit<Vehicle, 'id'> = {
        placa: formData.placa,
        modelo: formData.modelo,
        proprietario: formData.proprietario,
        contato: formData.contato,
        servico: formData.servico,
        taxa_estacionamento: formData.taxa_estacionamento ? parseFloat(formData.taxa_estacionamento) : undefined,
        data_entrada: formData.data_entrada,
      };

      // TODO: When Supabase is connected, replace this with actual Supabase insert:
      // const { data, error } = await supabase
      //   .from('veiculos')
      //   .insert([newVehicle])
      //   .select()
      //   .single();

      // For now, create a temporary vehicle with ID
      const vehicleWithId: Vehicle = {
        ...newVehicle,
        id: Date.now().toString(),
      };

      setVehicles(prev => [vehicleWithId, ...prev]);

      toast({
        title: "Veículo registrado!",
        description: "O veículo foi adicionado à lista de serviços.",
      });

      return vehicleWithId;
    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast({
        title: "Erro ao registrar veículo",
        description: "Não foi possível salvar o veículo no banco.",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Finish vehicle service
  const finishVehicle = async (id: string) => {
    try {
      const now = new Date().toISOString();

      // TODO: When Supabase is connected, replace this with actual Supabase update:
      // const { error } = await supabase
      //   .from('veiculos')
      //   .update({ data_saida: now })
      //   .eq('id', id);

      // For now, update local state
      setVehicles(prev =>
        prev.map(vehicle =>
          vehicle.id === id
            ? { ...vehicle, data_saida: now }
            : vehicle
        )
      );

      toast({
        title: "Serviço finalizado!",
        description: "O veículo foi movido para o histórico.",
      });
    } catch (error) {
      console.error('Error finishing vehicle:', error);
      toast({
        title: "Erro ao finalizar serviço",
        description: "Não foi possível atualizar o veículo no banco.",
        variant: "destructive",
      });
    }
  };

  // Get vehicles currently in service (no data_saida)
  const vehiclesInService = vehicles.filter(v => !v.data_saida);

  // Get completed vehicles (with data_saida)
  const completedVehicles = vehicles.filter(v => v.data_saida);

  // Get vehicles completed today
  const completedToday = vehicles.filter(v => {
    if (!v.data_saida) return false;
    const today = new Date().toDateString();
    return new Date(v.data_saida).toDateString() === today;
  });

  // Calculate today's revenue
  const todayRevenue = completedToday.reduce((sum, v) => 
    sum + (v.taxa_estacionamento || 0), 0
  );

  useEffect(() => {
    fetchVehicles();
  }, []);

  return {
    vehicles,
    vehiclesInService,
    completedVehicles,
    completedToday,
    todayRevenue,
    loading,
    addVehicle,
    finishVehicle,
    refetch: fetchVehicles,
  };
}