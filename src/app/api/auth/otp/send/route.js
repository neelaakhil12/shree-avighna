import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/db";
import OTP from "@/models/OTP";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await dbConnect();

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save to DB (upsert)
    await OTP.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send email
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: `Your Login OTP - Shree Avighna`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 20px;">
          <h2 style="color: #333; text-align: center;">Welcome back!</h2>
          <p style="color: #666; font-size: 16px; text-align: center;">Use the following 6-digit code to complete your login to Shree Avighna.</p>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 12px; text-align: center; margin: 30px 0;">
            <span style="font-size: 36px; font-weight: 900; letter-spacing: 10px; color: #1c1c1c;">${otp}</span>
          </div>
          <p style="color: #999; font-size: 12px; text-align: center;">This code will expire in 5 minutes. If you did not request this, please ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="text-align: center; color: #333; font-weight: bold;">Shree Avighna Naturals</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OTP send error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
