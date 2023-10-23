import { RabbitQueues } from "./interfaces/rabbit.interface";
import { rabbitMqServiceInstance } from "./utils";
import {connection  } from './config/database';
(async function () {
  try {
    await rabbitMqServiceInstance.consumeMessage(
      RabbitQueues.USER_NOTIFICATION
    );
    console.log("SERVER STARTED SUCCESSFULLY");
    connection()
  } catch (error) {
    console.log("SERVER FAILED TO CONNECT", error);
    process.exit(1);
  }
})();
