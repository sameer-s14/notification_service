export interface ITransporter {
    connect(configuration: any): Promise<any>;
    send(metaData: DataTransporter): Promise<boolean>;
}

type attachment = {
    filename: string;
    path: string;
};

export class DataTransporter {
    public to?: string[];
    public subject?: string;
    public body?: string;
    public file?: Array<attachment> | null;
}

export interface IEmailConfiguration {
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_LOGIN: string;
    SMTP_PASSWORD: string;
    SMTP_API_KEY: string;
}