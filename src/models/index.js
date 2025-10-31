import User from "./User.js";
import Todo from "./Todo.js";

User.hasMany(Todo, { foreignKey: "userId", as: "todos" });
Todo.belongsTo(User, { foreignKey: "userId", as: "user" });

export { User, Todo };
