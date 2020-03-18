
const Joi = require('joi')
//register validation
const resgisterValidation = (data) => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, schema)
}
const loginValidation = (data) => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, schema)
}
const createOrderValidation = (data) => {
    const schema = {
        customer: Joi.string().required()
            .error((errors) => {
                return errors.map(error => {
                    switch (error.type) {
                        case "string.min":
                            return { message: "first msg" };
                        case "string.max":
                            return { message: "second msg" };
                        case "any.empty":
                            return { message: "Tên khách hàng không để trống" };
                    }
                })
            }),
        product: Joi.string().min(1).required()
            .error((errors) => {
                return errors.map(error => {
                    switch (error.type) {
                        case "number.min":
                            return { message: "first msg" };
                        case "string.max":
                            return { message: "second msg" };
                        case "any.empty":
                            return { message: "Vui lòng chọn sản phẩm" };
                    }
                })
            }),
        quantity: Joi.number().min(1).required()
            .error((errors) => {
                return errors.map(error => {
                    switch (error.type) {
                        case "number.min":
                            return { message: "Số lượng nhỏ nhất là 1" };
                        case "string.max":
                            return { message: "second msg" };
                        case "any.empty":
                            return { message: "Số lượng không để trống" };
                    }
                })
            }),
        price: Joi.number().min(1).required()
            .error((errors) => {
                return errors.map(error => {
                    switch (error.type) {
                        case "number.min":
                            return { message: "Vui lòng nhập giá sản phẩm" };
                        case "string.max":
                            return { message: "second msg" };
                        case "any.empty":
                            return { message: "Số lượng không để trống" };
                    }
                })
            }),
        cash: Joi.number().min(1).required()
            .error((errors) => {
                return errors.map(error => {
                    switch (error.type) {
                        case "number.min":
                            return { message: "Vui lòng nhập tổng tiền đơn hàng" };
                        case "string.max":
                            return { message: "second msg" };
                        case "any.empty":
                            return { message: "Số lượng không để trống" };
                    }
                })
            }),
        status: Joi.string().required()

    }
    return Joi.validate(data, schema)
}


const productValidation = (data) => {
    const schema = {
        title: Joi.string().required()
            .error((errors) => {
                return errors.map(error => {
                    switch (error.type) {
                        case "string.min":
                            return { message: "first msg" };
                        case "string.max":
                            return { message: "second msg" };
                        case "any.empty":
                            return { message: "Tên sản phẩm không để trống" };
                    }
                })
            }),
        description: Joi.string().min(1).required()
            .error((errors) => {
                return errors.map(error => {
                    switch (error.type) {
                        case "number.min":
                            return { message: "first msg" };
                        case "string.max":
                            return { message: "second msg" };
                        case "any.empty":
                            return { message: "Mô tả sản phẩm không để trống" };
                    }
                })
            }),
        price: Joi.number().min(1).required()
            .error((errors) => {
                return errors.map(error => {
                    switch (error.type) {
                        case "number.min":
                            return { message: "Vui lòng nhập giá sản phẩm" };
                        case "string.max":
                            return { message: "second msg" };
                        case "any.empty":
                            return { message: "Giá sản phẩm không để trống" };
                    }
                })
            }),
        productId: Joi.number().min(1).required()
            .error((errors) => {
                return errors.map(error => {
                    switch (error.type) {
                        case "number.min":
                            return { message: "Vui lòng nhập giá sản phẩm" };
                        case "string.max":
                            return { message: "second msg" };
                        case "any.empty":
                            return { message: "ProductId không để trống" };
                    }
                })
            }),
        status: Joi.number(),
    }
    return Joi.validate(data, schema)
}

module.exports.productValidation = productValidation;
module.exports.resgisterValidation = resgisterValidation;
module.exports.loginValidation = loginValidation;
module.exports.createOrderValidation = createOrderValidation;