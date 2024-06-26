import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { handelError } from "../../errors/handelError";
import { prisma } from "../../providers/prisma.provider";
import { AddUserType, ProviderUserType } from "../../types/user.types";

export const addUser = async (req: Request, res: Response) => {
	const data: AddUserType = req.body;

	try {
		const existingUser = await prisma.user.findFirst({
			where: {
				email: data.email,
			},
		});
		if (existingUser) return handelError(res, 409);

		const hashedPassword = await bcrypt.hash(data.password, 10);
		const user = await prisma.user.create({
			data: {
				email: data.email,
				password: hashedPassword,
				username: data.username,
			},
		});
		return res.status(201).send({
			status: "success",
			data: user,
			statusCode: 201,
		});
	} catch (error) {
		return handelError(res, 500, error);
	}
};

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany();
		return res.status(200).send({
			status: "success",
			data: users,
			statusCode: 200,
		});
	} catch (error) {
		return handelError(res, 500, error);
	}
};

export const providerAddUser = (req: Request, res: Response) => {
	const data: ProviderUserType = req.body;
	try {
		const user = prisma.user.create({
			data: data,
		});

		console.log(req.cookies);
	} catch (error) {
		handelError(res, 500, error);
	}
};
