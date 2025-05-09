import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Filter, Search } from "lucide-react";

interface Category {
  _id: string;
  name: string;
}

interface ComponentItem {
  _id: string;
  name: string;
  brand: string;
  model: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

const Components = () => {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");

  useEffect(() => {
    fetch("/api/components")
      .then((res) => res.json())
      .then((data) => setComponents(data))
      .catch((err) => console.error("Error fetching components:", err));

    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const brands = Array.from(
    new Set(
      components
        .map((c) => c.brand)
        .filter((b): b is string => typeof b === "string" && b.trim() !== "")
    )
  );

  const filteredComponents = components.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || component.categoryId === selectedCategory;
    const matchesBrand =
      selectedBrand === "all" || component.brand === selectedBrand;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c._id === categoryId)?.name || "Unknown";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Components</h1>
          <p className="text-muted-foreground">
            Manage hardware components in the catalog
          </p>
        </div>
        <Button className="bg-tech-300 hover:bg-tech-400">
          <Plus className="mr-2 h-4 w-4" />
          Add Component
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, brand, or model..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories
                    .filter((cat) => !!cat._id && !!cat.name)
                    .map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger id="brand">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredComponents.map((component) => (
          <ComponentCard
            key={component._id}
            component={component}
            categoryName={getCategoryName(component.categoryId)}
          />
        ))}
      </div>
    </div>
  );
};

const ComponentCard = ({
  component,
  categoryName,
}: {
  component: ComponentItem;
  categoryName: string;
}) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="component-image">
        <img
          src={component.imageUrl}
          alt={component.name}
          className="h-full w-full object-contain mix-blend-darken"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="text-xs font-medium text-muted-foreground">
          {categoryName} | {component.brand}
        </div>
        <CardTitle className="text-lg">{component.name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm text-muted-foreground line-clamp-2">
          {component.description}
        </div>
        <div className="mt-2 text-lg font-bold text-tech-300">
          ${component.price.toFixed(2)}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1">
          Edit
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-tech-300/10 text-tech-300 hover:bg-tech-300/20 hover:text-tech-400 border-tech-300/20"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Components;
