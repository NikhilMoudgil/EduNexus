import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.TUTOR_API_KEY;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "EduNexus Multi-Domain Tutor",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", 
        messages: [
          {
            role: "system",
            content: `You are the EduNexus Multi-Domain Mentor. You provide expert guidance across 100+ domains including:
            - Technology: Software Engineering, Database Architecture (PostgreSQL/Supabase), & AI.
            - Engineering: High-performance Automotive (F1), Aerodynamics, & Mechanics.
            - Creative Arts: Anime Storyboarding, Scriptwriting, & Video Production.
            
            Guidelines:
            - Provide clear, structured explanations using Markdown.
            - Be witty, patient, and highly professional.
            - For coding, provide optimized snippets. For creative tasks, focus on storytelling and flow.
            - If a user is stuck, suggest a relevant roadmap from the EduNexus library.`
          },
          ...messages 
        ],
        temperature: 0.8, // Increased slightly for creative flexibility
      }),
    });

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]) {
      throw new Error("Invalid response from OpenRouter");
    }

    return NextResponse.json({
      success: true,
      ai_response: data.choices[0].message.content
    });

  } catch (error) {
    console.error("Tutor API Error:", error);
    return NextResponse.json({ error: "The EduNexus Expert is currently offline." }, { status: 500 });
  }
}