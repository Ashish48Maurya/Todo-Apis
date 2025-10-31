import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Todo = sequelize.define("Todo", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
}, {
    tableName: "todos",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

export default Todo;