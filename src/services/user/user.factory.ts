import { userMailerService } from './user.mail.service';
import { actions } from './../../actions';
import { RabbitActions, RabbitContent } from "../../interfaces";

class UserFactory {
    private userActions: any = actions.userActions;

    initiate(notificationData: RabbitContent) {
        if (notificationData.action === RabbitActions.USER_REGISTER) {
            const { channels } = this.userActions[notificationData.action];
            if(channels?.EMAIL){
                    userMailerService.userRegister(notificationData);
            }
        }
    }
}
export const userFactoryInstance = new UserFactory();