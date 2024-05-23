const CustomerModel = require('../model/CustomerModel');
const { Op } = require('sequelize');
const brycpt = require('bcryptjs');

const salt = brycpt.genSaltSync(10);

async function create(Customer) {
    try {
        // hãy tìm kiếm chuẩn xác email hoặc số điện thoại đã tồn tại chưa
        const invalidCustomer = await CustomerModel.findOne({
            where: {
                [Op.or]: [{ email: Customer.email }, { phone: Customer.phone }]
            }
        });

        if (invalidCustomer) {
            return null;
        }
        Customer.password = brycpt.hashSync(Customer.password, salt);

        const customer = await CustomerModel.create(Customer);
        return customer;
    } catch (error) {
        console.log('Error', error);
        return null;
    }
}

async function login(usename, password) {
    try {
        //kiếm tra email hoặc số điện thoại có tồn tại không
        const customer = await CustomerModel.findOne({
            where: {
                [Op.or]: [{ email: usename }, { phone: usename }]
            }
        });
        if (!customer) {
            return null;
        }
        if (!await brycpt.compare(password, customer.password)) {
            return null;
        }
        return customer
    }
    catch (error) {
        console.log('Error', error);
    }
}

async function update(id, data) {
    try {
        const customer = await CustomerModel.findByPk(id);
        
        const invalidCustomer = await CustomerModel.findOne({
            // nếu trùng với customer hiện tại thì không cần kiểm tra
            where: {
                [Op.and]: [
                    { [Op.or]: [{ email: data.email }, { phone: data.phone }] },
                    { id: { [Op.ne]: id } }
                ]
            }
            
        });
        if (invalidCustomer) {
            return null;
        }
        if (!customer) {
            return null;
        }
        console.log('data', data.password);

        data.password = brycpt.hashSync(data.password, salt);

        const result = await customer.update(data);
        return result;
    }
    catch (error) {
        console.log('Error', error);
    }
}



module.exports = { create, login, update };
