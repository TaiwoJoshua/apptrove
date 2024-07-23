const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/mail', (req, res) => {
  let ElasticEmail = require('@elasticemail/elasticemail-client');
  const { To, Subject, Content } = req.body;
   
  let defaultClient = ElasticEmail.ApiClient.instance;
   
  let apikey = defaultClient.authentications['apikey'];
  apikey.apiKey = "986EFD8097D98CD21DC4914B443766AB9EB96130CDF0C6A4C540069221EDF836037BEEBBC54F0A9AF1B770250A318B34";
   
  let api = new ElasticEmail.EmailsApi()
   
  let email = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [
      new ElasticEmail.EmailRecipient(To)
    ],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: "HTML",
          Content
        })
      ],
      Subject,
      From: `"ReadersDelight" <taiwojoshua840@gmail.com>`
    }
  });
   
  var callback = function(error, data, response) {
    if (error) {
      console.error(error);
      return res.status(400).json("failed");
    } else {
      console.log('API called successfully.');
      return res.status(201).json("sent");
    }
  };
  
  api.emailsPost(email, callback);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});