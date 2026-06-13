export const WHATSAPP_URL   = 'https://wa.link/wnis6u'
export const INSTAGRAM_URL  = 'https://www.instagram.com/ruaraautosold/'
export const BUSINESS_ADDRESS = 'Calle Las Palmeras Orientales #1, Res. Los Triunfadores, Santo Domingo Este, República Dominicana'
export const BUSINESS_NAME = 'RUARA AUTO SOLD'
export const BUSINESS_PHONE = '+18098285795'

// Cambia esto por el dominio definitivo cuando lo tengas (afecta sitemap, robots.txt, canonical y Open Graph)
export const SITE_URL = 'https://ruaraautosold.com'

export interface Vehicle {
  id: number
  brand: string
  model: string
  year: number
  price: number
  initial: number
  fuel: string
  transmission: string
  mileage: string
  type: 'SUV' | 'Sedán' | 'Pickup' | 'Hatchback' | 'Van'
  image: string
  fallback: string
  gallery?: string[]   // additional photos — add to /public/images/cars/car-XX-2.jpg etc.
  tag: 'PREMIUM' | 'NUEVO' | 'DISPONIBLE' | 'OFERTA' | 'VENDIDO'
  badge?: string
  color?: string
  seats?: string
  verified?: boolean
  description?: string
  owners?: number
}

export function getVehicleById(id: number): Vehicle | undefined {
  return vehicles.find(v => v.id === id)
}

export const vehicles: Vehicle[] = [
  {
    id: 1, brand: 'Ford', model: 'Explorer Limited', year: 2018,
    price: 1_350_000, initial: 270_000, fuel: 'Gasolina', transmission: 'Automático',
    mileage: '65,000 km', type: 'SUV',
    image: '/images/cars/car-01.jpg',
    fallback: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    tag: 'DISPONIBLE', color: 'Negro', seats: '7 pasajeros', verified: true,
  },
  {
    id: 2, brand: 'Nissan', model: 'Kicks', year: 2020,
    price: 750_000, initial: 150_000, fuel: 'Gasolina', transmission: 'Automático',
    mileage: '42,000 km', type: 'SUV',
    image: '/images/cars/car-02.jpg',
    fallback: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
    tag: 'DISPONIBLE', badge: 'Oferta', color: 'Gris', verified: true,
  },
  {
    id: 3, brand: 'Mazda', model: 'CX-5 Grand Touring', year: 2020,
    price: 1_100_000, initial: 220_000, fuel: 'Gasolina', transmission: 'Automático',
    mileage: '38,000 km', type: 'SUV',
    image: '/images/cars/car-03.jpg',
    fallback: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
    tag: 'PREMIUM', color: 'Negro', verified: true,
  },
  {
    id: 4, brand: 'Hyundai', model: 'Santa Fe', year: 2016,
    price: 850_000, initial: 170_000, fuel: 'Gasolina', transmission: 'Automático',
    mileage: '88,000 km', type: 'SUV',
    image: '/images/cars/car-04.jpg',
    fallback: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    tag: 'DISPONIBLE', color: 'Blanco', seats: '5 pasajeros', verified: true,
  },
  {
    id: 5, brand: 'Honda', model: 'CR-V EXL', year: 2024,
    price: 2_200_000, initial: 440_000, fuel: 'Gasolina', transmission: 'Automático CVT',
    mileage: '8,000 km', type: 'SUV',
    image: '/images/cars/car-05.jpg',
    fallback: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80',
    tag: 'NUEVO', badge: 'Último modelo', color: 'Azul Sonic', seats: '5 pasajeros', verified: true,
  },
  {
    id: 6, brand: 'Citroën', model: 'C3', year: 2022,
    price: 700_000, initial: 120_000, fuel: 'Gasolina', transmission: 'Automático',
    mileage: '54,000 km', type: 'Hatchback',
    image: '/images/cars/car-06.jpg',
    fallback: 'https://images.unsplash.com/photo-1605816988069-b11383b50717?w=800&q=80',
    tag: 'DISPONIBLE', color: 'Gris Platino', verified: true,
  },
  {
    id: 7, brand: 'Honda', model: 'Civic Sport', year: 2022,
    price: 950_000, initial: 190_000, fuel: 'Gasolina', transmission: 'Automático CVT',
    mileage: '22,000 km', type: 'Sedán',
    image: '/images/cars/car-07.jpg',
    fallback: 'https://images.unsplash.com/photo-1609629843557-d4cd43e70fd4?w=800&q=80',
    tag: 'DISPONIBLE', color: 'Sonic Gray', verified: true,
  },
  {
    id: 8, brand: 'Hyundai', model: 'Elantra SE', year: 2020,
    price: 680_000, initial: 136_000, fuel: 'Gasolina', transmission: 'Automático',
    mileage: '55,000 km', type: 'Sedán',
    image: '/images/cars/car-08.jpg',
    fallback: 'https://images.unsplash.com/photo-1621993202429-5b9e3949fc53?w=800&q=80',
    tag: 'OFERTA', badge: 'Precio rebajado', color: 'Plata', verified: true,
  },
  {
    id: 9, brand: 'Nissan', model: 'Note Sport', year: 2021,
    price: 420_000, initial: 40_000, fuel: 'Gasolina', transmission: 'Automático',
    mileage: '48,000 km', type: 'Hatchback',
    image: '/images/cars/car-09.jpg',
    fallback: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80',
    tag: 'OFERTA', badge: 'Inicial RD$40K', color: 'Gris', verified: true,
  },
  {
    id: 10, brand: 'Toyota', model: 'Yaris', year: 2021,
    price: 720_000, initial: 85_000, fuel: 'Gasolina', transmission: 'Automático',
    mileage: '32,000 km', type: 'Hatchback',
    image: '/images/cars/car-10.jpg',
    fallback: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80',
    tag: 'DISPONIBLE', color: 'Negro', verified: true,
  },
  {
    id: 11, brand: 'Ford', model: 'Fusion SE', year: 2019,
    price: 575_000, initial: 100_000, fuel: 'Gasolina', transmission: 'Automático',
    mileage: '62,000 km', type: 'Sedán',
    image: '/images/cars/car-11.jpg',
    fallback: 'https://images.unsplash.com/photo-1621993202429-5b9e3949fc53?w=800&q=80',
    tag: 'DISPONIBLE', color: 'Negro', verified: true,
  },
  {
    id: 12, brand: 'Ford', model: 'F-150', year: 2020,
    price: 930_000, initial: 250_000, fuel: 'Gasolina', transmission: 'Automático',
    mileage: '75,000 km', type: 'Pickup',
    image: '/images/cars/car-12.jpg',
    fallback: 'https://images.unsplash.com/photo-1609629843557-d4cd43e70fd4?w=800&q=80',
    tag: 'DISPONIBLE', color: 'Blanco', verified: true,
  },
  {
    id: 13, brand: 'Kia', model: 'Optima', year: 2019,
    price: 880_000, initial: 176_000, fuel: 'Gasolina', transmission: 'Automático',
    mileage: '58,000 km', type: 'Sedán',
    image: '/images/cars/car-13.jpg',
    fallback: 'https://images.unsplash.com/photo-1605816988069-b11383b50717?w=800&q=80',
    tag: 'DISPONIBLE', color: 'Blanco', verified: true,
  },
  {
    id: 14, brand: 'Daihatsu', model: 'Hijet', year: 2020,
    price: 650_000, initial: 120_000, fuel: 'Gasolina', transmission: 'Manual',
    mileage: '35,000 km', type: 'Van',
    image: '/images/cars/car-14.jpg',
    fallback: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    tag: 'DISPONIBLE', badge: 'Importado Japón', color: 'Negro', verified: true,
  },
]

