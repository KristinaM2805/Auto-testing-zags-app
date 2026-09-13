export const requestProcessSchema = {
  type: 'object',
  properties: {
    applId: { type: 'integer' },
    staffid: { type: 'integer' },
    action: { type: 'string',
      enum: ['approved', 'rejected']
    }
  },
  required: ['applId', 'staffid', 'action']
};
