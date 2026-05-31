import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./config/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const AuthService = {
    async register(name: string, email: string, password: string) {
        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) throw new Error('Email já cadastrado');

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, passwordHash },
        })

        return { id: user.id, name: user.name, email: user.email };
    },

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error('Email ou senha inválidos');

        const valid = await bcrypt.compare(password, user.passwordHash)
        if (!valid) throw new Error('Email ou senha inválidos');

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

        return { token, user: { id: user.id, name: user.name, email: user.email } };
    },


};