import { NextResponse } from "next/server";
import prisma from "../prismaClient";
import { ERROR_MESSAGES, STATUS_CODES } from "@/consts/Errors";

export async function GET(req) {
  try {
    const limit = 10;
    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const id = parseInt(urlParams.get("id"));
    const page = parseInt(urlParams.get("page"));

    if (!id) {
      return NextResponse.json(
        {
          error: STATUS_CODES.BAD_REQUEST,
          message: "Doctor ID is required.",
        },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    const doctorPatients = await prisma.patient.findMany({
      where: { doctorId: id },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPatients = await prisma.patient.count({
      where: { doctorId: id },
    });

    return NextResponse.json(
      {
        message: "Doctor patients retrieved successfully",
        patients: doctorPatients,
        totalPatients: totalPatients,
        totalPages: Math.ceil(totalPatients / limit),
      },
      { status: STATUS_CODES.OK }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: ERROR_MESSAGES.SERVER_ERROR,
      },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const requiredFields = ["fullName", "gender", "doctorId", "bloodType"];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          {
            error: STATUS_CODES.BAD_REQUEST,
            message: ERROR_MESSAGES.MISSING_FIELDS,
          },
          { status: STATUS_CODES.BAD_REQUEST }
        );
      }
    }

    const newPatient = await prisma.patient.create({ data });

    return NextResponse.json(
      {
        message: "Patient successfully registered",
        patient: newPatient,
      },
      { status: STATUS_CODES.OK }
    );
  } catch (error) {
    console.log(error);
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
          message: "Patient ID is required for update.",
        },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    if (updateData.dateOfBirth) {
      updateData.dateOfBirth = new Date(updateData.dateOfBirth);
    }

    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: "Patient successfully updated",
        patient: updatedPatient,
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

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          error: STATUS_CODES.BAD_REQUEST,
          message: "Patient ID is required for deletion.",
        },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    await prisma.patient.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        message: "Patient successfully deleted",
      },
      { status: STATUS_CODES.OK }
    );
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          error: STATUS_CODES.NOT_FOUND,
          message: "Patient not found.",
        },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    return NextResponse.json(
      {
        error: STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: ERROR_MESSAGES.SERVER_ERROR,
      },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
