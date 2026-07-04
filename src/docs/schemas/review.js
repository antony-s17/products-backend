const reviewDocs = {
    tags: [{ name: 'Review', description: 'Product reviews' }],

    paths: {
        '/api/product/{productId}/reviews': {
            post: {
                tags: ['Review'],
                summary: 'Create a review for a product',
                security: [{ cookieAuth: [] }],
                parameters: [{ name: 'productId', in: 'path', required: true, schema: { type: 'string' } }],
                requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Review' } } } },
                responses: { '201': { description: 'Review created' } }
            },
            get: {
                tags: ['Review'],
                summary: 'Get reviews for a product',
                security: [{ cookieAuth: [] }],
                parameters: [{ name: 'productId', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { '200': { description: 'List of reviews', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Review' } } } } } }
            }
        }
    },

    components: {
        schemas: {
            Review: { type: 'object', properties: { rating: { type: 'integer', minimum: 1, maximum: 5 }, comment: { type: 'string' } }, required: ['rating'] }
        }
    }
};

export default reviewDocs;
