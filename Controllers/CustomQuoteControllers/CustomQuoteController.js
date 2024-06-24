require("../../Database/dbConfig");
const CustomQuoteModal = require("../../Models/CustomQuoteModals/CustomQuoteModal");

const createCustomQuote = async (user) => {
  console.log(user);
  const result = await CustomQuoteModal.create(user);
  return result;
};
const isCustomQuoteLoggedin = async (user) => {
  console.log(user);
  const customQuote = await CustomQuoteModal.findOne(user);
  return customQuote;
};
const viewAllCustomQuote = async () => {
  const result = await CustomQuoteModal.find();
  return await result;
};


module.exports = {
  createCustomQuote,
  isCustomQuoteLoggedin,
  viewAllCustomQuote,

};
