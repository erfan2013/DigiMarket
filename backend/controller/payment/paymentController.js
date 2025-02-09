const stripe = require('../../config/stripe')
const userModel = require('../../models/userModel')


const paymentController = async (request,response) => {
    try{
        const { cartItems } = request.body
        console.log("cartItems",cartItems)
        const user = await userModel.findOne({  _id: request.userId })
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1QohCfG2Z1S5lPNi9XBmyw6t'
                }
            ],
            customer_email: user.email,
            line_items: cartItems.map((item, index) => {
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.productId.ProductName,
                            images: item.productId.ProductImage,
                            metadata: {
                                ProductImage: item.productId._id,
                            }
                        },
                        unit_amount: item.productId.Selling * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `${process.env.FRONT_END_URL}/success`,
            cancel_url: `${process.env.FRONT_END_URL}/cancel`,
        }
        const session = await stripe.checkout.sessions.create(params)
        response.status(303).json(session)

    } catch(err) {        
        response.json({
            message: err?.message || err,
            success : false,
            error : true
        })
    }
}

module.exports = paymentController