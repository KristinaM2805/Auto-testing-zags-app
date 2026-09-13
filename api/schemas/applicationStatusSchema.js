export const applicationStatusSchema = {
  type: 'object',

  properties: {
    data: {
      type: 'object',

      properties: {
        dateofapplication: {
          type: 'string'
        },

        kindofapplication: {
          type: 'string'
        },

        statusofapplication: {
          type: 'string'
        }
      },

      required: [
        'dateofapplication',
        'kindofapplication',
        'statusofapplication'
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