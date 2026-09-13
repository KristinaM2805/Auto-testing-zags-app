export const adminSchema = {
  type: 'object',
  properties: {
    dateofbirth: { type: 'string' },
    personalFirstName: { type: 'string' },
    personalLastName: { type: 'string' },
    personalMiddleName: { type: 'string' },
    personalNumberOfPassport: { type: 'string' },
    personalPhoneNumber: { type: 'string' }
  },
  required: [
    'dateofbirth',
    'personalFirstName',
    'personalLastName',
    'personalMiddleName',
    'personalNumberOfPassport',
    'personalPhoneNumber'
  ]
};
