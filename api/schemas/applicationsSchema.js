export const applicationsSchema = {
  type: 'object',
  properties: {
    total: { type: 'string' },
    data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          applicationid: { type: 'integer' },
          citizenid: { type: 'integer' },
          applicantid: { type: 'integer' },
          staffid: { type: ['integer', 'null'] },
          dateofapplication: { type: 'string' },
          kindofapplication: { type: 'string' },
          statusofapplication: { type: 'string' },
          channel: { type: 'string' },
          image: { type: ['string', 'null'] }
        },
        required: [
          'applicationid',
          'citizenid',
          'applicantid',
          'staffid',
          'dateofapplication',
          'kindofapplication',
          'statusofapplication',
          'channel',
          'image'
        ]
      }
    }
  },
  required: ['total', 'data']
};
