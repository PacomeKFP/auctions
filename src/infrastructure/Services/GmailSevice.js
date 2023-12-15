class GoogleMailService {
  constructor() {
    this.from = "server@gmail.com";
  }

  async sendMail(to, content) {
    console.log(`Mail Sent From ${this.from} to ${to}`);
  }
}

module.exports = { GoogleMailService };
