import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Dashboard } from "@/components/Dashboard";
import { VehicleForm } from "@/components/VehicleForm";
import { VehicleHistory } from "@/components/VehicleHistory";
import { useVehicles } from "@/hooks/useVehicles";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const {
    vehicles,
    vehiclesInService,
    completedVehicles,
    completedToday,
    todayRevenue,
    loading,
    addVehicle,
    finishVehicle,
  } = useVehicles();

  const handleAddVehicle = async (formData: any) => {
    try {
      await addVehicle(formData);
      setActiveTab("dashboard");
    } catch (error) {
      // Error already handled in hook
    }
  };

  // Listen for navigation events
  useEffect(() => {
    const handleNavigateToRegister = () => setActiveTab("register");
    window.addEventListener('navigate-to-register', handleNavigateToRegister);
    return () => window.removeEventListener('navigate-to-register', handleNavigateToRegister);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "register":
        return <VehicleForm onSubmit={handleAddVehicle} />;
      case "history":
        return <VehicleHistory vehicles={completedVehicles} />;
      default:
        return (
          <Dashboard 
            vehicles={vehiclesInService}
            completedToday={completedToday.length}
            todayRevenue={todayRevenue}
            loading={loading}
            onFinishVehicle={finishVehicle}
          />
        );
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
