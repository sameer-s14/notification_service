import { RabbitContent } from "./../../interfaces";
import {Email_Template} from "../../model"
import { sendMail } from "../../utils/sendEmal";
class UserMailerService {
  async userRegister(data: RabbitContent) {
    console.log("🚀 ~ file: in user mail service", data.metadata)
    const emailTemplateData = await Email_Template.findOne({where:{type:"add_owner"}})
    const replacements:any = {
      '{{name}}': data.metadata.name,
      '{{otp}}': data.metadata.token,
    };
    const finalEmailContent = emailTemplateData?.content.replace(/{{name}}|{{otp}}/g, (match) => replacements[match]);
    await sendMail(data.metadata.email,String(finalEmailContent) )
  }
}

export const userMailerService = new UserMailerService();
