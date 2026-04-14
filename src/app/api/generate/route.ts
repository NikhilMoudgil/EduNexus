import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { branch, semester, cgpa, goal, habits, learningStyle } = body;

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "API Key missing." }, { status: 500 });
    }

    const prompt = `Create a detailed career roadmap for a ${branch} student in semester ${semester} (CGPA: ${cgpa}). 
    Goal: ${goal}. Habits: ${habits}. Learning style: ${learningStyle}.
    Provide the response in Markdown with tables for "Key Skills" and "Project Suggestions".`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "EduNexus",
      },
      body: JSON.stringify({
        // Switching to a more stable FREE endpoint
        model: "openrouter/free", 
        messages: [
          { role: "system", content: "You are a career advisor." },
          { role: "user", content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({ 
        error: errorData?.error?.message || "AI Service Unavailable. Try again." 
      }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ result: data.choices[0].message.content });

  } catch (error: any) {
    return NextResponse.json({ error: "Check your internet or API key." }, { status: 500 });
  }
}