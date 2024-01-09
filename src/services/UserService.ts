import User from '../models/User';
import bcrypt from 'bcrypt';
import { validateUserData, validateUserLoginData, validateUpdateUserData } from '../validation/userValidation';
import { UserData, UserDataLogin } from '../types/userTypes';
import generateToken from '../utils/tokenUtils';

const UserService = {
    createUser: async (userData: UserData) => {
        try {
            // Validate user data using Joi
            const validation = validateUserData(userData);

            if (!validation.valid) {
                return { data: validation.errors, statusCode: 400, msg: "Failure" };
            }
            // Check if the email already exists
            const existingUser = await User.findOne({
                where: {
                    email: userData.email,
                },
            });

            if (existingUser) {
                return { data: 'Email is already in use', statusCode: 404, msg: "Failure" };
            }
            // Check if the FirstName already exists
            const existingFirstName = await User.findOne({
                where: {
                    firstName: userData.firstName,
                },
            });

            if (existingFirstName) {
                return { data: 'First Name is already in use', statusCode: 404, msg: "Failure" };
            }

            // Check if the LastName already exists
            const existingLastName = await User.findOne({
                where: {
                    lastName: userData.lastName,
                },
            });

            if (existingLastName) {
                return { data: 'Last Name is already in use', statusCode: 404, msg: "Failure" };
            }

            // Hash the password before creating the user
            const hashedPassword = bcrypt.hashSync(userData.password, Number(process.env.SALT_ROUND));
            const user = await User.create({ ...userData, password: hashedPassword });

            // Generate a token with user information
            const token = generateToken(user);

            let fakePassword = undefined;
            user.dataValues.password = fakePassword

            return { data: { user, token }, statusCode: 201, msg: "Success" };
        } catch (error: any) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    },

    loginUser: async (userData: UserDataLogin) => {
        try {
            // Validate user data using Joi
            const validation = validateUserLoginData(userData);

            if (!validation.valid) {
                return { data: validation.errors, statusCode: 400, msg: "Failure" };
            }
            // Check if the email already exists
            // Check if the email already exists
            const user = await User.findOne({
                where: {
                    email: userData.email,
                },
                attributes: { include: ['password'] }, // Include password
            });

            console.log(user);
            

            if (!user) {
                return { data: 'User With The Specified Email Not Found', statusCode: 404, msg: "Failure" };
            }

            // Compare passwords using bcrypt
            const passwordMatch = await bcrypt.compare(userData.password, user.dataValues.password);

            if (!passwordMatch) {
                return { data: 'Incorrect password', statusCode: 401, msg: "Failure" };
            }

            // Generate a token with user information
            const token = generateToken(user);
            let fakePassword = undefined;
            user.dataValues.password = fakePassword

            return { data: { user, token }, statusCode: 201, msg: "Success" };
        } catch (error: any) {
            console.log(error);

            throw new Error(`Error creating user: ${error.message}`);
        }
    },

    getAllUsers: async () => {
        try {
            const users = await User.findAll();
            return { users, statusCode: 200, msg: "Success" };
        } catch (error: any) {
            throw new Error(`Error fetching all users: ${error.message}`);
        }
    },

    getUserById: async (userId: string) => {
        try {
            const user = await User.findByPk(userId);
            return user;
        } catch (error: any) {
            throw new Error(`Error fetching user by ID: ${error.message}`);
        }
    },

    updateUser: async (userId: string, userData: UserData) => {
        try {
            if (!userId) {
                return { data: 'UserId Not Specified', statusCode: 404, msg: 'Failure' };
            }
            // Validate user data using Joi
            const validation = validateUpdateUserData(userData);
            if (!validation.valid) {
                return { data: validation.errors, statusCode: 400, msg: 'Validation Failure' };
            }

            // Check if the user exists
            const existingUser = await User.findByPk(userId);
            if (!existingUser) {
                return { data: 'User not found', statusCode: 404, msg: 'Failure' };
            }

            // Update user data
            await existingUser.update(userData);

            return { data: existingUser, statusCode: 200, msg: 'Success' };
        } catch (error: any) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    },

    deleteUser: async (userId: string) => {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return null
            }
            await user.destroy(); // Delete the user
            return { data: user, statusCode: 200, msg: 'Success' };
        } catch (error: any) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    },
};

export default UserService;
