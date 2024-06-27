const bcrypt = require("bcryptjs");
const AccountModel = require("../../model/AccountModel");
const { errorReponse } = require("../../core/reponseHandle");
const { Op } = require("sequelize");
const authService = require('../account/auth.service');

class AccountService {
  async loginAccount({ username, password }) {
    if (username === "" || password === "") throw new errorReponse({
      message: "Missing username or password",
      code: 400,
    });

    const account = await AccountModel.findOne({
      where: {
        [Op.or]: [
          {
            email: username,
          },
          {
            phone: username,
          },
        ],
      },
    });
    if (!account) throw new errorReponse({
      message: "Invalid password or username",
      code: 401
    });

    const passwordIsValid = bcrypt.compareSync(password, account.password);
    if (!passwordIsValid) throw new errorReponse({
      message: "Invalid password or username",
      code: 401,
    });

    const token = await authService.generateAccessToken(account);
    const refreshToken = await authService.generateRefreshToken(account);

    if (!token) throw new errorReponse({
      code: 500,
      message: 'Login failed'
    })

    return {
      token: token,
      refreshToken: refreshToken,
    };
  }

  async registerAccount({
    email,
    phone,
    password,
    firstname,
    lastname,
    address,
  }) {
    if (
      email === ""
      || phone === ""
      || password === ""
      || firstname === ""
      || lastname === ""
      || address === ""
    ) throw new errorReponse({
      message: "Missing field",
      code: 400,
    });

    // Check email or phone exists
    const checkInvalid = await AccountModel.findOne({
      where: {
        [Op.or]: [
          {
            email: email,
          },
          {
            phone: phone,
          },
        ],
      },
    });

    if (checkInvalid) throw new errorReponse({
      message: "Email or phone already exists",
      code: 400,
    });

    const account = await AccountModel.create({
      email: email,
      phone: phone,
      password: bcrypt.hashSync(password, 10),
      fisrtname: firstname,
      lastname: lastname,
      address: address,
    });

    if (!account) throw new errorReponse({
      message: "Create account failed",
      code: 500,
    });

    return account;
  }

}

module.exports = new AccountService();
