//@ts-nocheck
export const products = [
  {
    id: 1001,
    serialNumber: 1001,
    isNew: 1,
    photo: 'uploads/computer1.png',
    title: 'Gaming PC Alpha',
    type: 'Desktop',
    specification: 'Intel i9, 32GB RAM, RTX 4080',
    guarantee: { start: '2024-01-01 10:00:00', end: '2026-01-01 10:00:00' },
    price: [
      { value: 74000, symbol: 'UAH', isDefault: 1 },
      { value: 2000, symbol: 'USD', isDefault: 0 }
    ],
    order: 1,
    date: '2024-03-01 14:30:00'
  },
  {
    id: 1002,
    serialNumber: 1002,
    isNew: 1,
    photo: 'uploads/computer2.png',
    title: 'PC High Core',
    type: 'Desktop',
    specification: 'Intel i5, 16GB RAM, Intel UHD',
    guarantee: { start: '2024-02-01 10:00:00', end: '2026-02-01 10:00:00' },
    price: [
      { value: 25900, symbol: 'UAH', isDefault: 1 },
      { value: 700, symbol: 'USD', isDefault: 0 }
    ],
    order: 1,
    date: '2024-06-05 11:00:00'
  }
];

export const orders = [
  {
    id: 1,
    title: 'Компьютеры',
    date: '2025-01-19 12:09:33',
    description: 'desc',
    type: 'Desktop',
    products
  }
];
