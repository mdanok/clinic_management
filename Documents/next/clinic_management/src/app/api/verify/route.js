import prisma from "../prismaClient";
import { NextResponse } from "next/server";
import { ERROR_MESSAGES, STATUS_CODES } from "@/consts/Errors";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.token) {
      return NextResponse.json(
        {
          error: STATUS_CODES.BAD_REQUEST,
          message: ERROR_MESSAGES.MISSING_FIELDS,
        },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    const activated = await prisma.doctor.update({
      where: {
        activeationToken: data.token,
      },
      data: {
        activated: true,
      },
    });

    if (activated) {
      return NextResponse.json(activated);
    } else {
      return NextResponse.json(
        {
          error: STATUS_CODES.NOT_FOUND,
          message: ERROR_MESSAGES.NOT_RESULTS_FOUND,
        },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: ERROR_MESSAGES.SERVER_ERROR,
      },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
