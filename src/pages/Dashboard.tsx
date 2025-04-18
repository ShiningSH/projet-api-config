
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { components, categories, merchants, users } from "@/data/mockData";
import { Cpu, Users, ShoppingBag, BarChart3 } from "lucide-react";

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  value: string | number; 
  description: string; 
  icon: React.ElementType;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the PC Configurator admin dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Components"
          value={components.length}
          description="Across all categories"
          icon={Cpu}
        />
        <StatCard
          title="Categories"
          value={categories.length}
          description="Component categories"
          icon={BarChart3}
        />
        <StatCard
          title="Merchant Partners"
          value={merchants.length}
          description="Offering components"
          icon={ShoppingBag}
        />
        <StatCard
          title="Registered Users"
          value={users.length}
          description="Platform users"
          icon={Users}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest activities on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-tech-300 pl-4 py-2">
                <p className="text-sm font-medium">New Component Added</p>
                <p className="text-xs text-muted-foreground">Intel Core i9-13900K - 2 hours ago</p>
              </div>
              <div className="border-l-4 border-tech-300 pl-4 py-2">
                <p className="text-sm font-medium">Price Updated</p>
                <p className="text-xs text-muted-foreground">NVIDIA GeForce RTX 4090 - 5 hours ago</p>
              </div>
              <div className="border-l-4 border-tech-300 pl-4 py-2">
                <p className="text-sm font-medium">New User Registered</p>
                <p className="text-xs text-muted-foreground">jane_smith - 1 day ago</p>
              </div>
              <div className="border-l-4 border-tech-300 pl-4 py-2">
                <p className="text-sm font-medium">New Configuration Saved</p>
                <p className="text-xs text-muted-foreground">Gaming Beast by john_doe - 2 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Components</CardTitle>
            <CardDescription>
              Most popular components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {components.slice(0, 4).map((component) => (
                <div key={component.id} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-tech-100/50 flex items-center justify-center">
                    <Cpu className="h-5 w-5 text-tech-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{component.name}</p>
                    <p className="text-xs text-muted-foreground">{component.brand}</p>
                  </div>
                  <div className="ml-auto text-sm font-medium">${component.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
