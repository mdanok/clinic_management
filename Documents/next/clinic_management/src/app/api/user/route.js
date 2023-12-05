import { NextResponse } from "next/server";
import prisma from "../prismaClient";
import { ERROR_MESSAGES, STATUS_CODES } from "@/consts/Errors";

export async function POST(req) {
  try {
    const data = await req.json();
    if (!data.doctorId) {
      return NextResponse.json(
        {
          error: STATUS_CODES.BAD_REQUEST,
          message: "Doctor ID is required.",
        },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }
    const getDoctor = await prisma.doctor.findUnique({
      where: { id: data.doctorId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        specialization: true,
      },
    });
    if (!getDoctor) {
      return NextResponse.json(
        {
          error: STATUS_CODES.BAD_REQUEST,
          message: "Doctor does not exist.",
        },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    } else {
      return NextResponse.json(
        {
          data: getDoctor,
        },
        { status: STATUS_CODES.OK }
      );
    }
  } catch {
    return NextResponse.json(
      {
        error: STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: ERROR_MESSAGES.SERVER_ERROR,
      },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, ...updateData } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          error: STATUS_CODES.BAD_REQUEST,
          message: "Doctor ID is required.",
        },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: "Doctor updated successfully",
        data: updatedDoctor,
      },
      { status: STATUS_CODES.OK }
    );
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
