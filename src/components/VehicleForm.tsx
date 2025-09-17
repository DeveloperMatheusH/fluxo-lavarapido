import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Car, Save } from "lucide-react";

interface VehicleFormData {
  placa: string;
  modelo: string;
  proprietario: string;
  contato: string;
  servico: string;
  taxa_estacionamento: string;
  data_entrada: string;
}

interface VehicleFormProps {
  onSubmit: (data: VehicleFormData) => void;
}

export function VehicleForm({ onSubmit }: VehicleFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<VehicleFormData>({
    placa: "",
    modelo: "",
    proprietario: "",
    contato: "",
    servico: "",
    taxa_estacionamento: "",
    data_entrada: new Date().toISOString().slice(0, 16),
  });

  const serviceOptions = [
    "Lavagem Simples",
    "Lavagem Completa",
    "Polimento",
    "Enceramento",
    "Lavagem + Enceramento",
    "Lavagem + Polimento",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.placa || !formData.proprietario || !formData.servico) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha placa, proprietário e serviço.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
    
    // Reset form
    setFormData({
      placa: "",
      modelo: "",
      proprietario: "",
      contato: "",
      servico: "",
      taxa_estacionamento: "",
      data_entrada: new Date().toISOString().slice(0, 16),
    });

    toast({
      title: "Veículo registrado!",
      description: "O veículo foi adicionado à lista de serviços.",
    });
  };

  const handleInputChange = (field: keyof VehicleFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-card bg-gradient-card max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Car className="h-5 w-5 text-primary" />
          Registrar Entrada de Veículo
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="placa">Placa do Veículo *</Label>
              <Input
                id="placa"
                value={formData.placa}
                onChange={(e) => handleInputChange("placa", e.target.value.toUpperCase())}
                placeholder="ABC-1234"
                className="uppercase"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="modelo">Modelo do Veículo</Label>
              <Input
                id="modelo"
                value={formData.modelo}
                onChange={(e) => handleInputChange("modelo", e.target.value)}
                placeholder="Ex: Honda Civic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="proprietario">Nome do Proprietário *</Label>
              <Input
                id="proprietario"
                value={formData.proprietario}
                onChange={(e) => handleInputChange("proprietario", e.target.value)}
                placeholder="Nome completo"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contato">Contato (WhatsApp/Telefone)</Label>
              <Input
                id="contato"
                value={formData.contato}
                onChange={(e) => handleInputChange("contato", e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="servico">Tipo de Serviço *</Label>
              <Select
                value={formData.servico}
                onValueChange={(value) => handleInputChange("servico", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o serviço" />
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
              <Label htmlFor="taxa">Taxa de Estacionamento (R$)</Label>
              <Input
                id="taxa"
                type="number"
                step="0.01"
                min="0"
                value={formData.taxa_estacionamento}
                onChange={(e) => handleInputChange("taxa_estacionamento", e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="data_entrada">Data e Hora de Entrada</Label>
            <Input
              id="data_entrada"
              type="datetime-local"
              value={formData.data_entrada}
              onChange={(e) => handleInputChange("data_entrada", e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Registrar Veículo
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}