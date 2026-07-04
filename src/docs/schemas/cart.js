const cartDocs = {
    tags: [{ name: 'Cart', description: 'Cart operations' }],

    paths: {
        '/api/cart': {
            post: {
                tags: ['Cart'],
                summary: 'Add item to cart',
                security: [{ cookieAuth: [] }],
                requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CartItem' } } } },
                responses: { '201': { description: 'Item added' } }
            },
            get: {
                tags: ['Cart'],
                summary: 'Get cart info',
                security: [{ cookieAuth: [] }],
                responses: { '200': { description: 'Cart details', content: { 'application/json': { schema: { $ref: '#/components/schemas/Cart' } } } } }
            }
        },

        '/api/cart/checkout': {
            post: {
                tags: ['Cart'],
                summary: 'Checkout',
                security: [{ cookieAuth: [] }],
                responses: { '200': { description: 'Checkout processed' } }
            }
        }
    },

    components: {
        schemas: {
            CartItem: { type: 'object', properties: { productId: { type: 'string' }, quantity: { type: 'integer' } }, required: ['productId', 'quantity'] },
            Cart: { type: 'object', properties: { items: { type: 'array', items: { $ref: '#/components/schemas/CartItem' } }, total: { type: 'number' } } }
        }
    }
};

export default cartDocs;
