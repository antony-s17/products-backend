const wishlistDocs = {
    tags: [
        {
            name: 'Wishlist',
            description: 'Wishlist'
        }
    ],

    paths: {
        '/api/wishlist': {
            post: {
                tags: ['Wishlist'],
                summary: 'Add product to wishlist',
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    productId: {
                                        type: 'string'
                                    }
                                },
                                required: ['productId']
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Added to wishlist'
                    }
                }
            },

            get: {
                tags: ['Wishlist'],
                summary: 'Get user wishlist',
                security: [{ cookieAuth: [] }],
                responses: {
                    '200': {
                        description: 'Wishlist',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/WishlistItem'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },

        '/api/wishlist/{productId}': {
            delete: {
                tags: ['Wishlist'],
                summary: 'Remove product from wishlist',
                security: [{ cookieAuth: [] }],
                parameters: [
                    {
                        name: 'productId',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Removed'
                    }
                }
            }
        }
    },

    components: {
        schemas: {
            WishlistItem: {
                type: 'object',
                properties: {
                    productId: {
                        type: 'string'
                    },
                    addedAt: {
                        type: 'string',
                        format: 'date-time'
                    }
                }
            }
        }
    }
};

export default wishlistDocs;