import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Clock, Phone, User, CreditCard, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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

interface VehicleCardProps {
  vehicle: Vehicle;
  showFinishButton?: boolean;
  onFinish?: (id: string) => void;
}

export function VehicleCard({ vehicle, showFinishButton = false, onFinish }: VehicleCardProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  };

  const getServiceColor = (service: string) => {
    const colors: Record<string, string> = {
      "lavagem simples": "bg-info text-info-foreground",
      "lavagem completa": "bg-primary text-primary-foreground",
      "polimento": "bg-warning text-warning-foreground",
      "enceramento": "bg-success text-success-foreground",
    };
    return colors[service.toLowerCase()] || "bg-muted text-muted-foreground";
  };

  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-200 bg-gradient-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">{vehicle.placa}</h3>
              <p className="text-sm text-muted-foreground">{vehicle.modelo}</p>
            </div>
          </div>
          <Badge className={getServiceColor(vehicle.servico)}>
            {vehicle.servico}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{vehicle.proprietario}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{vehicle.contato}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{formatDate(vehicle.data_entrada)}</span>
          </div>
          
          {vehicle.taxa_estacionamento && (
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">
                R$ {vehicle.taxa_estacionamento.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {vehicle.data_saida && (
          <div className="flex items-center gap-2 text-sm pt-2 border-t">
            <CheckCircle className="h-4 w-4 text-success" />
            <span className="text-success font-medium">
              Finalizado em {formatDate(vehicle.data_saida)}
            </span>
          </div>
        )}

        {showFinishButton && onFinish && (
          <div className="pt-2">
            <Button 
              onClick={() => onFinish(vehicle.id)}
              className="w-full bg-success hover:bg-success/90 text-success-foreground"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Finalizar Serviço
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}