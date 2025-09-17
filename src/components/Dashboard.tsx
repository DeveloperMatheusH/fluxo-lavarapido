import { VehicleCard } from "./VehicleCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Clock, TrendingUp, Plus } from "lucide-react";

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
  completedToday: number;
  todayRevenue: number;
  loading: boolean;
  onFinishVehicle: (id: string) => void;
}

export function Dashboard({ vehicles, completedToday, todayRevenue, loading, onFinishVehicle }: DashboardProps) {
  
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="shadow-card bg-gradient-card animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 w-4 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center py-12">
          <div className="text-lg text-muted-foreground">Carregando...</div>
        </div>
      </div>
    );
  }

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
            <div className="text-2xl font-bold text-foreground">{vehicles.length}</div>
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
            <div className="text-2xl font-bold text-foreground">{completedToday}</div>
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
              R$ {todayRevenue.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicles in Service */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Veículos em Serviço
        </h2>
        
        {vehicles.length === 0 ? (
          <Card className="shadow-card bg-gradient-card">
            <CardContent className="py-16">
              <div className="text-center space-y-4">
                <Car className="h-16 w-16 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Nenhum veículo em serviço
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Registre um novo veículo para começar o atendimento
                  </p>
                  <Button 
                    onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-register'))}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Registrar Novo Veículo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((vehicle) => (
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