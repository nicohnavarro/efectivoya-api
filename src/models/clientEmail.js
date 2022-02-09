import pkg from "sequelize";
import sequelize from "../loaders/sequelize/index.js";
const { DataTypes } = pkg;
const ClientEmail = sequelize.define(
  "clientEmails",
  {
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(240),
      allowNull: false,
    },
    enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userAgent: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    expiredTime: {
      type: DataTypes.DATE,
      allowNull:true,
      },
      cedula: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
  },
    {
      timestamps:true,
    indexes: [
      {
        unique: true,
        fields: ["token"],
          },
    ],
  }
);

export default ClientEmail;
