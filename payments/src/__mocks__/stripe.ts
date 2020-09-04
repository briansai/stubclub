export const stripe = {
  charges: {
    // return a promise immediately that will automatically resolve itself
    create: jest.fn().mockResolvedValue({})
  }
};
