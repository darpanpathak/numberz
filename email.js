const aws = require('aws-sdk');
const nodemailer = require('nodemailer');
const util = require('./util');

const ses = new aws.SES();
const s3 = new aws.S3();

const BUCKET = "invoice-numberz";

function getS3File(bucket, key) {
    return new Promise(function(resolve, reject) {
        s3.getObject({
                Bucket: bucket,
                Key: key
            },
            function(err, data) {
                if (err) return reject(err);
                else return resolve(data);
            }
        );
    })
}

exports.emailHandler = async function(event) {

    try {

        const body = util.isObject(event.body) ? event.body : JSON.parse(event.body);

        const fileData = await getS3File(BUCKET, 'invoice-sample.pdf');
        const now = new Date().getTime();
        const mailOptions = {
            from: 'darpan@inkloft.in',
            subject: 'This is an email sent from a Lambda function!',
            html: `<p> Dear Sir/Madam, </p>
                <p> Hope you are doing well. </p>
                <p> You have an upcoming invoice due at <b>${new Date(body.duedate).toDateString()}</b>. Please find the attachment. </p>
                <div>
                    ${JSON.stringify(body)}
                </div>
            `,
            to: body.invoiceto.email,
            // bcc: Any BCC address you want here in an array,
            attachments: [{
                filename: `invoice_sample_${now}.pdf`,
                content: fileData.Body
            }]
        };

        const transporter = nodemailer.createTransport({
            SES: ses
        });

        const mail = await transporter.sendMail(mailOptions);
        console.log("mail sent");

        return constructResponse(200, {});

    } catch (error) {
        console.log(error);
        return constructResponse(500, error);
    }

}

function constructResponse(statusCode, message) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(message)
    }
}