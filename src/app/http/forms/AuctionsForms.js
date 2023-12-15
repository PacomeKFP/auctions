const Joi = require("joi");

class AuctionForms {
  constructor() {}

  createAuction = Joi.object({ 
    name: Joi.string().trim().min(3).required(),
    description: Joi.string().trim().min(8).required(),
    admin: Joi.object({
      name: Joi.string().trim().min(3).required(),
      email: Joi.string().trim().email().required(),
    }).required(),
    anonymous: Joi.boolean(),
    currency: Joi.string().trim().min(2).required(),
    participants: Joi.array()
      .items(Joi.string().trim().email().required())
      .required(),

    lots: Joi.array().items(
      Joi.object({
        name: Joi.string().trim().min(3).required(),
        description: Joi.string().trim().min(8).required(),
        rank: Joi.number().integer().positive().required(),
        bounty: Joi.number().positive().not(0).required(),
        awardDeadline: Joi.number()
          .integer()
          .positive()
          .min(process.env.DEFAULT_AWARD_DEADLINE | 15)
          .required(),
      }).required()
    ),

    startDate: Joi.date(),
    invitationsClosureDate: Joi.date(),
  });
}

module.exports = { AuctionForms };
