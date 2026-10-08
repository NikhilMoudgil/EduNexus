import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { branch, semester, cgpa, goal, habits, learningStyle } = body;

    // Server-side validation
    if (!branch || !semester || !cgpa || !goal || !habits || !learningStyle) {
      return NextResponse.json(
        { error: "All fields are required. Please check your inputs." },
        { status: 400 }
      );
    }

    const semNum = parseInt(semester, 10);
    const cgpaNum = parseFloat(cgpa);

    if (isNaN(semNum) || semNum < 1 || semNum > 8) {
      return NextResponse.json(
        { error: "Semester must be a valid number between 1 and 8." },
        { status: 400 }
      );
    }

    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      return NextResponse.json(
        { error: "CGPA must be a valid number between 0.0 and 10.0." },
        { status: 400 }
      );
    }

    const prompt = `
You are the EduNexus AI Career Advisor. Construct a personalized, pragmatic technical learning roadmap for an engineering student.

STUDENT PROFILE:
- Degree/Branch: ${branch}
- Current Semester: ${semester} / 8
- Current CGPA: ${cgpa} / 10.0
- Target Career Goal: ${goal}
- Daily Study Time & Habits: ${habits}
- Preferred Learning Style: ${learningStyle}

FORMAT YOUR RESPONSE IN HIGH-QUALITY MARKDOWN USING EXACTLY THESE HEADINGS:

# ${goal} Roadmap
> Personalized path created for ${branch} (Semester ${semester}, CGPA ${cgpa})

## 01. Profile & Goal Baseline
- **Academic Baseline:** ${branch}, Semester ${semester}
- **CGPA Strategy:** ${cgpaNum < 7.5 ? "Focus on core subject recovery + project-driven profile to offset CGPA threshold." : "Maintain academic score while aggressively scaling technical stack."}
- **Target Role:** ${goal}
- **Pacing & Bandwidth:** ${habits} (${learningStyle} approach)

## 02. Essential Skill Stack
### Must-Master Core Skills
- [ ] Skill 1 (Priority: High)
- [ ] Skill 2 (Priority: High)
- [ ] Skill 3 (Priority: Medium)

### Complementary Tools & Frameworks
- Tool 1
- Tool 2

## 03. Structured Learning Path

### Phase 1: Foundations & Core Concepts
- **Focus Area:** Essential theoretical & foundational concepts tailored to ${branch} Sem ${semester}.
- **Key Topics:** Topic 1, Topic 2, Topic 3
- **Expected Outcome:** Clear understanding of baseline tools.

### Phase 2: Core Development & Implementation
- **Focus Area:** Applied skill building.
- **Key Topics:** Topic 1, Topic 2, Topic 3
- **Expected Outcome:** Working understanding of target industry stack.

### Phase 3: Specialized Topics & Advanced Stack
- **Focus Area:** Industry-aligned expertise for ${goal}.
- **Key Topics:** Advanced Topic 1, Advanced Topic 2
- **Expected Outcome:** Readiness for complex architecture/projects.

### Phase 4: Practical Projects & Portfolio
- **Project 1 (Beginner-Intermediate):** Name & Brief Description
- **Project 2 (Advanced/Capstone):** Name & Brief Description with industry applicability.

### Phase 5: Interview & Technical Assessment Prep
- Data Structures & Problem Solving goals.
- Domain-specific mock interview targets.

### Phase 6: Placement & Application Strategy
- Resume key callouts.
- GitHub / Portfolio presentation advice.

## 04. Weekly Actionable Schedule
| Day | Focus Area | Activity |
|---|---|---|
| Mon - Tue | Core Learning | Deep dive theory & docs (${habits}) |
| Wed - Thu | Hands-on Practice | Code implementation & exercises |
| Fri | Project Work | Building portfolio projects |
| Sat - Sun | Review & DSA | Problem solving & revision |

## 05. Recommended Free Resources
- **Documentation:** Primary official docs
- **Courses/Video:** Structured free playlists/guides
- **Practice Platforms:** Relevant domain platforms
`;

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterApiKey) {
      return NextResponse.json(
        { error: "AI Service is currently misconfigured. Missing API key." },
        { status: 500 }
      );
    }

    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXTAUTH_URL || "https://edunexus.app",
        "X-Title": "EduNexus AI Generator",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-distill-llama-70b:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });

    if (!aiRes.ok) {
      const errData = await aiRes.text();
      console.error("OpenRouter Error:", errData);
      return NextResponse.json(
        { error: "Failed to generate roadmap from AI provider. Please try again." },
        { status: 502 }
      );
    }

    const aiData = await aiRes.json();
    const resultText = aiData.choices?.[0]?.message?.content || "";

    if (!resultText) {
      return NextResponse.json(
        { error: "AI returned an empty response. Please retry." },
        { status: 502 }
      );
    }

    return NextResponse.json({ result: resultText });
  } catch (err: any) {
    console.error("Generate API Route Error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}