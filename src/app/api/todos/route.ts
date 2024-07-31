import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const GET = auth(async (req) => {
	if (!req.auth) {
        return NextResponse.json(
            { message: "Unauthenticated user" },
            { status: 401 },
        );
    }
    try {
        const todos = await prisma.toDos.findMany({
            where: { userId: req.auth.user?.id },
            orderBy: { order: 'asc' },
        });
        if(todos.length) return NextResponse.json({ tasks: todos });

        return NextResponse.json({ message: "No tasks found", tasks: null });

    } catch (error) {
        return NextResponse.json(
            { message: "Error", error },
            { status : 500 }
        );
    }
});

export const POST = auth(async (req) => {
	if (!req.auth) {
        return NextResponse.json(
            { message: "Unauthenticated user" },
            { status: 401},
        );
    }
    try {
        const { userId, content} = await req.json();
        const lastTodo = await prisma.toDos.findFirst({
            orderBy: { order: 'desc' },
        });
        const newTask = await prisma.toDos.create({
            data: {
                content,
                userId,
                order: lastTodo ? lastTodo.order + 1 : 1,
            }
        });
        if(newTask) return NextResponse.json({ message: "Task created successfully", status: 201, task: newTask});
        return NextResponse.json({ message: "Failed to create task", status: 400, task: null });

    } catch (error) {
        return NextResponse.json(
            { message: "Error", error },
            { status : 500 }
        );
    }
});

export const DELETE = auth(async (req) => {
	if (!req.auth) {
        return NextResponse.json(
            { message: "Unauthenticated user" },
            { status: 401 },
        );
    }
    try {
        const searchParams = req.nextUrl.searchParams
        const done = searchParams.get('done');
        if (done === 'true') {
            var deletedTasks = await prisma.toDos.deleteMany({ where: { done: true } });
        } else {
            var deletedTasks = await prisma.toDos.deleteMany({ where: { done: false } });
        }

        if(deletedTasks) return NextResponse.json({ message: "All tasks deleted succesfully", status: 200});
        return NextResponse.json({ message: "Failed to delete task", status: 400, task: null });

    } catch (error) {
        return NextResponse.json(
            { message: "Error", error },
            { status : 500 }
        );
    }
});