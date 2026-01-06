/** @type {import('next').NextApiRequest} */
import { getDb } from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';

/**
 * @param {import('next').NextApiRequest} request
 * @param {import('next').NextApiResponse} response
 */
export async function POST(request) {
    try {
        const { email, password, name = 'User' } = await request.json();

        // Check if user exists
        const db = await getDb();
        const users = db.collection('users');
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return Response.json({ error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await users.insertOne({
            email,
            password: hashedPassword,
            name,
            createdAt: new Date(),
            role: 'user'
        });

        return Response.json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Register error:', error);
        return Response.json({ error: 'Server error' }, { status: 500 });
    }
}