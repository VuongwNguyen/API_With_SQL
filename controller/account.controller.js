const AccountService = require("../services/account/account.service");
const { successfullyReponse } = require("../core/reponseHandle");

class AccountController {
    async loginAccount(req, res, next) {
        const {
            username,
            password
        } = req.body;
        const token = await AccountService.loginAccount({
            username,
            password
        });
        return new successfullyReponse({
            data: token,
            message: "Login successfully",
        }).json(res);
    }

    async registerAccount(req, res, next) {
        const {
            email,
            phone,
            password,
            firstname,
            lastname,
            address
        } = req.body;
        await AccountService.registerAccount({
            email,
            phone,
            password,
            firstname,
            lastname,
            address,
        });
        return new successfullyReponse({
            data: {},
            message: "Register successfully",
            status: 201,
        }).json(res);
    }
}
module.exports = new AccountController();
