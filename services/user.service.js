const {UserDTO} = require("../dto/user.dto");
const db = require("../models");
const argon2 = require("argon2");


const userService = {
  getAll: async (offset, limit) => {
    const { rows, count } = await db.User.findAndCountAll({
      distinct: true,
      offset,
      limit,
    });

    return {
      users: rows.map((user) => new UserDTO(user)),
      count,
    };
  },
  getById: async (id) => {
    const user = await db.User.findByPk(id);
    return user ? new UserDTO(user) : null;
  },

  update: async (id, userToUpdate) => {
    const user = await db.User.update(userToUpdate, {
      where: { id },
    });
    return user[0] === 1;
  },

  updateAvatar: async (userId, filename) => {
    const data = {
      avatar : `public/images/avatars/${filename}`
    }
    console.log('les datas' , data);

    const updatedRow = await db.User.update( data , {
      where : { id: userId }
  })
    return updatedRow[0] === 1;
  },

  delete: async (id) => {
    const user = await db.User.destroy({
      where: { id },
    });
    return user[0] === 1;
  },
};

module.exports = userService;
