import {
    ChelseaBack,
    ChelseaFront,
    DortmundBack,
    DortmundFront,
    Bundesliga,
    PremierLeague,
    MilanFront,
    MilanBack,
    SerieA,
    LiverpoolFront,
    LiverpoolBack,
  } from '../../assets';
  
  export const dummyOrders = [
    {
      id: 1,
      date: 'Jumat, 18 September 2020',
      status: 'chart',
      total_price: 500000,
      weight: 1,
      orders: [
        {
          id: 1,
          product: {
            id: 1,
            name: 'CHELSEA 3RD 2018-2019',
            images: [ChelseaFront, ChelseaBack],
            liga: {
              id: 2,
              name: 'Premier League',
              images: PremierLeague,
            },
            price: 125000,
            weight: 0.25,
            type: 'Replika Top Quality',
            size: ["S", "M", "L", "XL", "XXL"],
            ready: true
          },
          total_order: 1,
          total_price: 125000,
          description: null,
          size: "L"
        },
        {
          id: 2,
          product: {
            id: 2,
            name: 'DORTMUND AWAY 2018-2019',
            images: [DortmundFront, DortmundBack],
            liga: {
              id: 4,
              name: 'Bundesliga',
              images: Bundesliga,
            },
            price: 125000,
            weight: 0.25,
            type: 'Replika Top Quality',
            size: ["S", "M", "L", "XL", "XXL"],
            ready: true
          },
          total_order: 3,
          total_price: 375000,
          description: null,
          size: "L"
        }
      ]
    },
    {
      id: 2,
      date: 'Sabtu, 19 September 2020',
      status: 'paid-off',
      total_price: 375000,
      weight: 0.75,
      orders: [
        {
          id: 1,
          product: {
            id: 5,
            name: 'LIVERPOOL AWAY 2018-2019',
            images: [LiverpoolFront, LiverpoolBack],
            liga: {
              id: 2,
              name: 'Premier League',
              images: PremierLeague,
            },
            price: 125000,
            weight: 0.25,
            type: 'Replika Top Quality',
            size: ["S", "M", "L", "XL", "XXL"],
            ready: true
          },
          total_order: 1,
          total_price: 125000,
          description: "name Jersey : Eko Nomor Punggung : 9.",
          size: "L"
        },
        {
          id: 2,
          product: {
            id: 7,
            name: 'AC MILAN HOME 2018 2019',
            images: [MilanFront, MilanBack],
            liga: {
              id: 3,
              name: 'Serie A',
              images: SerieA,
            },
            price: 125000,
            weight: 0.25,
            type: 'Replika Top Quality',
            size: ["S", "M", "L", "XL", "XXL"],
            ready: true
          },
          total_order: 2,
          total_price: 255000,
          description: "name Jersey : Afif Nomor Punggung : 10.",
          size: "M"
        }
      ]
    }
  ];
  