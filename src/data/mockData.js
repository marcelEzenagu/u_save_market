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
]
export const countries = [
  { code: 'US', name: 'United States', number: '+1', flag: 'https://flagcdn.com/w320/us.png', currency: '$', currencyName: 'US Dollar' },
  { code: 'CA', name: 'Canada', number: '+1', flag: 'https://flagcdn.com/w320/ca.png', currency: 'CAD', currencyName: 'Canadian Dollar' },
  { code: 'GB', name: 'United Kingdom', number: '+44', flag: 'https://flagcdn.com/w320/gb.png', currency: '£', currencyName: 'Pound Sterling' },
  { code: 'AU', name: 'Australia', number: '+61', flag: 'https://flagcdn.com/w320/au.png', currency: '$', currencyName: 'Australian Dollar' },
  { code: 'JP', name: 'Japan', number: '+81', flag: 'https://flagcdn.com/w320/jp.png', currency: '¥', currencyName: 'Japanese Yen' },
  { code: 'CN', name: 'China', number: '+86', flag: 'https://flagcdn.com/w320/cn.png', currency: '¥', currencyName: 'Chinese Yuan' },
  { code: 'FR', name: 'France', number: '+33', flag: 'https://flagcdn.com/w320/fr.png', currency: '€', currencyName: 'Euro' },
  { code: 'DE', name: 'Germany', number: '+49', flag: 'https://flagcdn.com/w320/de.png', currency: '€', currencyName: 'Euro' },
  { code: 'IN', name: 'India', number: '+91', flag: 'https://flagcdn.com/w320/in.png', currency: '₹', currencyName: 'Indian Rupee' },
  { code: 'BR', name: 'Brazil', number: '+55', flag: 'https://flagcdn.com/w320/br.png', currency: 'R$', currencyName: 'Brazilian Real' },
  { code: 'ZA', name: 'South Africa', number: '+27', flag: 'https://flagcdn.com/w320/za.png', currency: 'R', currencyName: 'South African Rand' },
  { code: 'KR', name: 'South Korea', number: '+82', flag: 'https://flagcdn.com/w320/kr.png', currency: '₩', currencyName: 'South Korean Won' },
  
  // African countries
  { code: 'NG', name: 'Nigeria', number: '+234', flag: 'https://flagcdn.com/w320/ng.png', currency: '₦', currencyName: 'Nigerian Naira' },
  { code: 'KE', name: 'Kenya', number: '+254', flag: 'https://flagcdn.com/w320/ke.png', currency: 'KES', currencyName: 'Kenyan Shilling' },
  { code: 'EG', name: 'Egypt', number: '+20', flag: 'https://flagcdn.com/w320/eg.png', currency: 'E£', currencyName: 'Egyptian Pound' },
  { code: 'GH', name: 'Ghana', number: '+233', flag: 'https://flagcdn.com/w320/gh.png', currency: 'GH₵', currencyName: 'Ghanaian Cedi' },
  { code: 'TZ', name: 'Tanzania', number: '+255', flag: 'https://flagcdn.com/w320/tz.png', currency: 'TZS', currencyName: 'Tanzanian Shilling' }
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