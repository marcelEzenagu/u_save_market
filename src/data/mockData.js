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
        image :'' ,
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

export const Items = [
    {
      id: 1,
      name: 'Spice Supreme Curry Powder 85 g',
      price: '1585.00',
      image: Product1, 
    },
    {
      id: 2,
      name: 'Spice Supreme Curry Powder 85 g',
      price: '1585.00',
      image: Product2, // Replace with actual image URL
    },
    {
        id: 3,
        name: 'Spice Supreme Curry Powder 85 g',
        price: '1585.00',
        image: Product3, 
      },
      {
        id: 4,
        name: 'Spice Supreme Curry Powder 85 g',
        price: '1585.00',
        image: Product4, // Replace with actual image URL
      },
      {
        id: 5,
        name: 'Spice Supreme Curry Powder 85 g',
        price: '1585.00',
        image: Product5, // Replace with actual image URL
      },
      {
        id: 6,
        name: 'Spice Supreme Curry Powder 85 g',
        price: '1585.00',
        image: Product1, 
      },
      {
        id: 7,
        name: 'Spice Supreme Curry Powder 85 g',
        price: '1585.00',
        image: Product2, // Replace with actual image URL
      },
      {
          id: 8,
          name: 'Spice Supreme Curry Powder 85 g',
          price: '1585.00',
          image: Product3, 
        },
        {
          id: 9,
          name: 'Spice Supreme Curry Powder 85 g',
          price: '1585.00',
          image: Product4, // Replace with actual image URL
        },
        {
          id: 10,
          name: 'Spice Supreme Curry Powder 85 g',
          price: '1585.00',
          image: Product5, // Replace with actual image URL
        },
        {
            id: 11,
            name: 'Spice Supreme Curry Powder 85 g',
            price: '1585.00',
            image: Product1, 
          },
          {
            id: 12,
            name: 'Spice Supreme Curry Powder 85 g',
            price: '1585.00',
            image: Product2, // Replace with actual image URL
          },
          {
              id: 13,
              name: 'Spice Supreme Curry Powder 85 g',
              price: '1585.00',
              image: Product3, 
            },
            {
              id: 14,
              name: 'Spice Supreme Curry Powder 85 g',
              price: '1585.00',
              image: Product4, // Replace with actual image URL
            },
            {
              id: 15,
              name: 'Spice Supreme Curry Powder 85 g',
              price: '1585.00',
              image: Product4, // Replace with actual image URL
            },
            {
              id: 16,
              name: 'Spice Supreme Curry Powder 85 g',
              price: '1585.00',
              image: Product1, 
            },
            {
              id: 17,
              name: 'Spice Supreme Curry Powder 85 g',
              price: '1585.00',
              image: Product2, // Replace with actual image URL
            },
            {
                id: 18,
                name: 'Spice Supreme Curry Powder 85 g',
                price: '1585.00',
                image: Product3, 
              },
              {
                id: 19,
                name: 'Spice Supreme Curry Powder 85 g',
                price: '1585.00',
                image: Product4, // Replace with actual image URL
              },
              {
                id: 20,
                name: 'Spice Supreme Curry Powder 85 g',
                price: '1585.00',
                image: Product5, // Replace with actual image URL
              },
  ];

  export const countries = [
    { code: 'US', name: 'United States', number:'+24',flag: 'https://flagcdn.com/w320/us.png', currency :'$'},
    { code: 'CA', name: 'Canada', number:'+382', flag: 'https://flagcdn.com/w320/ca.png', currency :'ƒ' },
    { code: 'GB', name: 'United Kingdom', number:'+1', flag: 'https://flagcdn.com/w320/gb.png', currency :'$' },
    // Add more countries as needed
  ];