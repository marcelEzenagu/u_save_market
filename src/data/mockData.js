import Rice from "../assets/images/categories/icons/rice.png"
import Biscuits from "../assets/images/categories/icons/biscuits.png"
import Burger from "../assets/images/categories/icons/burger.png"
import Chicken from "../assets/images/categories/icons/chicken-thigh.png"
import Chili from "../assets/images/categories/icons/chili.png"
import Grape from "../assets/images/categories/icons/grape.png"
import Honey from "../assets/images/categories/icons/honey.png"
import Sachet from "../assets/images/categories/icons/sachet-tea.png"
import Product1 from '../assets/images/product/1.png'
import Product2 from '../assets/images/product/2.png'
import Product3 from '../assets/images/product/3.png'
import Product4 from '../assets/images/product/4.png'
import Product5 from '../assets/images/product/5.png'
import Product6 from '../assets/images/product/6.png'
import Product7 from '../assets/images/product/7.png'
import Product8 from '../assets/images/product/8.png'
import Product9 from '../assets/images/product/9.png'
import Product10 from '../assets/images/product/10.png'
import Product11 from '../assets/images/product/11.png'
import Product12 from '../assets/images/product/12.png'
import Product13 from '../assets/images/product/13.png'
import Product14 from '../assets/images/product/14.png'
import Product15 from '../assets/images/product/15.png'
import Product16 from '../assets/images/product/16.png'
import Product17 from '../assets/images/product/17.png'
import icon1 from "../assets/images/categories/thumbnail/32 (32).png"
import icon2 from "../assets/images/categories/thumbnail/32 (31).png"
import icon3 from "../assets/images/categories/thumbnail/32 (30).png"
import icon4 from "../assets/images/categories/thumbnail/32 (29).png"
import icon5 from "../assets/images/categories/thumbnail/32 (28).png"
import icon6 from "../assets/images/categories/thumbnail/32 (27).png"
import icon7 from "../assets/images/categories/thumbnail/32 (26).png"
import icon8 from "../assets/images/categories/thumbnail/32 (25).png"
import icon9 from "../assets/images/categories/thumbnail/32 (24).png"
import icon10 from "../assets/images/categories/thumbnail/32 (23).png"
import icon11 from "../assets/images/categories/thumbnail/32 (22).png"
import icon12 from "../assets/images/categories/thumbnail/32 (21).png"
import icon13 from "../assets/images/categories/thumbnail/32 (20).png"
import icon14 from "../assets/images/categories/thumbnail/32 (19).png"
import icon15 from "../assets/images/categories/thumbnail/32 (18).png"
import icon16 from "../assets/images/categories/thumbnail/32 (17).png"
import icon17 from "../assets/images/categories/thumbnail/32 (16).png"
import icon18 from "../assets/images/categories/thumbnail/32 (15).png"
import icon19 from "../assets/images/categories/thumbnail/32 (14).png"
import icon20 from "../assets/images/categories/thumbnail/32 (13).png"
import icon21 from "../assets/images/categories/thumbnail/32 (12).png"
import icon22 from "../assets/images/categories/thumbnail/32 (11).png"
import icon23 from "../assets/images/categories/thumbnail/32 (10).png"
import icon24 from "../assets/images/categories/thumbnail/32 (9).png"
import icon25 from "../assets/images/categories/thumbnail/32 (8).png"
import icon26 from "../assets/images/categories/thumbnail/32 (7).png"
import icon27 from "../assets/images/categories/thumbnail/32 (6).png"
import icon28 from "../assets/images/categories/thumbnail/32 (5).png"
import icon29 from "../assets/images/categories/thumbnail/32 (4).png"
import icon30 from "../assets/images/categories/thumbnail/32 (3).png"
import icon31 from "../assets/images/categories/thumbnail/32 (2).png"
import icon32 from "../assets/images/categories/thumbnail/32 (1).png"
import icon33 from "../assets/images/categories/thumbnail/32 (33).png"
import Like from '../assets/images/Default/icons/like.webp'
import New from '../assets/images/Default/icons/new.webp'
import Price from '../assets/images/Default/icons/price.webp'
import Best from '../assets/images/Default/icons/best.webp'
// import { useGetCategoriesQuery } from "../features/category/categoryApiSlice"



export const MockData = [
    {
        id:'1',
        name:'Staples',
        image : Rice,
        subcat : [
          {
            id:'cat-1',
            name:'Rice & Grains',
            image:icon1,
          },
          {
            id:'cat-2',
            name:'Potatoes',
            image:icon2,
          },
          {
            id:'cat-3',
            name:'Cassavas',
            image:icon3,
          },
          {
            id:'cat-4',
            name:'Maize',
            image:icon4,
          },
          {
            id:'cat-5',
            name:'Beans',
            image:icon5,
          },

        ]
    },
    {
        id:'2',
        name:'Proteins',
        image : Chicken,
        subcat : [
            {
              id:'prot-1',
              name:'Meats',
              image:icon6,
            },
            {
                id:'prot-2',
                name:'Fish',
                image:icon7,
              },
              {
                id:'prot-3',
                name:'Eggs',
                image:icon8,
              },
              {
                id:'prot-4',
                name:'Sea-Food',
                image:icon9,
              },
          ]
    },
    {
        id:'3',
        name:'Vegetables',
        image : Chili,
        subcat : [
            {
              id:'v-1',
              name:'Tomatoes',
              image:icon10,
            },
            {
                id:'v-2',
                name:'Peppers',
                image:icon11,
              },
              {
                id:'v-3',
                name:'Root-vegetable',
                image:icon12,
              },
          ]
    },
    {
        id:'4',
        name:'Fruits',
        image : Grape,
        subcat : [
            {
              id:'f-1',
              name:'Oranges',
              image:icon13,
            },
            {
                id:'f-2',
                name:'Plantains',
                image:icon14,
              },
              {
                id:'f-3',
                name:'Mangoes',
                image:icon15,
              },
              {
                id:'f-4',
                name:'Pineapples',
                image:icon16,
              },
              {
                id:'f-5',
                name:'Watermelons',
                image:icon17,
              },
          ]
    },
    {
        id:'5',
        name:'Oils and Fats',
        image :icon33 ,
        subcat : [
            {
              id:'f-1',
              name:'Palm Oils',
              image:icon18,
            },
            {
                id:'f-2',
                name:'Groundunt Oil',
                image:icon19,
              },
              {
                id:'f-3',
                name:'Margarines',
                image:icon20,
              },
          ]
    },
    {
        id:'6',
        name:'Condiments and Sauces',
        image : Honey,
        subcat : [
            {
              id:'f-1',
              name:'Curry Powder',
              image:icon21,
            },
            {
                id:'f-2',
                name:'Thyme',
                image:icon22,
              },
              {
                id:'f-3',
                name:'Bouillon Cubes',
                image:icon23,
              },
          ]
    },
    {
        id:'7',
        name:'Snacks',
        image : Burger,
        subcat : [
            {
              id:'s-1',
              name:'Biscuits',
              image:icon24,
            },
            {
                id:'s-2',
                name:'Chocolates',
                image:icon25,
              },
              {
                id:'s-3',
                name:'Sweets',
                image:icon26,
              },
              {
                id:'s-4',
                name:'Groundnuts',
                image:icon27,
              },
              {
                id:'s-5',
                name:'Plantain Chips',
                image:icon28,
              },
          ]
    },
    {
        id:'8',
        name:'Beverages',
        image : Sachet,
        subcat : [
            {
              id:'b-1',
              name:'Tea',
              image:icon29,
            },
            {
                id:'b-2',
                name:'Coffee',
                image:icon30,
              },
              {
                id:'b-3',
                name:'Juice',
                image:icon31,
              },
              {
                id:'b-4',
                name:'Malt Drinks',
                image:icon32,
              },
          ]
    },
    {
        id:'9',
        name:'Packaged and Processed Foods',
        image : Biscuits,
        subcat : [
            {
              id:'p-1',
              name:'Canned Tomatoes',
            },
            {
                id:'p-2',
                name:'Canned Fish',
              },
              {
                id:'p-3',
                name:'Cereals',
              },
          ]
    }
];




