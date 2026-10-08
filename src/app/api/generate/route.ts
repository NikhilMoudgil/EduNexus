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
        // Back to your original auto-router choice. No fallback arrays.
        model: "openrouter/free", 
        messages: [
          { role: "system", content: "You are a career advisor." },
          { role: "user", content: prompt }
        ],
        // Added this to stop reasoning models from causing the 45-second timeout / empty response
        reasoning: { exclude: true }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({ 
        error: errorData?.error?.message || "AI Service Unavailable. Try again." 
      }, { status: response.status });
    }

    const data = await response.json();
    
    // Safely extracts the text in case the auto-selected model formats it differently
    const message = data.choices?.[0]?.message;
    let resultText = message?.content || message?.reasoning || "";
    resultText = resultText.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    if (!resultText) {
      return NextResponse.json({ error: "AI returned an empty response. Please retry." }, { status: 502 });
    }

    return NextResponse.json({ result: resultText });

  } catch (error: any) {
    return NextResponse.json({ error: "Check your internet or API key." }, { status: 500 });
  }
}