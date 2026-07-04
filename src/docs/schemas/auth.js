const authDocs = {
    tags: [
        {
            name: 'Auth',
            description: 'Authentication: register, login and logout'
        }
    ],

    paths: {
        '/api/auth/register': {
            post: {
                tags: ['Auth'],
                summary: 'Register a new user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/UserCreate' }
                        }
                    }
                },
                responses: {
                    '201': { description: 'User created', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } },
                    '400': { description: 'Invalid data' }
                }
            }
        },

        '/api/auth/registerAdmin': {
            post: {
                tags: ['Auth'],
                summary: 'Register a new admin (requires authentication and ADMIN role)',
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/UserCreate' }
                        }
                    }
                },
                responses: {
                    '201': { description: 'Admin created', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } },
                    '403': { description: 'Forbidden' }
                }
            }
        },

        '/api/auth/login': {
            post: {
                tags: ['Auth'],
                summary: 'User login',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Login' }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Authenticated (sets `access_token` cookie)',
                        headers: {
                            'Set-Cookie': { description: 'Session cookie `access_token`', schema: { type: 'string' } }
                        },
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } }
                    },
                    '401': { description: 'Invalid credentials' }
                }
            }
        },

        '/api/auth/logout': {
            post: {
                tags: ['Auth'],
                summary: 'Logout (clears the cookie)',
                security: [{ cookieAuth: [] }],
                responses: {
                    '200': { description: 'Logged out' }
                }
            }
        }
    },

    components: {
        schemas: {
            UserCreate: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string' }
                },
                required: ['email', 'password']
            },

            Login: {
                type: 'object',
                properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string' }
                },
                required: ['email', 'password']
            },

            User: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    role: { type: 'string' }
                }
            },

            AuthResponse: {
                type: 'object',
                properties: {
                    user: { $ref: '#/components/schemas/User' },
                    message: { type: 'string' }
                }
            }
        }
    }
};

export default authDocs;
