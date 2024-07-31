import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const PATCH = auth(async function PATCH(req, params) {	
    if (!req.auth) {
        return NextResponse.json(
            { message: "Unauthenticated user" },
            { status: 401 },
        );
    }
    try {
        const  id  = params.params?.id;
        const { done, content, order } = await req.json();
        const updatedTodo = await prisma.toDos.update({
            where: { id: Number(id) },
            data: { done, content, order },
        });

        if(updatedTodo) return NextResponse.json({ message: "Task edited successfull!", status: 200, updatedTodo: updatedTodo});
        return NextResponse.json({ message: "Failed to edit task", status: 400, updatedTodo: null });
    } catch (error) {
        return NextResponse.json(
            { message: "Error", error },
            { status : 500 }
        );
    }
});
export const DELETE = auth(async function DELETE(req, params) {	
    if (!req.auth) {
        return NextResponse.json(
            { message: "Unauthenticated user" },
            { status: 401 }
        );
    }
    try {
        const  id  = params.params?.id;
        const deletedTodo = await prisma.toDos.delete({
            where: { id: Number(id) },
        });

        if(deletedTodo) return NextResponse.json({ message: "Task deleted successfully", status: 200, deletedTodo: deletedTodo});
        return NextResponse.json({ message: "Failed to delete task", status: 400, deletedTodo: null });
    } catch (error) {
        return NextResponse.json(
            { message: "Error", error },
            { status : 500 }
        );
    }
});