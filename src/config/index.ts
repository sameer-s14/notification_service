import { config } from 'dotenv';
config();
export const { RABBIT_MQ_URL } = process.env;

export const emailConfiguration = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_LOGIN: process.env.SMTP_LOGIN,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_API_KEY: process.env.SMTP_API_KEY,
    headers: {
        'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
    }
}