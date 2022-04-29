const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/db');
const { check, validationResult } = require('express-validator');
let config = require('config')
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let Product = require('./models/Product');
let Customer = require('./models/Customer');
const auth = require('./middleware/auth');
const Order = require('./models/Order');

const app = express();

//connect to mongodb
connectDatabase();

//middleware
app.use(express.json({ extended: false }));
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);

/**
 * @route GET api/products
 * @desc Get all products
 */
app.get('/api/products', (req, res) => {
    Product.find().sort({ createdAt: -1 })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
});

/**
* @route POST api/customers
* @desc Register customer
*/
app.post(
    '/api/customers',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            const {firstName, lastName, email, password } = req.body;
            try {
                // check if customer exists
                let customer = await Customer.findOne({ email: email });
                if (customer) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'Customer already exists' }] });
                }

                // create a new customer
                customer = new Customer({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    orders: []
                });

                // encrypt the password
                const salt = await bcrypt.genSalt(10);
                customer.password = await bcrypt.hash(password, salt);

                // save to the db and return
                await customer.save();

                // generate and return a JWT token
                returnToken(customer, res);

                console.log("new customer added");
            } catch (error) {
                res.status(500).send('Server error');
            }
        }
    }
);

/**
 * @route GET api/customer/:id
 * @desc Get customer by id
 */
app.get('/api/customers/:id', auth, async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found' });
        }

        res.json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});



const returnToken = (customer, res) => {
    const payload = {
        customer: {
            id: customer.id
        }
    };

    jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '10hr' },
        (err, token) => {
            if (err) throw err;
            res.json({ token: token, customer: customer });
        }
    );
};


/**
 * @route GET api/customers
 * @desc Get customers
 * 
 * NOTE I use this for testing and it has no authorization, I realize in production you wouldn't want it exposed 
 */
app.get('/api/customers', async (req, res) => {
    try {
        const customers = await Customer.find().sort({ date: -1 });

        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});



/** 
* @route POST api/login
* @desc Login customer
*/
app.post(
    '/api/login',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'A password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            const { email, password } = req.body;
            try {
                // Check if customer exists
                let customer = await Customer.findOne({ email: email });

                if (!customer) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'Invalid email or password' }] });
                }

                // Check password
                const match = await bcrypt.compare(password, customer.password);


                if (!match) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'Invalid email or password' }] });
                }

                // Generate and return a JWT token
                returnToken(customer, res);
            } catch (error) {
                res.status(500).send('Server error');
            }
        }
    }
);

/**
* @route GET api/auth
* @desc Authorize customer
*/
app.get('/api/auth', auth, async (req, res) => {
    try {
        const customer = await Customer.findById(req.customer.id);
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).send('Unknown server error');
    }
});

/**
* @route POST api/orders
* @desc create order
*/
app.post('/api/orders', auth, async (req, res) => {
    try {
        const { id, cart } = req.body;

        const newOrder = new Order({
            customer: id,
            order: cart
        });

        await newOrder.save();
        
        //new order created, associate it with customer 
        const customer = await Customer.findById(id);

        customer.orders.push(newOrder);
        await customer.save();

        res.send('success');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});


/**
* @route GET api/customers/:id/orders
* @desc get orders by customer id
*/
app.get('/api/customers/:id/orders', auth, async (req, res) => {

    try {
        const id = req.params.id;
        //filter order schema based on customer id
        
        const customer = await Customer.findById(id);
        const orderArray = customer.orders;

        let result = [];

        for (let i = 0; i < orderArray.length; i++) {
            const orderObj = await Order.findById(orderArray[i]);
            result.push(orderObj);
        }

        
        res.status(200).json(result);

    //console.log('found orders', customerOrders);

    } catch (error) {
        res.status(500).send('Unknown server error');
    }
});



const port = 5000;
app.listen(port, () => console.log(`Express running on port ${port}`));