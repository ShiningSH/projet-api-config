
import { categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus, Edit, Trash } from "lucide-react";

const Categories = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage component categories
          </p>
        </div>
        <Button className="bg-tech-300 hover:bg-tech-400">
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="card-hover">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-tech-100 flex items-center justify-center">
                  <Package className="h-4 w-4 text-tech-300" />
                </div>
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </div>
              <CardDescription className="mt-2">
                Slug: {category.slug}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
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

export default Categories;
