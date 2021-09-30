const products = [
    {
        id: 1,
        name: 'Sweatpants',
        desc: 'Straight leg sweatpants with deep waistband and pintuck in organic cotton in cream',
        price: 29.00,
        discount: 0.25
    },
    {
        id: 2,
        name: 'Dress',
        desc: 'Neon Rose midi smock dress with puff sleeves and vintage embroidered collar in ditsy floral',
        price: 56.00,
        discount: 0.25
    },
    {
        id: 3,
        name: 'Boots',
        desc: 'Ego Studio chunky snow boots in black fluff',
        price: 72.00,
        discount: 0.25
    },
    {
        id: 4,
        name: 'Sneakers',
        desc: 'Reebok Classic Club C Vintage Sneakers In Chalk With Green',
        price: 75.00,
        discount: 0.25
    },
    {
        id: 5,
        name: 'Belt',
        desc: 'Vintage tan jeans belt',
        price: 11.50,
        discount: 0.25
    },
    {
        id: 6,
        name: 'Hair scarf',
        desc: 'Pieces hair scarf in blue floral',
        price: 19.00,
        discount: 0.25
    }
]

const categories = [
    {
        id: 1,
        name: 'Clothing',
        desc: 'Shop the trending clothes',
        products: [
            {
                id: 1,
                name: 'Sweatpants',
                desc: 'Straight leg sweatpants with deep waistband and pintuck in organic cotton in cream',
                price: 29.00,
                discount: 0.25
            },
            {
                id: 2,
                name: 'Dress',
                desc: 'Neon Rose midi smock dress with puff sleeves and vintage embroidered collar in ditsy floral',
                price: 56.00,
                discount: 0.25
            }
        ]
    },
    {
        id: 2,
        name: 'Shoes',
        desc: 'Goint out-out',
        products: [
            {
                id: 3,
                name: 'Boots',
                desc: 'Ego Studio chunky snow boots in black fluff',
                price: 72.00,
                discount: 0.25
            },
            {
                id: 4,
                name: 'Sneakers',
                desc: 'Reebok Classic Club C Vintage Sneakers In Chalk With Green',
                price: 75.00,
                discount: 0.25
            }
        ]
    },
    {
        id: 3,
        name: 'Accessories',
        desc: 'New vintage and antique vibes',
        products: [
            {
                id: 5,
                name: 'Belt',
                desc: 'Vintage tan jeans belt',
                price: 11.50,
                discount: 0.25
            },
            {
                id: 6,
                name: 'Hair scarf',
                desc: 'Pieces hair scarf in blue floral',
                price: 19.00,
                discount: 0.25
            }
        ]
    }
]

const orders = [
    {
        id: 1,
        userId: '2',
        total: 96.00,
        products: [
            {
                id: 2,
                name: 'Dress',
                desc: 'Neon Rose midi smock dress with puff sleeves and vintage embroidered collar in ditsy floral',
                price: 56.00,
                discount: 0.25
            },
            {
                id: 3,
                name: 'Boots',
                desc: 'Ego Studio chunky snow boots in black fluff',
                price: 72.00,
                discount: 0.25
            }
        ]
    },
    {
        id: 2,
        userId: '3',
        total: 64.88,
        products: [
            {
                id: 4,
                name: 'Sneakers',
                desc: 'Reebok Classic Club C Vintage Sneakers In Chalk With Green',
                price: 75.00,
                discount: 0.25
            },
            {
                id: 5,
                name: 'Belt',
                desc: 'Vintage tan jeans belt',
                price: 11.50,
                discount: 0.25
            }
        ]
    },
    {
        id: 3,
        userId: '3',
        total: 128.00,
        products: [
            {
                id: 2,
                name: 'Dress',
                desc: 'Neon Rose midi smock dress with puff sleeves and vintage embroidered collar in ditsy floral',
                price: 56.00,
                discount: 0.25
            },
            {
                id: 3,
                name: 'Boots',
                desc: 'Ego Studio chunky snow boots in black fluff',
                price: 72.00,
                discount: 0.25
            },
        ]
    }
]

const users = [
    {
        id: 1,
        firstName: 'Larry',
        lastName: 'King',
        username: 'iamtheking',
        password: 'king123',
        telephone: '123456789'
    },
    {
        id: 2,
        firstName: 'Alicia',
        lastName: 'Keys',
        username: 'popstar',
        password: 'star123'
    },
    {
        id: 3,
        firstName: 'Michael',
        lastName: 'Jordan',
        username: 'catchtheball',
        password: 'ball123',
        telephone: '123456789'
    }
]

exports.products = products;
exports.categories = categories;
exports.orders = orders;
exports.users = users;
    
