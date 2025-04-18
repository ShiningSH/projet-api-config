
import { Component, Category, Merchant, MerchantPrice, User, Configuration } from "../types";

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Processors (CPU)",
    slug: "cpu",
    description: "Central Processing Units from various manufacturers"
  },
  {
    id: "cat2",
    name: "Graphics Cards (GPU)",
    slug: "gpu",
    description: "Graphics Processing Units for gaming and professional use"
  },
  {
    id: "cat3",
    name: "Memory (RAM)",
    slug: "ram",
    description: "Random Access Memory modules of different capacities"
  },
  {
    id: "cat4",
    name: "Storage",
    slug: "storage",
    description: "Hard drives, SSDs and other storage solutions"
  },
  {
    id: "cat5",
    name: "Motherboards",
    slug: "motherboard",
    description: "Motherboards compatible with various CPU sockets"
  },
  {
    id: "cat6",
    name: "Power Supplies",
    slug: "psu",
    description: "Power Supply Units of various wattages and efficiencies"
  },
  {
    id: "cat7",
    name: "Cases",
    slug: "case",
    description: "PC cases in different sizes and styles"
  }
];

export const components: Component[] = [
  {
    id: "comp1",
    categoryId: "cat1",
    name: "Intel Core i9-13900K",
    brand: "Intel",
    model: "Core i9-13900K",
    description: "24-core (8P+16E) processor with high performance for gaming and content creation",
    price: 599.99,
    imageUrl: "/placeholder.svg",
    specs: {
      cores: 24,
      baseFrequency: "3.0 GHz",
      boostFrequency: "5.8 GHz",
      tdp: 125,
      socket: "LGA 1700"
    },
    createdAt: "2023-01-15T08:30:00Z",
    updatedAt: "2023-01-15T08:30:00Z"
  },
  {
    id: "comp2",
    categoryId: "cat1",
    name: "AMD Ryzen 9 7950X",
    brand: "AMD",
    model: "Ryzen 9 7950X",
    description: "16-core processor with amazing multi-threaded performance",
    price: 549.99,
    imageUrl: "/placeholder.svg",
    specs: {
      cores: 16,
      baseFrequency: "4.5 GHz",
      boostFrequency: "5.7 GHz",
      tdp: 170,
      socket: "AM5"
    },
    createdAt: "2023-01-20T10:15:00Z",
    updatedAt: "2023-01-20T10:15:00Z"
  },
  {
    id: "comp3",
    categoryId: "cat2",
    name: "NVIDIA GeForce RTX 4090",
    brand: "NVIDIA",
    model: "GeForce RTX 4090",
    description: "Flagship graphics card with unparalleled performance",
    price: 1599.99,
    imageUrl: "/placeholder.svg",
    specs: {
      memory: "24GB GDDR6X",
      boostClock: "2.52 GHz",
      cudaCores: 16384,
      tdp: 450
    },
    createdAt: "2023-02-01T14:45:00Z",
    updatedAt: "2023-02-01T14:45:00Z"
  },
  {
    id: "comp4",
    categoryId: "cat2",
    name: "AMD Radeon RX 7900 XTX",
    brand: "AMD",
    model: "Radeon RX 7900 XTX",
    description: "Top-tier AMD graphics card for gaming and content creation",
    price: 999.99,
    imageUrl: "/placeholder.svg",
    specs: {
      memory: "24GB GDDR6",
      boostClock: "2.5 GHz",
      streamProcessors: 12288,
      tdp: 355
    },
    createdAt: "2023-02-05T09:30:00Z",
    updatedAt: "2023-02-05T09:30:00Z"
  },
  {
    id: "comp5",
    categoryId: "cat3",
    name: "Corsair Vengeance RGB DDR5",
    brand: "Corsair",
    model: "Vengeance RGB DDR5",
    description: "High-performance DDR5 memory with RGB lighting",
    price: 179.99,
    imageUrl: "/placeholder.svg",
    specs: {
      capacity: "32GB (2x16GB)",
      speed: "6000MHz",
      timing: "CL36",
      voltage: "1.35V"
    },
    createdAt: "2023-02-10T11:20:00Z",
    updatedAt: "2023-02-10T11:20:00Z"
  },
  {
    id: "comp6",
    categoryId: "cat4",
    name: "Samsung 990 PRO SSD",
    brand: "Samsung",
    model: "990 PRO",
    description: "Ultra-fast NVMe SSD for professional use and gaming",
    price: 189.99,
    imageUrl: "/placeholder.svg",
    specs: {
      capacity: "2TB",
      interface: "PCIe 4.0 x4",
      readSpeed: "7450 MB/s",
      writeSpeed: "6900 MB/s"
    },
    createdAt: "2023-02-15T16:00:00Z",
    updatedAt: "2023-02-15T16:00:00Z"
  },
  {
    id: "comp7",
    categoryId: "cat5",
    name: "ASUS ROG Maximus Z790 Hero",
    brand: "ASUS",
    model: "ROG Maximus Z790 Hero",
    description: "High-end motherboard for Intel processors",
    price: 629.99,
    imageUrl: "/placeholder.svg",
    specs: {
      socket: "LGA 1700",
      chipset: "Z790",
      memorySlots: 4,
      maxMemory: "128GB",
      pciSlots: 3
    },
    createdAt: "2023-02-20T08:45:00Z",
    updatedAt: "2023-02-20T08:45:00Z"
  },
  {
    id: "comp8",
    categoryId: "cat6",
    name: "Corsair RM850x",
    brand: "Corsair",
    model: "RM850x",
    description: "850W fully modular power supply with 80 PLUS Gold certification",
    price: 149.99,
    imageUrl: "/placeholder.svg",
    specs: {
      wattage: 850,
      efficiency: "80 PLUS Gold",
      modular: "Fully",
      fanSize: "135mm"
    },
    createdAt: "2023-02-25T13:30:00Z",
    updatedAt: "2023-02-25T13:30:00Z"
  },
  {
    id: "comp9",
    categoryId: "cat7",
    name: "Lian Li O11 Dynamic EVO",
    brand: "Lian Li",
    model: "O11 Dynamic EVO",
    description: "Premium mid-tower case with excellent airflow and cable management",
    price: 169.99,
    imageUrl: "/placeholder.svg",
    specs: {
      type: "Mid Tower",
      material: "Aluminum, Steel, Glass",
      maxGPULength: "420mm",
      dimensions: "465 x 285 x 459mm"
    },
    createdAt: "2023-03-01T10:00:00Z",
    updatedAt: "2023-03-01T10:00:00Z"
  }
];

