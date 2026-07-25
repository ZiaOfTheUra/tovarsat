/**
 * Mock data para todas las pantallas.
 */

export const dashboardStats = {
  totalRegistrations: 1248,
  activeShipments: 342,
  lowStockItems: 18,
  weeklyGrowth: '+12%',
}

export const recentActivities = [
  {
    id: '1',
    type: 'app_registration',
    title: 'New User Registration',
    description: 'ID: REG-8924 • Sarah Jenkins',
    time: '2m ago',
    icon: '👤',
  },
  {
    id: '2',
    type: 'local_shipping',
    title: 'Shipment Dispatched',
    description: 'SHP-10492 via FastFreight',
    time: '15m ago',
    icon: '🚚',
  },
  {
    id: '3',
    type: 'inventory_2',
    title: 'Inventory Updated',
    description: '+500 Units • SKU: WH-A-44',
    time: '1h ago',
    icon: '📦',
  },
]

export const inventoryItems = [
  {
    id: '1',
    name: 'Medical Kits (Standard)',
    sku: 'MK-2023-A9',
    quantity: 320,
    location: 'Aisle 4',
    stockPercentage: 75,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6MyTfQM3019liTXMcwVQ4cz51bzdp7NPxdrhcvjDaWcqdYl6JQ_97UDxhkYRIdYvqDcRFY7GlRbc0XZszkNzrFaWF_VkEOYLYf5mgJA8_Yd42HAOQYAdgj4teB3JBHnQ_HBL4E3ETrIv7FloBp5qQDswNLoD8VBEPidSEIaMkIvNY9qpKKvmT89d601TtwPWibBoj_aBtGwNv1pUrD3-tOS-TxzxnKhTFXPepTGqcGKZQfJyI5GPRwcpwXlHUk_7KjGiCc3wM0BfE',
  },
  {
    id: '2',
    name: 'Thermal Blankets',
    sku: 'TB-88-COLD',
    quantity: 12,
    location: 'Zone B',
    stockPercentage: 15,
    isLowStock: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw7QDwugRggWkqzIhB18pCFuyVMo-_zSqGab925MJLM_7v7bNB2Ivz8B0714IgS-BNgubg3YQqmJRKnHYgOUtkrfhsFDeLiI7nd97P5mYOQ5DxxzSb6ONTcd2O7R7LI7yq1KogfHdGkkk1fWBwWbZvM2NAbqRXILs-MxGr4FkVSIUSUCDltwG5_CkW9DM6LKTdRy6uZrPl4fuWR5kGG7LnTeN_-Tn9Lb3C5FBIGTLBfRL1vE4qfX_SWQWBf6CLv1H-KURthbyKULqn',
  },
  {
    id: '3',
    name: 'Emergency Food Packs',
    sku: 'MRE-500-X',
    quantity: 850,
    location: 'Aisle 1',
    stockPercentage: 90,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJOXBpISqwfQVBjSF_8blVaxKmJd0gnOpRKNQvrCP5OhdYPOcjP4jDu1yJfSdP3qq9KmRTHkH5KklG51qW_YU_4DGQfO91Ec-55xLoeCqp9hyRhxghJRy5aKD6WS_eKBMpMdKXIDh4vmrAMAZsK9HqmqgpTDrT7uqR1EwXJU71JWlVzbs0zdnUB5GDAjeTgoqIwCbXBafxktAv4yzVszWxy7iWlejcwcuq662uYB2-HMLQJzicR2OpYGoiXj3mQVy5-_WRSPuxka2a',
  },
]

export const shipments = [
  {
    id: '1',
    trackingNumber: 'TRK-9824-A7X',
    status: 'In Transit',
    product: 'Industrial Printers',
    origin: 'Chicago, IL',
    destination: 'Dallas, TX',
    isActive: true,
    history: [
      { event: 'Departed sorting facility', time: 'Today, 08:42 AM', location: 'St. Louis, MO' },
      { event: 'Arrived at sorting facility', time: 'Yesterday, 11:20 PM', location: 'St. Louis, MO' },
      { event: 'Shipment picked up', time: 'Oct 24, 09:15 AM', location: 'Chicago, IL' },
    ],
  },
  {
    id: '2',
    trackingNumber: 'TRK-4412-B9Y',
    status: 'Delivered',
    product: 'Office Supplies Bulk',
    deliveredTime: 'Oct 23, 02:30 PM',
    isActive: false,
  },
]

export const assistanceItems = [
  {
    id: '1',
    title: 'Medical Supplies Request',
    type: 'Medical',
    date: 'Oct 25, 2026',
    status: 'Pending',
  },
  {
    id: '2',
    title: 'Food Distribution Support',
    type: 'Food',
    date: 'Oct 24, 2026',
    status: 'Approved',
  },
  {
    id: '3',
    title: 'Shelter Assistance',
    type: 'Housing',
    date: 'Oct 23, 2026',
    status: 'In Progress',
  },
]