export const countries = [
  { code: 'US', name: 'United States', number: '+1', flag: 'https://flagcdn.com/w320/us.png', currency: '$', currencyName: 'US Dollar', currency_code: 'USD' },
  { code: 'CA', name: 'Canada', number: '+1', flag: 'https://flagcdn.com/w320/ca.png', currency: 'CAD', currencyName: 'Canadian Dollar', currency_code: 'CAD' },
  { code: 'GB', name: 'United Kingdom', number: '+44', flag: 'https://flagcdn.com/w320/gb.png', currency: '£', currencyName: 'Pound Sterling', currency_code: 'GBP' },
  { code: 'AU', name: 'Australia', number: '+61', flag: 'https://flagcdn.com/w320/au.png', currency: '$', currencyName: 'Australian Dollar', currency_code: 'AUD' },
  { code: 'JP', name: 'Japan', number: '+81', flag: 'https://flagcdn.com/w320/jp.png', currency: '¥', currencyName: 'Japanese Yen', currency_code: 'JPY' },
  { code: 'CN', name: 'China', number: '+86', flag: 'https://flagcdn.com/w320/cn.png', currency: '¥', currencyName: 'Chinese Yuan', currency_code: 'CNY' },
  { code: 'FR', name: 'France', number: '+33', flag: 'https://flagcdn.com/w320/fr.png', currency: '€', currencyName: 'Euro', currency_code: 'EUR' },
  { code: 'DE', name: 'Germany', number: '+49', flag: 'https://flagcdn.com/w320/de.png', currency: '€', currencyName: 'Euro', currency_code: 'EUR' },
  { code: 'IN', name: 'India', number: '+91', flag: 'https://flagcdn.com/w320/in.png', currency: '₹', currencyName: 'Indian Rupee', currency_code: 'INR' },
  { code: 'BR', name: 'Brazil', number: '+55', flag: 'https://flagcdn.com/w320/br.png', currency: 'R$', currencyName: 'Brazilian Real', currency_code: 'BRL' },
  { code: 'ZA', name: 'South Africa', number: '+27', flag: 'https://flagcdn.com/w320/za.png', currency: 'R', currencyName: 'South African Rand', currency_code: 'ZAR' },
  { code: 'KR', name: 'South Korea', number: '+82', flag: 'https://flagcdn.com/w320/kr.png', currency: '₩', currencyName: 'South Korean Won', currency_code: 'KRW' },
  
  // African countries
  { code: 'NG', name: 'Nigeria', number: '+234', flag: 'https://flagcdn.com/w320/ng.png', currency: '₦', currencyName: 'Nigerian Naira', currency_code: 'NGN' },
  { code: 'KE', name: 'Kenya', number: '+254', flag: 'https://flagcdn.com/w320/ke.png', currency: 'KES', currencyName: 'Kenyan Shilling', currency_code: 'KES' },
  { code: 'EG', name: 'Egypt', number: '+20', flag: 'https://flagcdn.com/w320/eg.png', currency: 'E£', currencyName: 'Egyptian Pound', currency_code: 'EGP' },
  { code: 'GH', name: 'Ghana', number: '+233', flag: 'https://flagcdn.com/w320/gh.png', currency: 'GH₵', currencyName: 'Ghanaian Cedi', currency_code: 'GHS' },
  { code: 'TZ', name: 'Tanzania', number: '+255', flag: 'https://flagcdn.com/w320/tz.png', currency: 'TZS', currencyName: 'Tanzanian Shilling', currency_code: 'TZS' }
];




// export const Items = [
//   {
//     productID: '1',
//     name: 'Organic Tri-Color Quinoa with Mixed Herbs 500g',
//     price: '1995.00',
//     image: Product1, 
//   },
//   {
//     productID: '2',
//     name: 'Honey Roasted Almonds with Sea Salt and Caramel Glaze 200g',
//     price: '2500.00',
//     image: Product2, 
//   },
//   {
//     productID: '3',
//     name: 'Gluten-Free Pancake Mix with Organic Maple Syrup 400g',
//     price: '1799.00',
//     image: Product3, 
//   },
//   {
//     productID: '4',
//     name: 'Greek Yogurt with Fresh Berries and Organic Honey 150g',
//     price: '795.00',
//     image: Product4, 
//   },
//   {
//     productID: '5',
//     name: 'Chia Seeds with Omega-3 and Fiber-Rich Nutrition 300g',
//     price: '1295.00',
//     image: Product5, 
//   },
//   {
//     productID: '6',
//     name: 'Artisan Sourdough Bread with Sun-Dried Tomatoes and Olives 500g',
//     price: '1250.00',
//     image: Product1, 
//   },
//   {
//     productID: '7',
//     name: 'Cold-Pressed Organic Coconut Oil for Cooking and Skincare 1L',
//     price: '3150.00',
//     image: Product2, 
//   },
//   {
//     productID: '8',
//     name: 'Dark Chocolate with Himalayan Sea Salt and Almond Crunch 100g',
//     price: '950.00',
//     image: Product3, 
//   },
//   {
//     productID: '9',
//     name: 'Spicy Salsa with Roasted Peppers and Garlic Infusion 250g',
//     price: '850.00',
//     image: Product4, 
//   },
//   {
//     productID: '10',
//     name: 'Whole Grain Oatmeal with Flaxseed and Chia Blend 1kg',
//     price: '1750.00',
//     image: Product5, 
//   },
//   {
//     productID: '11',
//     name: 'Creamy Almond Butter with Cinnamon and Honey Swirl 300g',
//     price: '2850.00',
//     image: Product1, 
//   },
//   {
//     productID: '12',
//     name: 'Premium Matcha Green Tea Powder with Antioxidants 100g',
//     price: '2350.00',
//     image: Product2, 
//   },
//   {
//     productID: '13',
//     name: 'Protein Bars Variety Pack with Dark Chocolate and Nuts (12-pack)',
//     price: '4500.00',
//     image: Product3, 
//   },
//   {
//     productID: '14',
//     name: 'Organic Dried Mango Slices with No Added Sugar 200g',
//     price: '1200.00',
//     image: Product4, 
//   },
//   {
//     productID: '15',
//     name: 'Cold-Pressed Avocado Oil for Gourmet Cooking 500ml',
//     price: '2900.00',
//     image: Product5, 
//   },
//   {
//     productID: '16',
//     name: 'Blueberry Jam with Wild Berries and Organic Cane Sugar 250g',
//     price: '950.00',
//     image: Product1, 
//   },
//   {
//     productID: '17',
//     name: 'Mixed Nuts with Dried Cranberries and Dark Chocolate Chunks 300g',
//     price: '1600.00',
//     image: Product2, 
//   },
//   {
//     productID: '18',
//     name: 'Organic Brown Rice with Quinoa and Lentils Blend 1kg',
//     price: '1350.00',
//     image: Product3, 
//   },
//   {
//     productID: '19',
//     name: 'Kale Chips with Nutritional Yeast and Sea Salt 100g',
//     price: '850.00',
//     image: Product4, 
//   },
//   {
//     productID: '20',
//     name: 'Fresh Basil Pesto with Parmesan and Pine Nuts 150g',
//     price: '1100.00',
//     image: Product5, 
//   },
// ];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCountry() {
  const randomIndex = getRandomInt(0, countries.length - 1);
  return countries[randomIndex]?.name || "Unknown Country";
}

