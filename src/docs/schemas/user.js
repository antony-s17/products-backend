const userDocs = {
    tags: [{ name: 'User', description: 'User operations' }],

    paths: {
        '/api/user/profile': {
            get: {
                tags: ['User'],
                summary: 'Get authenticated user profile',
                security: [{ cookieAuth: [] }],
                responses: { '200': { description: 'User profile', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } }, '401': { description: 'Unauthorized' } }
            }
        }
    },

    components: {
        schemas: {
            User: {
                type: 'object',
                properties: { id: { type: 'string' }, name: { type: 'string' }, email: { type: 'string', format: 'email' }, role: { type: 'string' } }
            }
        }
    }
};

export default userDocs;
