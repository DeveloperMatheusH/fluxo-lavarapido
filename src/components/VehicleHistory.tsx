import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VehicleCard } from "./VehicleCard";
import { Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface VehicleHistoryProps {
  vehicles: Vehicle[];
}

export function VehicleHistory({ vehicles }: VehicleHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Filter only completed vehicles (with data_saida)
  const completedVehicles = vehicles.filter(v => v.data_saida);

  const filteredVehicles = completedVehicles.filter((vehicle) => {
    const matchesSearch = 
      vehicle.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.proprietario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesService = !serviceFilter || vehicle.servico === serviceFilter;

    const matchesDate = !dateFilter || 
      new Date(vehicle.data_entrada).toDateString() === new Date(dateFilter).toDateString();

    return matchesSearch && matchesService && matchesDate;
  });

  const serviceOptions = [
    "Lavagem Simples",
    "Lavagem Completa", 
    "Polimento",
    "Enceramento",
    "Lavagem + Enceramento",
    "Lavagem + Polimento",
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-card bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Filter className="h-5 w-5 text-primary" />
            Filtros de Busca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Placa, proprietário ou modelo..."
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service">Serviço</Label>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os serviços" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVehicles.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">
              {completedVehicles.length === 0 
                ? "Nenhum serviço finalizado ainda." 
                : "Nenhum veículo encontrado com os filtros aplicados."
              }
            </p>
          </div>
        ) : (
          filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))
        )}
      </div>
      
      {filteredVehicles.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Mostrando {filteredVehicles.length} de {completedVehicles.length} veículos
        </div>
      )}
    </div>
  );
}