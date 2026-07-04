const productDocs = {
    tags: [
        { name: 'Product', description: 'Product operations' }
    ],

    paths: {
        '/api/product': {
            post: {
                tags: ['Product'],
                summary: 'Create product (ADMIN)',
                security: [{ cookieAuth: [] }],
                requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductCreate' } } } },
                responses: { '201': { description: 'Producto creado' }, '403': { description: 'Forbidden' } }
            },
            get: { tags: ['Product'], summary: 'Get all products', responses: { '200': { description: 'List of products', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Product' } } } } } } }
        },

        '/api/product/{id}': {
            get: {
                tags: ['Product'],
                summary: 'Get product by id',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { '200': { description: 'Product', content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } }, '404': { description: 'Not found' } }
            },
            put: {
                tags: ['Product'],
                summary: 'Update product (ADMIN)',
                security: [{ cookieAuth: [] }],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductCreate' } } } },
                responses: { '200': { description: 'Product updated' }, '403': { description: 'Forbidden' }, '404': { description: 'Not found' } }
            },
            delete: { tags: ['Product'], summary: 'Delete product (ADMIN)', security: [{ cookieAuth: [] }], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Product deleted' }, '403': { description: 'Forbidden' } } }
        }
    },

    components: {
        schemas: {
            Product: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'number' }
                }
            },
            ProductCreate: {
                type: 'object',
                properties: { title: { type: 'string' }, description: { type: 'string' }, price: { type: 'number' } },
                required: ['title', 'price']
            }
        }
    }
};

export default productDocs;
