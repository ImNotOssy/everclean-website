// This uses the SendGrid library to make sending emails easy.
const sgMail = require('@sendgrid/mail');

// This is the main function that Netlify will run when it receives a request.
exports.handler = async function(event, context) {
  // 1. Set the API Key
  // It's crucial to get this from an environment variable for security.
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // 2. Parse the form data from the request
  // The data comes in as a JSON string, so we need to parse it.
  const formData = JSON.parse(event.body);

  // 3. Create the email message
  const msg = {
    to: 'Oswaldoromero2005@gmail.com', // ** CHANGE THIS to the email you want to receive notifications
    from: 'Oswaldoromero2005@gmail.com', // ** CHANGE THIS to your verified SendGrid sender email
    subject: `New Cleaning Request from ${formData.name}`,
    // The email body is created using the form data.
    text: `You have a new cleaning request!\n\n
        Name: ${formData.name}\n
        Email: ${formData.email}\n
        Phone: ${formData.phone}\n
        Address: ${formData.address}\n
        Preferred Date: ${formData.cleaning_date}\n
        Additional Notes: ${formData.message}\n\n
        --- Quote Details ---\n
        ${formData.quote_summary}`,
  };

  // 4. Send the email and handle the response
  try {
    await sgMail.send(msg);
    // If the email sends successfully, return a success message.
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form submitted successfully!" }),
    };
  } catch (error) {
    // If there's an error, log it and return an error message.
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error sending email." }),
    };
  }
};
