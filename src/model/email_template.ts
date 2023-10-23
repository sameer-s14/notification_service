import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelizeConnection } from '../config/database';
import {IEmailTemplates } from '../interfaces';
export type emailTemplateInput = Partial<IEmailTemplates>;

class Email_Template extends Model<IEmailTemplates, emailTemplateInput> implements IEmailTemplates {
  public id!: number;
  public content!: string;
  public type!: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Email_Template.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    tableName: 'email_templates',
    underscored:true
  }
);
export { Email_Template };
