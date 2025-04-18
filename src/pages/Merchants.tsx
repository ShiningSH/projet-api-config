
import { merchants } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Plus, ExternalLink, Edit, Trash } from "lucide-react";

const Merchants = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Merchants</h1>
          <p className="text-muted-foreground">
            Manage partner merchant sites
          </p>
        </div>
        <Button className="bg-tech-300 hover:bg-tech-400">
          <Plus className="mr-2 h-4 w-4" />
          Add Merchant
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {merchants.map((merchant) => (
          <Card key={merchant.id} className="card-hover">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-md bg-tech-100/50 flex items-center justify-center overflow-hidden">
                  {merchant.logoUrl ? (
                    <img 
                      src={merchant.logoUrl} 
                      alt={merchant.name} 
                      className="h-10 w-10 object-contain" 
                    />
                  ) : (
                    <ShoppingBag className="h-6 w-6 text-tech-300" />
                  )}
                </div>
                <CardTitle className="text-lg">{merchant.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <a 
                href={merchant.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm flex items-center gap-1 text-tech-300 hover:underline"
              >
                {merchant.website.replace(/^https?:\/\//, '')}
                <ExternalLink className="h-3 w-3" />
              </a>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="text-tech-300 border-tech-300/20 hover:bg-tech-300/10">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-destructive border-destructive/20 hover:bg-destructive/10">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Merchants;