export const galleryImages = [
  { id:1, src:'/images/gallery/gal-1.jpg', fallback:'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&q=85', alt:'Ford Explorer en RUARA AUTO SOLD' },
  { id:2, src:'/images/gallery/gal-2.jpg', fallback:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85', alt:'Mazda CX-5 2020' },
  { id:3, src:'/images/gallery/gal-3.jpg', fallback:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=85', alt:'Honda CR-V 2024' },
  { id:4, src:'/images/gallery/gal-4.jpg', fallback:'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=85', alt:'Nissan Note Sport' },
  { id:5, src:'/images/gallery/gal-5.jpg', fallback:'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900&q=85', alt:'Showroom RUARA AUTO SOLD' },
  { id:6, src:'/images/gallery/gal-6.jpg', fallback:'https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&q=85', alt:'Hyundai Elantra 2020' },
]

export const testimonials = [
  { id:1, name:'Carlos Mejía', city:'Santo Domingo Este', rating:5, quote:'Excelente servicio. Me aprobaron el financiamiento en menos de 24 horas. Mi Ford Explorer está impecable.', vehicle:'Ford Explorer 2018' },
  { id:2, name:'María Rodríguez', city:'Boca Chica', rating:5, quote:'Compré mi Elantra con inicial bajita y el proceso fue muy rápido. El equipo de RUARA es honesto y profesional.', vehicle:'Hyundai Elantra 2020' },
  { id:3, name:'Junior Taveras', city:'San Pedro de Macorís', rating:5, quote:'Busqué en varios dealers y ninguno me dio el trato que recibí aquí. La inicial fue flexible y el banco aprobó rápido.', vehicle:'Honda Civic 2022' },
  { id:4, name:'Ana Pérez', city:'Santo Domingo Norte', rating:5, quote:'Mi Honda CRV llegó en perfectas condiciones. Documentación completa y sin sorpresas. Totalmente confiable.', vehicle:'Honda CR-V 2024' },
  { id:5, name:'Roberto Familia', city:'La Romana', rating:5, quote:'Tercera vez que compro con RUARA. Siempre el mejor trato, los mejores precios y aprobación rápida.', vehicle:'Mazda CX-5 2020' },
  { id:6, name:'Patricia Sánchez', city:'Santiago', rating:5, quote:'Me ayudaron a escoger el Nissan Kicks ideal para mi presupuesto. El asesor fue muy paciente y claro.', vehicle:'Nissan Kicks 2020' },
]

export const stats = [
  { value:500, suffix:'+', label:'Vehículos Vendidos' },
  { value:8,   suffix:'+', label:'Bancos Aliados' },
  { value:5,   suffix:'',  label:'Años de Experiencia' },
  { value:98,  suffix:'%', label:'Tasa de Aprobación' },
]