function getRandomPercentageOFF() {
  return getRandomInt(0, 10); // random discount percentage between 0% and 50%
}

function generateRandomName() {
  const adjectives = ["Organic", "Gluten-Free", "Fresh", "Premium", "Natural", "Delicious"];
  const products = ["Quinoa", "Almonds", "Pancake Mix", "Greek Yogurt", "Chia Seeds", "Sourdough Bread"];
  const descriptors = ["with Herbs", "with Sea Salt", "and Maple Syrup", "and Honey", "Omega-3 Rich", "with Olives"];

  const adj = adjectives[getRandomInt(0, adjectives.length - 1)];
  const prod = products[getRandomInt(0, products.length - 1)];
  const desc = descriptors[getRandomInt(0, descriptors.length - 1)];

  return `${adj} ${prod} ${prod} ${desc} ${getRandomInt(100, 400)}g`;
}

const randomTrueOrFalse = ()  =>
{
  return getRandomInt(0, 5) !== 1 ;
}

const getRandomProductimage = () => {
 let number = getRandomInt(1, 17);
    switch (number) {
      case 1:
       return Product1;
       case 2:
        return Product2;
        case 3:
          return Product3;
          case 4:
            return Product4;
            case 5:
              return Product5;
              case 6:
                return Product6;
                case 7:
                  return Product7;
                  case 8:
                    return Product8;
                    case 9:
                      return Product9;
                      case 10:
                        return Product10;
                        case 11:
                          return Product11;
                          case 12:
                            return Product12;
                            case 13:
                              return Product13;
                              case 14:
                                return Product14;
                                case 15:
                                  return Product15;
                                  case 16:
                                    return Product16;
                                    case 17:
                                      return Product17;
      default:
        Product1;
    }
}

// Generates products with configurable count
function generateProducts(itemCount = 10) {
  const products = [];

  for (let i = 1; i <= itemCount; i++) {
    const percentageOFF = getRandomPercentageOFF();
    const price = getRandomInt(500, 5000); // price range between 500 and 5000
    const old_price = percentageOFF > 0 ? (price / (1 - percentageOFF / 100)).toFixed(2) : null;

    products.push({
      productID: `${i}`,
      name: generateRandomName(),
      price: price.toFixed(2),
      old_price: old_price,
      percentageOFF: percentageOFF > 0 ? `${percentageOFF}%` : null,
      image: getRandomProductimage(), // random product image (assuming 5 images)
      in_stock: randomTrueOrFalse(),
      numberOfProductRemain: getRandomInt(2, 100),
      created_at: new Date().toISOString(),
      country: getRandomCountry(),
    });
  }

  return products;
}

export const Items = generateProducts(100); 


 export  const dataCategory = [
    {
      id:'1',
      name:'Recommended',
      image: Like
    },
    {
      id:'2',
      name:'Bestsellers',
      image: Best
    },
    {
      id:'3',
      name:'New arrivals',
      image: New
    },
    {
      id:'4',
      name:'  Deals ',
      image: Price
    }
  ]


