import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createUser, findByUsername } from '../models/authModel.js';

export const register = (req, res) => {
    const { username, password, role } = req.body;

    // Check if username already exists
    findByUsername(username, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error checking username' }); // Database error
        }

        if (result.length > 0) {
            return res.status(400).json({ message: 'Username already exists' }); // Username already taken
        }

        // If the username does not exist, proceed with registration
        const hashedPassword = bcrypt.hashSync(password, 8);
        createUser({ username, password: hashedPassword, role }, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error registering user' }); // Database insert error
            }
            res.status(201).json({ message: 'User registered successfully' }); // Success
        });
    });
};
export const login = (req, res) => {
    const { username, password } = req.body;
    findByUsername(username, (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = results[0];
        if (!bcrypt.compareSync(password, user.password))
            return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};
