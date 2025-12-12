import { ApiError } from "@/interfaces/auth.interfaces";
import apiClient from "@/utils/apiClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        const body=await req.json();
        const res=await apiClient.post("/auth/login",body);
        console.log(res.data)
        return NextResponse.json(res.data);
    }catch(error){
        const errorMsg=error as ApiError
        return NextResponse.json(errorMsg.response.data.message)
    }
}