//   export const countriesWithCurrency = [
//     {
//         "name": "South Georgia",
//         "currency": [
//             {
//                 "code": "SHP",
//                 "name": "Saint Helena pound",
//                 "symbol": "£"
//             }
//         ]
//     },
//     {
//         "name": "Grenada",
//         "currency": [
//             {
//                 "code": "XCD",
//                 "name": "Eastern Caribbean dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Switzerland",
//         "currency": [
//             {
//                 "code": "CHF",
//                 "name": "Swiss franc",
//                 "symbol": "Fr."
//             }
//         ]
//     },
//     {
//         "name": "Sierra Leone",
//         "currency": [
//             {
//                 "code": "SLL",
//                 "name": "Sierra Leonean leone",
//                 "symbol": "Le"
//             }
//         ]
//     },
//     {
//         "name": "Hungary",
//         "currency": [
//             {
//                 "code": "HUF",
//                 "name": "Hungarian forint",
//                 "symbol": "Ft"
//             }
//         ]
//     },
//     {
//         "name": "Taiwan",
//         "currency": [
//             {
//                 "code": "TWD",
//                 "name": "New Taiwan dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Wallis and Futuna",
//         "currency": [
//             {
//                 "code": "XPF",
//                 "name": "CFP franc",
//                 "symbol": "₣"
//             }
//         ]
//     },
//     {
//         "name": "Barbados",
//         "currency": [
//             {
//                 "code": "BBD",
//                 "name": "Barbadian dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Pitcairn Islands",
//         "currency": [
//             {
//                 "code": "NZD",
//                 "name": "New Zealand dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Ivory Coast",
//         "currency": [
//             {
//                 "code": "XOF",
//                 "name": "West African CFA franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Tunisia",
//         "currency": [
//             {
//                 "code": "TND",
//                 "name": "Tunisian dinar",
//                 "symbol": "د.ت"
//             }
//         ]
//     },
//     {
//         "name": "Italy",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Benin",
//         "currency": [
//             {
//                 "code": "XOF",
//                 "name": "West African CFA franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Indonesia",
//         "currency": [
//             {
//                 "code": "IDR",
//                 "name": "Indonesian rupiah",
//                 "symbol": "Rp"
//             }
//         ]
//     },
//     {
//         "name": "Cape Verde",
//         "currency": [
//             {
//                 "code": "CVE",
//                 "name": "Cape Verdean escudo",
//                 "symbol": "Esc"
//             }
//         ]
//     },
//     {
//         "name": "Saint Kitts and Nevis",
//         "currency": [
//             {
//                 "code": "XCD",
//                 "name": "Eastern Caribbean dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Laos",
//         "currency": [
//             {
//                 "code": "LAK",
//                 "name": "Lao kip",
//                 "symbol": "₭"
//             }
//         ]
//     },
//     {
//         "name": "Caribbean Netherlands",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Uganda",
//         "currency": [
//             {
//                 "code": "UGX",
//                 "name": "Ugandan shilling",
//                 "symbol": "Sh"
//             }
//         ]
//     },
//     {
//         "name": "Andorra",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Burundi",
//         "currency": [
//             {
//                 "code": "BIF",
//                 "name": "Burundian franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "South Africa",
//         "currency": [
//             {
//                 "code": "ZAR",
//                 "name": "South African rand",
//                 "symbol": "R"
//             }
//         ]
//     },
//     {
//         "name": "France",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Libya",
//         "currency": [
//             {
//                 "code": "LYD",
//                 "name": "Libyan dinar",
//                 "symbol": "ل.د"
//             }
//         ]
//     },
//     {
//         "name": "Mexico",
//         "currency": [
//             {
//                 "code": "MXN",
//                 "name": "Mexican peso",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Gabon",
//         "currency": [
//             {
//                 "code": "XAF",
//                 "name": "Central African CFA franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Northern Mariana Islands",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "North Macedonia",
//         "currency": [
//             {
//                 "code": "MKD",
//                 "name": "denar",
//                 "symbol": "den"
//             }
//         ]
//     },
//     {
//         "name": "China",
//         "currency": [
//             {
//                 "code": "CNY",
//                 "name": "Chinese yuan",
//                 "symbol": "¥"
//             }
//         ]
//     },
//     {
//         "name": "Yemen",
//         "currency": [
//             {
//                 "code": "YER",
//                 "name": "Yemeni rial",
//                 "symbol": "﷼"
//             }
//         ]
//     },
//     {
//         "name": "Saint Barthélemy",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Guernsey",
//         "currency": [
//             {
//                 "code": "GBP",
//                 "name": "British pound",
//                 "symbol": "£"
//             },
//             {
//                 "code": "GGP",
//                 "name": "Guernsey pound",
//                 "symbol": "£"
//             }
//         ]
//     },
//     {
//         "name": "Solomon Islands",
//         "currency": [
//             {
//                 "code": "SBD",
//                 "name": "Solomon Islands dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Svalbard and Jan Mayen",
//         "currency": [
//             {
//                 "code": "NOK",
//                 "name": "krone",
//                 "symbol": "kr"
//             }
//         ]
//     },
//     {
//         "name": "Faroe Islands",
//         "currency": [
//             {
//                 "code": "DKK",
//                 "name": "Danish krone",
//                 "symbol": "kr"
//             },
//             {
//                 "code": "FOK",
//                 "name": "Faroese króna",
//                 "symbol": "kr"
//             }
//         ]
//     },
//     {
//         "name": "Uzbekistan",
//         "currency": [
//             {
//                 "code": "UZS",
//                 "name": "Uzbekistani soʻm",
//                 "symbol": "so'm"
//             }
//         ]
//     },
//     {
//         "name": "Egypt",
//         "currency": [
//             {
//                 "code": "EGP",
//                 "name": "Egyptian pound",
//                 "symbol": "£"
//             }
//         ]
//     },
//     {
//         "name": "Senegal",
//         "currency": [
//             {
//                 "code": "XOF",
//                 "name": "West African CFA franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Sri Lanka",
//         "currency": [
//             {
//                 "code": "LKR",
//                 "name": "Sri Lankan rupee",
//                 "symbol": "Rs  රු"
//             }
//         ]
//     },
//     {
//         "name": "Palestine",
//         "currency": [
//             {
//                 "code": "EGP",
//                 "name": "Egyptian pound",
//                 "symbol": "E£"
//             },
//             {
//                 "code": "ILS",
//                 "name": "Israeli new shekel",
//                 "symbol": "₪"
//             },
//             {
//                 "code": "JOD",
//                 "name": "Jordanian dinar",
//                 "symbol": "JD"
//             }
//         ]
//     },
//     {
//         "name": "Bangladesh",
//         "currency": [
//             {
//                 "code": "BDT",
//                 "name": "Bangladeshi taka",
//                 "symbol": "৳"
//             }
//         ]
//     },
//     {
//         "name": "Peru",
//         "currency": [
//             {
//                 "code": "PEN",
//                 "name": "Peruvian sol",
//                 "symbol": "S/ "
//             }
//         ]
//     },
//     {
//         "name": "Singapore",
//         "currency": [
//             {
//                 "code": "SGD",
//                 "name": "Singapore dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Turkey",
//         "currency": [
//             {
//                 "code": "TRY",
//                 "name": "Turkish lira",
//                 "symbol": "₺"
//             }
//         ]
//     },
//     {
//         "name": "Afghanistan",
//         "currency": [
//             {
//                 "code": "AFN",
//                 "name": "Afghan afghani",
//                 "symbol": "؋"
//             }
//         ]
//     },
//     {
//         "name": "Aruba",
//         "currency": [
//             {
//                 "code": "AWG",
//                 "name": "Aruban florin",
//                 "symbol": "ƒ"
//             }
//         ]
//     },
//     {
//         "name": "Cook Islands",
//         "currency": [
//             {
//                 "code": "CKD",
//                 "name": "Cook Islands dollar",
//                 "symbol": "$"
//             },
//             {
//                 "code": "NZD",
//                 "name": "New Zealand dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "United Kingdom",
//         "currency": [
//             {
//                 "code": "GBP",
//                 "name": "British pound",
//                 "symbol": "£"
//             }
//         ]
//     },
//     {
//         "name": "Zambia",
//         "currency": [
//             {
//                 "code": "ZMW",
//                 "name": "Zambian kwacha",
//                 "symbol": "ZK"
//             }
//         ]
//     },
//     {
//         "name": "Finland",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Niger",
//         "currency": [
//             {
//                 "code": "XOF",
//                 "name": "West African CFA franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Christmas Island",
//         "currency": [
//             {
//                 "code": "AUD",
//                 "name": "Australian dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Tokelau",
//         "currency": [
//             {
//                 "code": "NZD",
//                 "name": "New Zealand dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Guinea-Bissau",
//         "currency": [
//             {
//                 "code": "XOF",
//                 "name": "West African CFA franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Azerbaijan",
//         "currency": [
//             {
//                 "code": "AZN",
//                 "name": "Azerbaijani manat",
//                 "symbol": "₼"
//             }
//         ]
//     },
//     {
//         "name": "Réunion",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Djibouti",
//         "currency": [
//             {
//                 "code": "DJF",
//                 "name": "Djiboutian franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "North Korea",
//         "currency": [
//             {
//                 "code": "KPW",
//                 "name": "North Korean won",
//                 "symbol": "₩"
//             }
//         ]
//     },
//     {
//         "name": "Mauritius",
//         "currency": [
//             {
//                 "code": "MUR",
//                 "name": "Mauritian rupee",
//                 "symbol": "₨"
//             }
//         ]
//     },
//     {
//         "name": "Montserrat",
//         "currency": [
//             {
//                 "code": "XCD",
//                 "name": "Eastern Caribbean dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "United States Virgin Islands",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Colombia",
//         "currency": [
//             {
//                 "code": "COP",
//                 "name": "Colombian peso",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Greece",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Croatia",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Morocco",
//         "currency": [
//             {
//                 "code": "MAD",
//                 "name": "Moroccan dirham",
//                 "symbol": "د.م."
//             }
//         ]
//     },
//     {
//         "name": "Algeria",
//         "currency": [
//             {
//                 "code": "DZD",
//                 "name": "Algerian dinar",
//                 "symbol": "د.ج"
//             }
//         ]
//     },
//     {
//         "name": "Antarctica",
//         "currency": null
//     },
//     {
//         "name": "Netherlands",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Sudan",
//         "currency": [
//             {
//                 "code": "SDG",
//                 "name": "Sudanese pound",
//                 "symbol": "ج.س"
//             }
//         ]
//     },
//     {
//         "name": "Fiji",
//         "currency": [
//             {
//                 "code": "FJD",
//                 "name": "Fijian dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Liechtenstein",
//         "currency": [
//             {
//                 "code": "CHF",
//                 "name": "Swiss franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Nepal",
//         "currency": [
//             {
//                 "code": "NPR",
//                 "name": "Nepalese rupee",
//                 "symbol": "₨"
//             }
//         ]
//     },
//     {
//         "name": "Puerto Rico",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Georgia",
//         "currency": [
//             {
//                 "code": "GEL",
//                 "name": "lari",
//                 "symbol": "₾"
//             }
//         ]
//     },
//     {
//         "name": "Pakistan",
//         "currency": [
//             {
//                 "code": "PKR",
//                 "name": "Pakistani rupee",
//                 "symbol": "₨"
//             }
//         ]
//     },
//     {
//         "name": "Monaco",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Botswana",
//         "currency": [
//             {
//                 "code": "BWP",
//                 "name": "Botswana pula",
//                 "symbol": "P"
//             }
//         ]
//     },
//     {
//         "name": "Lebanon",
//         "currency": [
//             {
//                 "code": "LBP",
//                 "name": "Lebanese pound",
//                 "symbol": "ل.ل"
//             }
//         ]
//     },
//     {
//         "name": "Papua New Guinea",
//         "currency": [
//             {
//                 "code": "PGK",
//                 "name": "Papua New Guinean kina",
//                 "symbol": "K"
//             }
//         ]
//     },
//     {
//         "name": "Mayotte",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Dominican Republic",
//         "currency": [
//             {
//                 "code": "DOP",
//                 "name": "Dominican peso",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Norfolk Island",
//         "currency": [
//             {
//                 "code": "AUD",
//                 "name": "Australian dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Bouvet Island",
//         "currency": null
//     },
//     {
//         "name": "Qatar",
//         "currency": [
//             {
//                 "code": "QAR",
//                 "name": "Qatari riyal",
//                 "symbol": "ر.ق"
//             }
//         ]
//     },
//     {
//         "name": "Madagascar",
//         "currency": [
//             {
//                 "code": "MGA",
//                 "name": "Malagasy ariary",
//                 "symbol": "Ar"
//             }
//         ]
//     },
//     {
//         "name": "India",
//         "currency": [
//             {
//                 "code": "INR",
//                 "name": "Indian rupee",
//                 "symbol": "₹"
//             }
//         ]
//     },
//     {
//         "name": "Syria",
//         "currency": [
//             {
//                 "code": "SYP",
//                 "name": "Syrian pound",
//                 "symbol": "£"
//             }
//         ]
//     },
//     {
//         "name": "Montenegro",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Eswatini",
//         "currency": [
//             {
//                 "code": "SZL",
//                 "name": "Swazi lilangeni",
//                 "symbol": "L"
//             },
//             {
//                 "code": "ZAR",
//                 "name": "South African rand",
//                 "symbol": "R"
//             }
//         ]
//     },
//     {
//         "name": "Paraguay",
//         "currency": [
//             {
//                 "code": "PYG",
//                 "name": "Paraguayan guaraní",
//                 "symbol": "₲"
//             }
//         ]
//     },
//     {
//         "name": "El Salvador",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Ukraine",
//         "currency": [
//             {
//                 "code": "UAH",
//                 "name": "Ukrainian hryvnia",
//                 "symbol": "₴"
//             }
//         ]
//     },
//     {
//         "name": "Isle of Man",
//         "currency": [
//             {
//                 "code": "GBP",
//                 "name": "British pound",
//                 "symbol": "£"
//             },
//             {
//                 "code": "IMP",
//                 "name": "Manx pound",
//                 "symbol": "£"
//             }
//         ]
//     },
//     {
//         "name": "Namibia",
//         "currency": [
//             {
//                 "code": "NAD",
//                 "name": "Namibian dollar",
//                 "symbol": "$"
//             },
//             {
//                 "code": "ZAR",
//                 "name": "South African rand",
//                 "symbol": "R"
//             }
//         ]
//     },
//     {
//         "name": "United Arab Emirates",
//         "currency": [
//             {
//                 "code": "AED",
//                 "name": "United Arab Emirates dirham",
//                 "symbol": "د.إ"
//             }
//         ]
//     },
//     {
//         "name": "Bulgaria",
//         "currency": [
//             {
//                 "code": "BGN",
//                 "name": "Bulgarian lev",
//                 "symbol": "лв"
//             }
//         ]
//     },
//     {
//         "name": "Greenland",
//         "currency": [
//             {
//                 "code": "DKK",
//                 "name": "krone",
//                 "symbol": "kr."
//             }
//         ]
//     },
//     {
//         "name": "Germany",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Cambodia",
//         "currency": [
//             {
//                 "code": "KHR",
//                 "name": "Cambodian riel",
//                 "symbol": "៛"
//             },
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Iraq",
//         "currency": [
//             {
//                 "code": "IQD",
//                 "name": "Iraqi dinar",
//                 "symbol": "ع.د"
//             }
//         ]
//     },
//     {
//         "name": "French Southern and Antarctic Lands",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Sweden",
//         "currency": [
//             {
//                 "code": "SEK",
//                 "name": "Swedish krona",
//                 "symbol": "kr"
//             }
//         ]
//     },
//     {
//         "name": "Cuba",
//         "currency": [
//             {
//                 "code": "CUC",
//                 "name": "Cuban convertible peso",
//                 "symbol": "$"
//             },
//             {
//                 "code": "CUP",
//                 "name": "Cuban peso",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Kyrgyzstan",
//         "currency": [
//             {
//                 "code": "KGS",
//                 "name": "Kyrgyzstani som",
//                 "symbol": "с"
//             }
//         ]
//     },
//     {
//         "name": "Russia",
//         "currency": [
//             {
//                 "code": "RUB",
//                 "name": "Russian ruble",
//                 "symbol": "₽"
//             }
//         ]
//     },
//     {
//         "name": "Malaysia",
//         "currency": [
//             {
//                 "code": "MYR",
//                 "name": "Malaysian ringgit",
//                 "symbol": "RM"
//             }
//         ]
//     },
//     {
//         "name": "São Tomé and Príncipe",
//         "currency": [
//             {
//                 "code": "STN",
//                 "name": "São Tomé and Príncipe dobra",
//                 "symbol": "Db"
//             }
//         ]
//     },
//     {
//         "name": "Cyprus",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Canada",
//         "currency": [
//             {
//                 "code": "CAD",
//                 "name": "Canadian dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Malawi",
//         "currency": [
//             {
//                 "code": "MWK",
//                 "name": "Malawian kwacha",
//                 "symbol": "MK"
//             }
//         ]
//     },
//     {
//         "name": "Saudi Arabia",
//         "currency": [
//             {
//                 "code": "SAR",
//                 "name": "Saudi riyal",
//                 "symbol": "ر.س"
//             }
//         ]
//     },
//     {
//         "name": "Bosnia and Herzegovina",
//         "currency": [
//             {
//                 "code": "BAM",
//                 "name": "Bosnia and Herzegovina convertible mark",
//                 "symbol": "KM"
//             }
//         ]
//     },
//     {
//         "name": "Ethiopia",
//         "currency": [
//             {
//                 "code": "ETB",
//                 "name": "Ethiopian birr",
//                 "symbol": "Br"
//             }
//         ]
//     },
//     {
//         "name": "Spain",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Slovenia",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Oman",
//         "currency": [
//             {
//                 "code": "OMR",
//                 "name": "Omani rial",
//                 "symbol": "ر.ع."
//             }
//         ]
//     },
//     {
//         "name": "Saint Pierre and Miquelon",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Macau",
//         "currency": [
//             {
//                 "code": "MOP",
//                 "name": "Macanese pataca",
//                 "symbol": "P"
//             }
//         ]
//     },
//     {
//         "name": "San Marino",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Lesotho",
//         "currency": [
//             {
//                 "code": "LSL",
//                 "name": "Lesotho loti",
//                 "symbol": "L"
//             },
//             {
//                 "code": "ZAR",
//                 "name": "South African rand",
//                 "symbol": "R"
//             }
//         ]
//     },
//     {
//         "name": "Marshall Islands",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Sint Maarten",
//         "currency": [
//             {
//                 "code": "ANG",
//                 "name": "Netherlands Antillean guilder",
//                 "symbol": "ƒ"
//             }
//         ]
//     },
//     {
//         "name": "Iceland",
//         "currency": [
//             {
//                 "code": "ISK",
//                 "name": "Icelandic króna",
//                 "symbol": "kr"
//             }
//         ]
//     },
//     {
//         "name": "Luxembourg",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Argentina",
//         "currency": [
//             {
//                 "code": "ARS",
//                 "name": "Argentine peso",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Turks and Caicos Islands",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Nauru",
//         "currency": [
//             {
//                 "code": "AUD",
//                 "name": "Australian dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Cocos (Keeling) Islands",
//         "currency": [
//             {
//                 "code": "AUD",
//                 "name": "Australian dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Western Sahara",
//         "currency": [
//             {
//                 "code": "DZD",
//                 "name": "Algerian dinar",
//                 "symbol": "دج"
//             },
//             {
//                 "code": "MAD",
//                 "name": "Moroccan dirham",
//                 "symbol": "DH"
//             },
//             {
//                 "code": "MRU",
//                 "name": "Mauritanian ouguiya",
//                 "symbol": "UM"
//             }
//         ]
//     },
//     {
//         "name": "Dominica",
//         "currency": [
//             {
//                 "code": "XCD",
//                 "name": "Eastern Caribbean dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Costa Rica",
//         "currency": [
//             {
//                 "code": "CRC",
//                 "name": "Costa Rican colón",
//                 "symbol": "₡"
//             }
//         ]
//     },
//     {
//         "name": "Australia",
//         "currency": [
//             {
//                 "code": "AUD",
//                 "name": "Australian dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Thailand",
//         "currency": [
//             {
//                 "code": "THB",
//                 "name": "Thai baht",
//                 "symbol": "฿"
//             }
//         ]
//     },
//     {
//         "name": "Haiti",
//         "currency": [
//             {
//                 "code": "HTG",
//                 "name": "Haitian gourde",
//                 "symbol": "G"
//             }
//         ]
//     },
//     {
//         "name": "Tuvalu",
//         "currency": [
//             {
//                 "code": "AUD",
//                 "name": "Australian dollar",
//                 "symbol": "$"
//             },
//             {
//                 "code": "TVD",
//                 "name": "Tuvaluan dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Honduras",
//         "currency": [
//             {
//                 "code": "HNL",
//                 "name": "Honduran lempira",
//                 "symbol": "L"
//             }
//         ]
//     },
//     {
//         "name": "Equatorial Guinea",
//         "currency": [
//             {
//                 "code": "XAF",
//                 "name": "Central African CFA franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Saint Lucia",
//         "currency": [
//             {
//                 "code": "XCD",
//                 "name": "Eastern Caribbean dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "French Polynesia",
//         "currency": [
//             {
//                 "code": "XPF",
//                 "name": "CFP franc",
//                 "symbol": "₣"
//             }
//         ]
//     },
//     {
//         "name": "Belarus",
//         "currency": [
//             {
//                 "code": "BYN",
//                 "name": "Belarusian ruble",
//                 "symbol": "Br"
//             }
//         ]
//     },
//     {
//         "name": "Latvia",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Palau",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Guadeloupe",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Philippines",
//         "currency": [
//             {
//                 "code": "PHP",
//                 "name": "Philippine peso",
//                 "symbol": "₱"
//             }
//         ]
//     },
//     {
//         "name": "Gibraltar",
//         "currency": [
//             {
//                 "code": "GIP",
//                 "name": "Gibraltar pound",
//                 "symbol": "£"
//             }
//         ]
//     },
//     {
//         "name": "Denmark",
//         "currency": [
//             {
//                 "code": "DKK",
//                 "name": "Danish krone",
//                 "symbol": "kr"
//             }
//         ]
//     },
//     {
//         "name": "Cameroon",
//         "currency": [
//             {
//                 "code": "XAF",
//                 "name": "Central African CFA franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Guinea",
//         "currency": [
//             {
//                 "code": "GNF",
//                 "name": "Guinean franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Bahrain",
//         "currency": [
//             {
//                 "code": "BHD",
//                 "name": "Bahraini dinar",
//                 "symbol": ".د.ب"
//             }
//         ]
//     },
//     {
//         "name": "Suriname",
//         "currency": [
//             {
//                 "code": "SRD",
//                 "name": "Surinamese dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "DR Congo",
//         "currency": [
//             {
//                 "code": "CDF",
//                 "name": "Congolese franc",
//                 "symbol": "FC"
//             }
//         ]
//     },
//     {
//         "name": "Somalia",
//         "currency": [
//             {
//                 "code": "SOS",
//                 "name": "Somali shilling",
//                 "symbol": "Sh"
//             }
//         ]
//     },
//     {
//         "name": "Czechia",
//         "currency": [
//             {
//                 "code": "CZK",
//                 "name": "Czech koruna",
//                 "symbol": "Kč"
//             }
//         ]
//     },
//     {
//         "name": "New Caledonia",
//         "currency": [
//             {
//                 "code": "XPF",
//                 "name": "CFP franc",
//                 "symbol": "₣"
//             }
//         ]
//     },
//     {
//         "name": "Vanuatu",
//         "currency": [
//             {
//                 "code": "VUV",
//                 "name": "Vanuatu vatu",
//                 "symbol": "Vt"
//             }
//         ]
//     },
//     {
//         "name": "Saint Helena, Ascension and Tristan da Cunha",
//         "currency": [
//             {
//                 "code": "GBP",
//                 "name": "Pound sterling",
//                 "symbol": "£"
//             },
//             {
//                 "code": "SHP",
//                 "name": "Saint Helena pound",
//                 "symbol": "£"
//             }
//         ]
//     },
//     {
//         "name": "Togo",
//         "currency": [
//             {
//                 "code": "XOF",
//                 "name": "West African CFA franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "British Virgin Islands",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Kenya",
//         "currency": [
//             {
//                 "code": "KES",
//                 "name": "Kenyan shilling",
//                 "symbol": "Sh"
//             }
//         ]
//     },
//     {
//         "name": "Niue",
//         "currency": [
//             {
//                 "code": "NZD",
//                 "name": "New Zealand dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Heard Island and McDonald Islands",
//         "currency": null
//     },
//     {
//         "name": "Rwanda",
//         "currency": [
//             {
//                 "code": "RWF",
//                 "name": "Rwandan franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Estonia",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Romania",
//         "currency": [
//             {
//                 "code": "RON",
//                 "name": "Romanian leu",
//                 "symbol": "lei"
//             }
//         ]
//     },
//     {
//         "name": "Trinidad and Tobago",
//         "currency": [
//             {
//                 "code": "TTD",
//                 "name": "Trinidad and Tobago dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Guyana",
//         "currency": [
//             {
//                 "code": "GYD",
//                 "name": "Guyanese dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Timor-Leste",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Vietnam",
//         "currency": [
//             {
//                 "code": "VND",
//                 "name": "Vietnamese đồng",
//                 "symbol": "₫"
//             }
//         ]
//     },
//     {
//         "name": "Uruguay",
//         "currency": [
//             {
//                 "code": "UYU",
//                 "name": "Uruguayan peso",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Vatican City",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Hong Kong",
//         "currency": [
//             {
//                 "code": "HKD",
//                 "name": "Hong Kong dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Austria",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Antigua and Barbuda",
//         "currency": [
//             {
//                 "code": "XCD",
//                 "name": "Eastern Caribbean dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Turkmenistan",
//         "currency": [
//             {
//                 "code": "TMT",
//                 "name": "Turkmenistan manat",
//                 "symbol": "m"
//             }
//         ]
//     },
//     {
//         "name": "Mozambique",
//         "currency": [
//             {
//                 "code": "MZN",
//                 "name": "Mozambican metical",
//                 "symbol": "MT"
//             }
//         ]
//     },
//     {
//         "name": "Panama",
//         "currency": [
//             {
//                 "code": "PAB",
//                 "name": "Panamanian balboa",
//                 "symbol": "B/."
//             },
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Micronesia",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Ireland",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Curaçao",
//         "currency": [
//             {
//                 "code": "ANG",
//                 "name": "Netherlands Antillean guilder",
//                 "symbol": "ƒ"
//             }
//         ]
//     },
//     {
//         "name": "French Guiana",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Norway",
//         "currency": [
//             {
//                 "code": "NOK",
//                 "name": "Norwegian krone",
//                 "symbol": "kr"
//             }
//         ]
//     },
//     {
//         "name": "Åland Islands",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Central African Republic",
//         "currency": [
//             {
//                 "code": "XAF",
//                 "name": "Central African CFA franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Burkina Faso",
//         "currency": [
//             {
//                 "code": "XOF",
//                 "name": "West African CFA franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Eritrea",
//         "currency": [
//             {
//                 "code": "ERN",
//                 "name": "Eritrean nakfa",
//                 "symbol": "Nfk"
//             }
//         ]
//     },
//     {
//         "name": "Tanzania",
//         "currency": [
//             {
//                 "code": "TZS",
//                 "name": "Tanzanian shilling",
//                 "symbol": "Sh"
//             }
//         ]
//     },
//     {
//         "name": "South Korea",
//         "currency": [
//             {
//                 "code": "KRW",
//                 "name": "South Korean won",
//                 "symbol": "₩"
//             }
//         ]
//     },
//     {
//         "name": "Jordan",
//         "currency": [
//             {
//                 "code": "JOD",
//                 "name": "Jordanian dinar",
//                 "symbol": "د.ا"
//             }
//         ]
//     },
//     {
//         "name": "Mauritania",
//         "currency": [
//             {
//                 "code": "MRU",
//                 "name": "Mauritanian ouguiya",
//                 "symbol": "UM"
//             }
//         ]
//     },
//     {
//         "name": "Lithuania",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "United States Minor Outlying Islands",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Slovakia",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Angola",
//         "currency": [
//             {
//                 "code": "AOA",
//                 "name": "Angolan kwanza",
//                 "symbol": "Kz"
//             }
//         ]
//     },
//     {
//         "name": "Kazakhstan",
//         "currency": [
//             {
//                 "code": "KZT",
//                 "name": "Kazakhstani tenge",
//                 "symbol": "₸"
//             }
//         ]
//     },
//     {
//         "name": "Moldova",
//         "currency": [
//             {
//                 "code": "MDL",
//                 "name": "Moldovan leu",
//                 "symbol": "L"
//             }
//         ]
//     },
//     {
//         "name": "Mali",
//         "currency": [
//             {
//                 "code": "XOF",
//                 "name": "West African CFA franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Falkland Islands",
//         "currency": [
//             {
//                 "code": "FKP",
//                 "name": "Falkland Islands pound",
//                 "symbol": "£"
//             }
//         ]
//     },
//     {
//         "name": "Armenia",
//         "currency": [
//             {
//                 "code": "AMD",
//                 "name": "Armenian dram",
//                 "symbol": "֏"
//             }
//         ]
//     },
//     {
//         "name": "Samoa",
//         "currency": [
//             {
//                 "code": "WST",
//                 "name": "Samoan tālā",
//                 "symbol": "T"
//             }
//         ]
//     },
//     {
//         "name": "Jersey",
//         "currency": [
//             {
//                 "code": "GBP",
//                 "name": "British pound",
//                 "symbol": "£"
//             },
//             {
//                 "code": "JEP",
//                 "name": "Jersey pound",
//                 "symbol": "£"
//             }
//         ]
//     },
//     {
//         "name": "Japan",
//         "currency": [
//             {
//                 "code": "JPY",
//                 "name": "Japanese yen",
//                 "symbol": "¥"
//             }
//         ]
//     },
//     {
//         "name": "Bolivia",
//         "currency": [
//             {
//                 "code": "BOB",
//                 "name": "Bolivian boliviano",
//                 "symbol": "Bs."
//             }
//         ]
//     },
//     {
//         "name": "Chile",
//         "currency": [
//             {
//                 "code": "CLP",
//                 "name": "Chilean peso",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "United States",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Saint Vincent and the Grenadines",
//         "currency": [
//             {
//                 "code": "XCD",
//                 "name": "Eastern Caribbean dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Bermuda",
//         "currency": [
//             {
//                 "code": "BMD",
//                 "name": "Bermudian dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Seychelles",
//         "currency": [
//             {
//                 "code": "SCR",
//                 "name": "Seychellois rupee",
//                 "symbol": "₨"
//             }
//         ]
//     },
//     {
//         "name": "British Indian Ocean Territory",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Guatemala",
//         "currency": [
//             {
//                 "code": "GTQ",
//                 "name": "Guatemalan quetzal",
//                 "symbol": "Q"
//             }
//         ]
//     },
//     {
//         "name": "Ecuador",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Martinique",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Tajikistan",
//         "currency": [
//             {
//                 "code": "TJS",
//                 "name": "Tajikistani somoni",
//                 "symbol": "ЅМ"
//             }
//         ]
//     },
//     {
//         "name": "Malta",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Gambia",
//         "currency": [
//             {
//                 "code": "GMD",
//                 "name": "dalasi",
//                 "symbol": "D"
//             }
//         ]
//     },
//     {
//         "name": "Nigeria",
//         "currency": [
//             {
//                 "code": "NGN",
//                 "name": "Nigerian naira",
//                 "symbol": "₦"
//             }
//         ]
//     },
//     {
//         "name": "Bahamas",
//         "currency": [
//             {
//                 "code": "BSD",
//                 "name": "Bahamian dollar",
//                 "symbol": "$"
//             },
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Kosovo",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Kuwait",
//         "currency": [
//             {
//                 "code": "KWD",
//                 "name": "Kuwaiti dinar",
//                 "symbol": "د.ك"
//             }
//         ]
//     },
//     {
//         "name": "Maldives",
//         "currency": [
//             {
//                 "code": "MVR",
//                 "name": "Maldivian rufiyaa",
//                 "symbol": ".ރ"
//             }
//         ]
//     },
//     {
//         "name": "South Sudan",
//         "currency": [
//             {
//                 "code": "SSP",
//                 "name": "South Sudanese pound",
//                 "symbol": "£"
//             }
//         ]
//     },
//     {
//         "name": "Iran",
//         "currency": [
//             {
//                 "code": "IRR",
//                 "name": "Iranian rial",
//                 "symbol": "﷼"
//             }
//         ]
//     },
//     {
//         "name": "Albania",
//         "currency": [
//             {
//                 "code": "ALL",
//                 "name": "Albanian lek",
//                 "symbol": "L"
//             }
//         ]
//     },
//     {
//         "name": "Brazil",
//         "currency": [
//             {
//                 "code": "BRL",
//                 "name": "Brazilian real",
//                 "symbol": "R$"
//             }
//         ]
//     },
//     {
//         "name": "Serbia",
//         "currency": [
//             {
//                 "code": "RSD",
//                 "name": "Serbian dinar",
//                 "symbol": "дин."
//             }
//         ]
//     },
//     {
//         "name": "Belize",
//         "currency": [
//             {
//                 "code": "BZD",
//                 "name": "Belize dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Myanmar",
//         "currency": [
//             {
//                 "code": "MMK",
//                 "name": "Burmese kyat",
//                 "symbol": "Ks"
//             }
//         ]
//     },
//     {
//         "name": "Bhutan",
//         "currency": [
//             {
//                 "code": "BTN",
//                 "name": "Bhutanese ngultrum",
//                 "symbol": "Nu."
//             },
//             {
//                 "code": "INR",
//                 "name": "Indian rupee",
//                 "symbol": "₹"
//             }
//         ]
//     },
//     {
//         "name": "Venezuela",
//         "currency": [
//             {
//                 "code": "VES",
//                 "name": "Venezuelan bolívar soberano",
//                 "symbol": "Bs.S."
//             }
//         ]
//     },
//     {
//         "name": "Liberia",
//         "currency": [
//             {
//                 "code": "LRD",
//                 "name": "Liberian dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Jamaica",
//         "currency": [
//             {
//                 "code": "JMD",
//                 "name": "Jamaican dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Poland",
//         "currency": [
//             {
//                 "code": "PLN",
//                 "name": "Polish złoty",
//                 "symbol": "zł"
//             }
//         ]
//     },
//     {
//         "name": "Cayman Islands",
//         "currency": [
//             {
//                 "code": "KYD",
//                 "name": "Cayman Islands dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Brunei",
//         "currency": [
//             {
//                 "code": "BND",
//                 "name": "Brunei dollar",
//                 "symbol": "$"
//             },
//             {
//                 "code": "SGD",
//                 "name": "Singapore dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Comoros",
//         "currency": [
//             {
//                 "code": "KMF",
//                 "name": "Comorian franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Guam",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Tonga",
//         "currency": [
//             {
//                 "code": "TOP",
//                 "name": "Tongan paʻanga",
//                 "symbol": "T$"
//             }
//         ]
//     },
//     {
//         "name": "Kiribati",
//         "currency": [
//             {
//                 "code": "AUD",
//                 "name": "Australian dollar",
//                 "symbol": "$"
//             },
//             {
//                 "code": "KID",
//                 "name": "Kiribati dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Ghana",
//         "currency": [
//             {
//                 "code": "GHS",
//                 "name": "Ghanaian cedi",
//                 "symbol": "₵"
//             }
//         ]
//     },
//     {
//         "name": "Chad",
//         "currency": [
//             {
//                 "code": "XAF",
//                 "name": "Central African CFA franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Zimbabwe",
//         "currency": [
//             {
//                 "code": "ZWL",
//                 "name": "Zimbabwean dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Saint Martin",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Mongolia",
//         "currency": [
//             {
//                 "code": "MNT",
//                 "name": "Mongolian tögrög",
//                 "symbol": "₮"
//             }
//         ]
//     },
//     {
//         "name": "Portugal",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "American Samoa",
//         "currency": [
//             {
//                 "code": "USD",
//                 "name": "United States dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Republic of the Congo",
//         "currency": [
//             {
//                 "code": "XAF",
//                 "name": "Central African CFA franc",
//                 "symbol": "Fr"
//             }
//         ]
//     },
//     {
//         "name": "Belgium",
//         "currency": [
//             {
//                 "code": "EUR",
//                 "name": "Euro",
//                 "symbol": "€"
//             }
//         ]
//     },
//     {
//         "name": "Israel",
//         "currency": [
//             {
//                 "code": "ILS",
//                 "name": "Israeli new shekel",
//                 "symbol": "₪"
//             }
//         ]
//     },
//     {
//         "name": "New Zealand",
//         "currency": [
//             {
//                 "code": "NZD",
//                 "name": "New Zealand dollar",
//                 "symbol": "$"
//             }
//         ]
//     },
//     {
//         "name": "Nicaragua",
//         "currency": [
//             {
//                 "code": "NIO",
//                 "name": "Nicaraguan córdoba",
//                 "symbol": "C$"
//             }
//         ]
//     },
//     {
//         "name": "Anguilla",
//         "currency": [
//             {
//                 "code": "XCD",
//                 "name": "Eastern Caribbean dollar",
//                 "symbol": "$"
//             }
//         ]
//     }
// ]