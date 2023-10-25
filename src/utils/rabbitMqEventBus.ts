import amqp from "amqplib";
import {} from "./index";
import { ChannelWithConnection } from "../interfaces/rabbit.interface";
// import { userFactoryInstance } from "../services/user/user.factory";
import { RABBIT_MQ_URL } from "../config";
import { actions } from "../actions";
import { userFactoryInstance } from "../services";

class RabbitMqService {
  private connection: any = null;
  private channel: any = null;
  private options: any = {
    noAck: true,
  };
  private actions: any = actions;
  connect = async (): Promise<any> => {
    try {
      if (!this.connection) {
        // Create a new connection For RabbitMq server
        this.connection = await amqp.connect(RABBIT_MQ_URL!);
        this.channel = await this.connection.createConfirmChannel();

        this.connection.on("error", (err: any) => {
          this.connection = null;
          console.log(
            "****************** RABBIT_MQ CONNECTION ERROR ******************************"
          );
        });
        this.connection.on("blocked", () => {
          this.connection = null;
          console.log(
            "****************** RABBIT_MQ CONNECTION blocked ******************************"
          );
        });
        this.connection.on("close", () => {
          this.connection = null;
          console.log(
            "****************** RABBIT_MQ CONNECTION closed ******************************"
          );
        });
      }
      let obj: any = {
        connection: this.connection,
        channel: this.channel,
      };
      return obj;
    } catch (error) {
      this.connection = null;
      if (error instanceof Error) throw error?.message;
      console.log("RabbitMQ Error");
    }
  };

  private createChannel = async (
    prefetch: number = 10
  ): Promise<ChannelWithConnection> => {
    try {
      const { connection, channel }: any = await this.connect();
      channel.prefetch(prefetch);
      return { connection, channel };
    } catch (ex: any) {
      console.error(ex.message);
      throw ex;
    }
  };

  public onMessageHandler = (messageData: amqp.ConsumeMessage | null) => {
    let returnData = false;
    if (!messageData) {
      throw new Error("Message failed to receive");
    }
    const data = JSON.parse(messageData?.content.toString());
    // console.log("Message received :", data.metadata);
    // console.log("data",data)
    // console.log(">>>",this.actions)
    // handling user actions
    if (this.actions.userActions[data?.action]) {
      userFactoryInstance.initiate(data);
    }
  };
  public async consumeMessage(queue: string) {
    try {
      const { channel } = await this.createChannel();
      await channel.assertQueue(queue, { durable: true });

      await channel.consume(queue, this.onMessageHandler, this.options);
    } catch (error: unknown) {
      console.log("RabbitMQ Error in RabbitMqService consumeMessage",error);
      if (error instanceof Error) throw error.message;
    }
  }
}

export const rabbitMqServiceInstance = new RabbitMqService();
