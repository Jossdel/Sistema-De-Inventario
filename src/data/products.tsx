export interface TopProduct {
  id: string;
  name: string;
  sales: number;
}

export interface AlertItem {
  id: string;
  name: string;
  stock: number;
  variant: "amber" | "red";
}

export interface RecentProduct {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
}

export interface SummaryStats {
  totalProducts: number;
  productsTrend: string;
  inventoryValue: number;
  inventoryTrend: string;
  lowStock: number;
  outOfStock: number;
  categories: number;
}

export type ProductStatus = "active" | "low" | "out";

export interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  image: string;
  status: ProductStatus;
}

export const CATEGORIES = [
  "Smartphones",
  "Accesorios",
  "Fundas y Protectores",
  "Audio",
  "Cargadores",
  "Wearables",
];

export const topProducts: TopProduct[] = [
  { id: "iphone-16-pro", name: "iPhone 16 Pro 256GB", sales: 58 },
  { id: "samsung-s25", name: "Samsung Galaxy S25", sales: 43 },
  { id: "airpods-pro", name: "AirPods Pro 2", sales: 37 },
  { id: "pixel-9", name: "Google Pixel 9", sales: 21 },
];

export const alerts: AlertItem[] = [
  {
    id: "iphone-16-natural",
    name: "iPhone 16 Natural Titanium",
    stock: 0,
    variant: "red",
  },
  {
    id: "samsung-s25-ultra",
    name: "Samsung S25 Ultra 512GB",
    stock: 0,
    variant: "red",
  },
  {
    id: "magsafe-charger",
    name: "Cargador MagSafe 25W",
    stock: 3,
    variant: "amber",
  },
  {
    id: "watch-ultra-2",
    name: "Apple Watch Ultra 2",
    stock: 2,
    variant: "amber",
  },
];

export const recentProducts: RecentProduct[] = [
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro 256GB",
    category: "Smartphones",
    stock: 14,
    price: 1099,
  },
  {
    id: "galaxy-buds3",
    name: "Samsung Galaxy Buds3 Pro",
    category: "Audio",
    stock: 22,
    price: 229,
  },
  {
    id: "spigen-iphone16",
    name: "Funda Spigen iPhone 16",
    category: "Fundas y Protectores",
    stock: 40,
    price: 18.99,
  },
];

export const summaryStats: SummaryStats = {
  totalProducts: 98,
  productsTrend: "+3 esta semana",
  inventoryValue: 142500,
  inventoryTrend: "+8.4% vs. mes pasado",
  lowStock: 9,
  outOfStock: 4,
  categories: 6,
};

export const initialProducts: Product[] = [
  {
    id: 1,
    sku: "SPH-001",
    name: "iPhone 16 Pro 256GB",
    category: "Smartphones",
    stock: 14,
    price: 1099.0,
    image: "",
    status: "active",
  },
  {
    id: 2,
    sku: "SPH-002",
    name: "iPhone 16 128GB",
    category: "Smartphones",
    stock: 0,
    price: 799.0,
    image: "",
    status: "out",
  },
  {
    id: 3,
    sku: "SPH-003",
    name: "Samsung Galaxy S25 256GB",
    category: "Smartphones",
    stock: 19,
    price: 949.0,
    image: "",
    status: "active",
  },
  {
    id: 4,
    sku: "SPH-004",
    name: "Samsung Galaxy S25 Ultra 512GB",
    category: "Smartphones",
    stock: 0,
    price: 1399.0,
    image: "",
    status: "out",
  },
  {
    id: 5,
    sku: "SPH-005",
    name: "Google Pixel 9",
    category: "Smartphones",
    stock: 11,
    price: 799.0,
    image: "",
    status: "active",
  },
  {
    id: 6,
    sku: "SPH-006",
    name: "Motorola Edge 50 Pro",
    category: "Smartphones",
    stock: 8,
    price: 549.0,
    image: "",
    status: "active",
  },
  {
    id: 7,
    sku: "AUD-001",
    name: "AirPods Pro 2",
    category: "Audio",
    stock: 25,
    price: 249.0,
    image: "",
    status: "active",
  },
  {
    id: 8,
    sku: "AUD-002",
    name: "Samsung Galaxy Buds3 Pro",
    category: "Audio",
    stock: 22,
    price: 229.0,
    image: "",
    status: "active",
  },
  {
    id: 9,
    sku: "AUD-003",
    name: "Sony WH-1000XM5",
    category: "Audio",
    stock: 4,
    price: 349.0,
    image: "",
    status: "low",
  },
  {
    id: 10,
    sku: "CAR-001",
    name: "Cargador MagSafe 25W",
    category: "Cargadores",
    stock: 3,
    price: 39.99,
    image: "",
    status: "low",
  },
  {
    id: 11,
    sku: "CAR-002",
    name: "Cargador Samsung 45W",
    category: "Cargadores",
    stock: 30,
    price: 29.99,
    image: "",
    status: "active",
  },
  {
    id: 12,
    sku: "CAR-003",
    name: "Cable USB-C a USB-C 2m",
    category: "Cargadores",
    stock: 60,
    price: 14.99,
    image: "",
    status: "active",
  },
  {
    id: 13,
    sku: "FUN-001",
    name: "Funda Spigen iPhone 16 Pro",
    category: "Fundas y Protectores",
    stock: 40,
    price: 18.99,
    image: "",
    status: "active",
  },
  {
    id: 14,
    sku: "FUN-002",
    name: "Cristal Templado iPhone 16",
    category: "Fundas y Protectores",
    stock: 55,
    price: 9.99,
    image: "",
    status: "active",
  },
  {
    id: 15,
    sku: "FUN-003",
    name: "Funda Leather Samsung S25",
    category: "Fundas y Protectores",
    stock: 5,
    price: 24.99,
    image: "",
    status: "low",
  },
  {
    id: 16,
    sku: "WEA-001",
    name: "Apple Watch Series 10 GPS",
    category: "Wearables",
    stock: 9,
    price: 399.0,
    image: "",
    status: "active",
  },
  {
    id: 17,
    sku: "WEA-002",
    name: "Apple Watch Ultra 2",
    category: "Wearables",
    stock: 2,
    price: 799.0,
    image: "",
    status: "low",
  },
  {
    id: 18,
    sku: "WEA-003",
    name: "Samsung Galaxy Watch 7",
    category: "Wearables",
    stock: 13,
    price: 299.0,
    image: "",
    status: "active",
  },
  {
    id: 19,
    sku: "ACC-001",
    name: "Soporte MagSafe para Auto",
    category: "Accesorios",
    stock: 17,
    price: 34.99,
    image: "",
    status: "active",
  },
  {
    id: 20,
    sku: "ACC-002",
    name: "Power Bank 20000mAh",
    category: "Accesorios",
    stock: 12,
    price: 49.99,
    image: "",
    status: "active",
  },
];
