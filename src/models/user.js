import pkg from "sequelize";
import sequelize from "../loaders/sequelize/index.js";
const { DataTypes } = pkg;
const User = sequelize.define(
  "auth_api_clients",
  {
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(240),
      allowNull: true,
    },
    passOtp: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    passScore: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userAgent: {
      type: DataTypes.STRING(240),
      allowNull: true,
    },
    cedula: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    celular: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    segmento: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    resetCode: {
      type: DataTypes.STRING(240),
      allowNull: true,
    },
    ip: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
  }
);

export default User;
