const { user, sale } = require("../../models");
const bcrypt = require('bcrypt');

const login = async (credentials) => {
    
    try {

        const result = await user.findOne({
            attributes: ["id","username", "password", "firstname", "surname", "type"],
            where: {
                username: credentials.username,
            },
        });


        if (result && result.dataValues) {
            const res = await bcrypt.compare(
                credentials.password,
                result.dataValues.password
            );

            if (res) {
                result.dataValues.name =
                result.dataValues.firstname + " " + result.dataValues.surname;
                return {
                    error: false,
                    data: result.dataValues
                };
            } else {
                return {
                    error: true,
                    message: "The username and / or password is incorrect!"
                };
            }

        } else {
            return {
                error: true,
                message: "The username and / or password is incorrect!"
            };
        }
    } catch (error) {
        return {
            error: true,
            message: "Something went wrong! Please try again."
        };
    }
};

module.exports = {
    login,
};