export const merchants: Merchant[] = [
  {
    id: "merch1",
    name: "TechShop",
    website: "https://techshop.example.com",
    logoUrl: "/placeholder.svg"
  },
  {
    id: "merch2",
    name: "PCComponents",
    website: "https://pccomponents.example.com",
    logoUrl: "/placeholder.svg"
  },
  {
    id: "merch3",
    name: "HardwareHaven",
    website: "https://hardwarehaven.example.com",
    logoUrl: "/placeholder.svg"
  }
];

export const merchantPrices: MerchantPrice[] = [
  {
    merchantId: "merch1",
    componentId: "comp1",
    price: 599.99,
    url: "https://techshop.example.com/products/intel-core-i9-13900k",
    inStock: true
  },
  {
    merchantId: "merch2",
    componentId: "comp1",
    price: 589.99,
    url: "https://pccomponents.example.com/products/intel-core-i9-13900k",
    inStock: true
  },
  {
    merchantId: "merch3",
    componentId: "comp1",
    price: 609.99,
    url: "https://hardwarehaven.example.com/products/intel-core-i9-13900k",
    inStock: false
  },
  // More price entries for each component and merchant...
];

export const users: User[] = [
  {
    id: "user1",
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    createdAt: "2023-01-01T00:00:00Z"
  },
  {
    id: "user2",
    username: "john_doe",
    email: "john@example.com",
    role: "user",
    createdAt: "2023-01-05T12:30:00Z"
  },
  {
    id: "user3",
    username: "jane_smith",
    email: "jane@example.com",
    role: "user",
    createdAt: "2023-01-10T09:15:00Z"
  }
];

export const configurations: Configuration[] = [
  {
    id: "config1",
    userId: "user2",
    name: "Gaming Beast",
    components: ["comp1", "comp3", "comp5", "comp6", "comp7", "comp8", "comp9"],
    totalPrice: 3519.93,
    createdAt: "2023-03-05T16:20:00Z",
    updatedAt: "2023-03-05T16:20:00Z"
  },
  {
    id: "config2",
    userId: "user3",
    name: "Workstation Build",
    components: ["comp2", "comp4", "comp5", "comp6", "comp7", "comp8", "comp9"],
    totalPrice: 2869.93,
    createdAt: "2023-03-10T11:45:00Z",
    updatedAt: "2023-03-10T11:45:00Z"
  }
];
