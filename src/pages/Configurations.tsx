
import { configurations, users, components } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HardDrive, Search, User, Download, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Configurations = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConfigurations = configurations.filter(config => 
    config.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserName = (userId: string) => {
    const user = users.find(user => user.id === userId);
    return user ? user.username : "Unknown User";
  };

  const getComponentCount = (componentIds: string[]) => {
    return componentIds.length;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurations</h1>
          <p className="text-muted-foreground">
            View and manage saved PC configurations
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <HardDrive className="mr-2 h-4 w-4" />
            Saved Configurations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by configuration name..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Created By</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Components</th>
                    <th className="text-right p-3 text-sm font-medium text-muted-foreground">Total Price</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Created</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConfigurations.map((config) => (
                    <tr key={config.id} className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium">{config.name}</td>
                      <td className="p-3 flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-tech-100 flex items-center justify-center">
                          <User className="h-3 w-3 text-tech-300" />
                        </div>
                        <span className="text-sm">{getUserName(config.userId)}</span>
                      </td>
                      <td className="p-3 text-sm">{getComponentCount(config.components)} items</td>
                      <td className="p-3 text-sm text-right font-medium text-tech-300">
                        ${config.totalPrice.toFixed(2)}
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {new Date(config.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-8">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 text-tech-300 border-tech-300/20 hover:bg-tech-300/10">
                            <Download className="h-4 w-4 mr-1" />
                            Export
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredConfigurations.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No configurations match your search.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Configurations;
