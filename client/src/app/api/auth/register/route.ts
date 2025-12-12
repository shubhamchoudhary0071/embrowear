import { ApiError } from "@/interfaces/auth.interfaces";
import apiClient from "@/utils/apiClient";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    try{
        const body=await req.json();
        console.log("body",body)
        const res=await apiClient.post("/auth/register",body);
        console.log("res",res)
        return NextResponse.json(res.data);
    }catch(error:unknown){
        const errorMsg=error as ApiError
        return NextResponse.json(errorMsg.response.data.message)
    }
}