import { VehicleCard } from "./VehicleCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Clock, TrendingUp } from "lucide-react";

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

interface DashboardProps {
  vehicles: Vehicle[];
  onFinishVehicle: (id: string) => void;
}

export function Dashboard({ vehicles, onFinishVehicle }: DashboardProps) {
  // Filter vehicles currently in service (no data_saida)
  const vehiclesInService = vehicles.filter(v => !v.data_saida);
  const completedToday = vehicles.filter(v => {
    if (!v.data_saida) return false;
    const today = new Date().toDateString();
    return new Date(v.data_saida).toDateString() === today;
  });

  const totalRevenue = completedToday.reduce((sum, v) => 
    sum + (v.taxa_estacionamento || 0), 0
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Veículos em Serviço
            </CardTitle>
            <Car className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{vehiclesInService.length}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Finalizados Hoje
            </CardTitle>
            <Clock className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{completedToday.length}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receita Hoje
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R$ {totalRevenue.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicles in Service */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Veículos em Serviço
        </h2>
        
        {vehiclesInService.length === 0 ? (
          <Card className="shadow-card bg-gradient-card">
            <CardContent className="py-12">
              <div className="text-center">
                <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">
                  Nenhum veículo em serviço no momento.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Registre um novo veículo para começar.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehiclesInService.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                showFinishButton
                onFinish={onFinishVehicle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}