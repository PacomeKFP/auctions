const MAIL_TEMPLATE = ({adminName, auctionName, redirectionURL}) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Invitation à une vente aux enchères</title>
        <style>
          .container {
            width: 100%;
            height: 100%;
            padding: 20px;
            background-color: #f4f4f4;
            color: black;
          }
          .email {
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
          }
          .email-body {
            padding: 20px;
          }
          .bold{
            font-weight: bolder;
            font-size: 1.5em;
          }
          .btn{
            background-color: #4CAF50;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
          }
          .btn-outline-primary{
            color: #007bff;
            border: 1px solid #007bff;
            border-radius: .25rem;
            background-color: transparent;
            background-image: none;
            transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
          }
          .btn-outline-primary:hover{
            color: #fff;
            background-color: #007bff;
            border-color: #007bff;
          }
          
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email">
            
            <div class="email-body">
              <p>
                Salut 👋, Vous avez été invité par ${adminName},
                  à la vente <strong><span class="bold">${auctionName}</span></strong>. 

                <br>

                <a class="btn btn-outline-primary" href=${redirectionURL}>Cliquez ici pour y repondre</a>
              </p>
            </div>
            
          </div>
        </div>
      </body>
    </html>
  `;
};

module.exports = { MAIL_TEMPLATE };
