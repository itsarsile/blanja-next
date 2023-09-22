import { users } from "@/drizzle/schema"
import db from "@/src/db"
import { eq } from "drizzle-orm"
import { omit } from "lodash"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: number }}) {
    try {
        const id = params.id
        const [user] = await db.select().from(users).where(eq(users.id, id))
        const userWithoutPassword = omit(user, ['password'])
        return NextResponse.json({ message: 'Success retrieving user data',  userWithoutPassword })
    } catch (error) {
        return NextResponse.json({ message: 'Error while retrieveing user' })
    }
}

export async function PUT() {

}