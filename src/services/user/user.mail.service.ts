import { RabbitContent } from "./../../interfaces";
import {Email_Template} from "../../model"
class UserMailerService {
  async userRegister(data: RabbitContent) {
    console.log("🚀 ~ file: user.mail.service.ts:6 ~ UserMailerService ~ userRegister ~ data:", data)
  }
}

export const userMailerService = new UserMailerService();
