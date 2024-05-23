const defautlOptions = (code, email) => {
    return {
        from: '"Email Xác Thực 👻" <abc@gmail.com>', // sender address
        to: "nguyenvuongw134@gmail.com", // list of receivers
        subject: "Xác Thực Email", // Subject line
        html: `<div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); width: 300px; text-align: center; "><h2 style="color: #333;">Yêu Cầu Xác Thực</h2><p style="color: #666;">Xin chào bạn chúng tôi nhận thấy bạn đang yêu cầu xác thực email trên hệ thống và đây là mã của bạn: </p><input value=${code} type="text" style="text-align: center; width: 100%; padding: 10px; margin-bottom: 20px;"></div><b>Trân trọng.</b>`,
        // html body
    }
}

module.exports = defautlOptions