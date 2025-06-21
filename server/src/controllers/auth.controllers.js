import { upsesrtStreamUser } from "../lib/stream.js";
import User from "../models/user.models.js";
import jwt from 'jsonwebtoken';


export async function signup(req, res) {
    try {
        const { email, password, fullName } = req.body;
        if (!email || !password || !fullName) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long'
            });
        }

        const emeailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emeailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvtar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = await User.create({
            email,
            password,
            fullName,
            profilePicture: randomAvtar
        })

        try {
            await upsesrtStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePicture || ''
            })
            console.log(`Stream User Upserted Successfully ${newUser._id}, ${newUser.fullName}`);
        } catch (error) {
            console.log('Error in Upserting Stream User', error);
        }

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d'
        })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict'
        })

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: newUser,
        })

    } catch (error) {
        console.log('Error in signup controller', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) return res.status(400).json({
            success: false,
            message: 'User not found'
        })

        const isPasswordCorrect = await user.matchPassword(password);

        if (!isPasswordCorrect) return res.status(400).json({
            success: false,
            message: 'Invalid password'
        })

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d'
        })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict'
        })

        res.status(201).json({
            success: true,
            message: 'User logged in successfully',
            user: user,
        })
    } catch (error) {
        console.log('Error in login controller', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export function logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    })
}

export async function onboarding(req, res) {
    try {
        const userId = req.user._id;

        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
                missingFields: [
                    !fullName && 'fullName',
                    !bio && 'bio',
                    !nativeLanguage && 'nativeLanguage',
                    !learningLanguage && 'learningLanguage',
                    !location && 'location',
                ].filter(Boolean),
            })
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded: true
        }, { new: true })

        if (!updatedUser) return res.status(400).json({
            success: false,
            message: 'Failed to update user'
        })

        try {
            await upsesrtStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePicture || ''
            })
            console.log(`Stream User updated after onboarding for ${updatedUser._id}, ${updatedUser.fullName}`);
        } catch (streamError) {
            console.log('Error in Upserting Stream User', streamError.message);
        }

        res.status(200).json({
            success: true,
            message: 'User onboarded successfully',
            user: updatedUser
        })
    } catch (error) {
        console.log('Error in onboarding controller', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

export function userProfile(req, res) {
    try {
        res.status(200).json({
            success: true,
            message: 'User profile fetched successfully',
            user: req.user
        })
    } catch (error) {
        console.log('Error in userProfile controller', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}