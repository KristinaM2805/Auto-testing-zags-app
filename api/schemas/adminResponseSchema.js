export const adminResponseSchema = {
  type: 'object',

  properties: {
    data: {
      type: 'object',

      properties: {
        staffid: {
          type: 'integer'
        }
      },

      required: [
        'staffid'
      ]
    },

    requestId: {
      type: 'string'
    }
  },

  required: [
    'data',
    'requestId'
  ]
};