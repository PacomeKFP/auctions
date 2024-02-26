require("dotenv").config()

const {
  GoogleMailService,
} = require("./src/infrastructure/Services/Mail/GmailSevice");

const uuidv4 = require("uuid").v4;



GoogleMailService.sendMail({
  auctionCode: uuidv4(),
  to: "pacomekfp@gmail.com",
  auctionName: "Test de vente aux encheres",
  userId: uuidv4(),
  adminName: "The KFP",
  adminEmail: "pacome.kengali@enspy-uy1.cm"
});

