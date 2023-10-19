// import { emailTransporterInstance } from '../../transporter';
import { RabbitContent } from "./../../interfaces";

class UserMailerService {
  async userRegister(data: RabbitContent) {
    console.log("🚀 ~ file: user.mail.service.ts:6 ~ UserMailerService ~ userRegister ~ data:", data)
    // const user = await userRepo.findUser({ id: data?.metadata?.id }, 'email fullName');
    // if (!user) {
    //     console.log("User not found")
    //     return;
    // }
    // if (process.env.NODE_ENV === 'production')
    //     await emailTransporterInstance.send(
    //         {
    //             email: user?.email,
    //             name: user?.fullName
    //         }, 1,
    //         {
    //             otp: data?.metadata?.otp,
    //             name: user?.fullName
    //         });
  }
}

export const userMailerService = new UserMailerService();
