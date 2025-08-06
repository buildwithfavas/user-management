const userSchema = require('../model/userModel');

const registerUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const userExists = await userSchema.findOne({ email });
        if (userExists) return res.render('user/register', { message: 'User already exists' });
        const newUser = new userSchema({ email, password });
        await newUser.save();
        res.render('user/login', { message: 'User created successfully' });
    } catch(error) {

    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });
        if (!user) return res.render('user/login', { message: "User doesn't exist found" });
        if (user.password !== password) return res.render('user/login', { message: 'Incorrect password' });
        res.render('user/home', { message: 'Login successful' });
    } catch (error) {
        console.error(error);
        //res.render('user/home', { message: 'Login failed' });
    }
}


const loadRegister = (req, res) => {
    res.render('user/register');
};

const loadLogin = (req, res) => {
    res.render('user/login');
};

module.exports = { registerUser, loadRegister, loadLogin };