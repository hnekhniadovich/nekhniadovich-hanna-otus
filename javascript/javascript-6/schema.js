const graphql = require("graphql");
const products = require('./db').products;
const categories = require('./db').categories;
const users = require('./db').users;
const orders = require('./db').orders;

const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
} = graphql;


const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    desc: { type: GraphQLString },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    discount: { type: GraphQLFloat }
  })
});

const CategoryType = new GraphQLObjectType({
    name: "Category",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        desc: { type: GraphQLString },
        products: { type: new GraphQLList(ProductType) }
    })
});

const OrderType = new GraphQLObjectType({
    name: "Order",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
        total: { type: new GraphQLNonNull(GraphQLFloat) },
        products: { type: new GraphQLList(ProductType) }
    })
});

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        telephone: { type: GraphQLString }
    })
});

const inputProductType = new GraphQLInputObjectType({
    name: 'ProductInput',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        desc: { type: GraphQLString },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        discount: { type: GraphQLFloat }
    }
});

const inputUserType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        telephone: { type: GraphQLString }
    })
});


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return products;
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return products.find(product => product.id == args.id);
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve(parent, args) {
                return categories;
            }
        },
        getProductsByCategory: {
            type: new GraphQLList(ProductType),
            args: { catId: { type: GraphQLID } },
            resolve(parent, args) {
                return categories.find(category => category.id == args.catId).products;
            }
        },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parent, args) {
                return orders;
            }
        },
        order: {
            type: OrderType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return orders.find(order => order.id == args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return users;
            }
        },
        getOrdersByUser: {
            type: new GraphQLList(OrderType),
            args: { userId: { type: GraphQLID } },
            resolve(parent, args) {
                return orders.filter(order => order.userId === args.userId)
            }
        }
    }
});

const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    fields: {
        addProduct: {
            type: ProductType,
            args: {
                input: { type: inputProductType }
            },
            resolve: function (source, args) {
                let product = {
                    id: args.input.id, 
                    name: args.input.name, 
                    desc: args.input.desc, 
                    price: args.input.price,
                    discount: args.input.discount
                };
                    
                products.push(product);

                return products.find(product => product.id === args.input.id);
            }
        },
        addUser: {
            type: UserType,
            args: {
                input: { type: inputUserType }
            },
            resolve: function (source, args) {
                let user = {
                    id: args.input.id, 
                    firstName: args.input.firstName, 
                    lastName: args.input.lastName, 
                    username: args.input.username, 
                    password: args.input.password, 
                    telephone: args.input.telephone
                };
                    
                users.push(user);

                return users.find(user => user.id === args.input.id);
            }
        },
        deleteProduct: {
            type: new GraphQLList(ProductType),
            args: { id: { type: GraphQLID }},
            resolve: function (source, args) {
                let updatedProducts = products.filter(product => product.id != args.id);
                return updatedProducts;
            } 
        }
    }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

