
const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'crystel69@ethereal.email',
        pass: 'AhUwTYb7xx9sHTaS49'
    }
});


const send =  (info)=>{
    return new Promise (async(resolve, reject)=>{
     try {
        let result = await transporter.sendMail(info);
        console.log("успух")
        resolve(result)
    } catch (error) {
        console.log(error)
    }
})
}


const emailProcesser =  (email, pin)=>{
    let info = {
        from: '"Fred Foo 👻" <crystel69@ethereal.email>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      };
      send(info)
}


module.exports = {
    emailProcesser
}