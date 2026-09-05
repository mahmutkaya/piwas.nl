export const products = {
  sofrapiwas: {
    name:'SofraPiwas', subtitle:'More hospitality. Less juggling.',
    description:'The restaurant platform that brings QR menus, live orders, reservations and loyalty together. Built for the people serving guests and the people making their food.',
    url:'https://sofrapiwas.com/en', privacyUrl:'https://sofrapiwas.com/en/legal',
    email:'mahmutkaya.nl@gmail.com',
    capabilities:['QR menus and table ordering','Live kitchen, cashier and server views','Online reservations and table planning','Customer loyalty and kitchen printing'],
    story:'A restaurant has enough moving parts. SofraPiwas connects the front of house and kitchen so an order can move from a guest’s phone to the people preparing it.',
    detail:'For restaurants, cafés and takeaways. Explore the product site for the current plans and a conversation about your restaurant.',
  },
  domainio: {
    name:'Domainio', subtitle:'A home for your next idea.',
    description:'Find, register and manage domain names without the unnecessary complexity. A practical home for your domains, with tools for people and APIs for developers.',
    url:'https://domainio.nl', privacyUrl:'https://domainio.nl/privacy',
    email:'domainio@piwas.nl',
    capabilities:['Domain search and registration','Domain transfers and renewals','DNS management','API access and a TypeScript SDK'],
    story:'Every project needs a place to begin. Domainio makes finding a name and managing the details around it a straightforward part of building something.',
    detail:'For makers, businesses and developers. Visit Domainio for live domain availability, current prices and supported extensions.',
  },
} as const;
export type ProductSlug = keyof typeof products;
export function getProduct(slug:string){return Object.hasOwn(products,slug)?products[slug as ProductSlug]:null;}
