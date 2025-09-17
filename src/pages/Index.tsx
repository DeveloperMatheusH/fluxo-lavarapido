import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Dashboard } from "@/components/Dashboard";
import { VehicleForm } from "@/components/VehicleForm";
import { VehicleHistory } from "@/components/VehicleHistory";
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

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    // Sample data - will be replaced with Supabase data
    {
      id: "1",
      placa: "ABC-1234",
      modelo: "Honda Civic",
      proprietario: "João Silva",
      contato: "(11) 99999-9999",
      servico: "Lavagem Completa",
      taxa_estacionamento: 15.00,
      data_entrada: "2024-01-15T09:30:00",
    },
    {
      id: "2",
      placa: "XYZ-5678",
      modelo: "Toyota Corolla",
      proprietario: "Maria Santos",
      contato: "(11) 88888-8888",
      servico: "Polimento",
      taxa_estacionamento: 20.00,
      data_entrada: "2024-01-15T10:15:00",
      data_saida: "2024-01-15T12:30:00",
    },
  ]);

  const handleAddVehicle = (formData: VehicleFormData) => {
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      placa: formData.placa,
      modelo: formData.modelo,
      proprietario: formData.proprietario,
      contato: formData.contato,
      servico: formData.servico,
      taxa_estacionamento: formData.taxa_estacionamento ? parseFloat(formData.taxa_estacionamento) : undefined,
      data_entrada: formData.data_entrada,
    };

    setVehicles(prev => [newVehicle, ...prev]);
    setActiveTab("dashboard");
  };

  const handleFinishVehicle = (id: string) => {
    setVehicles(prev =>
      prev.map(vehicle =>
        vehicle.id === id
          ? { ...vehicle, data_saida: new Date().toISOString() }
          : vehicle
      )
    );

    toast({
      title: "Serviço finalizado!",
      description: "O veículo foi movido para o histórico.",
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "register":
        return <VehicleForm onSubmit={handleAddVehicle} />;
      case "history":
        return <VehicleHistory vehicles={vehicles} />;
      default:
        return <Dashboard vehicles={vehicles} onFinishVehicle={handleFinishVehicle} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
