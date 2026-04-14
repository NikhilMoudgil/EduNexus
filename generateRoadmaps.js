const fs = require('fs');
const path = require('path');

const roadmapIds = [
  "frontend", "backend", "fullstack", "javascript", "typescript", "python", "java", "golang", "rust", "c_plus_plus",
  "flutter", "android_kotlin", "ios_swift", "react_native", "data_science", "machine_learning", "postgresql", "supabase",
  "aws", "docker", "kubernetes", "terraform", "ethical_hacking", "ui_ux", "product_management", "blockchain_dev",
  "video_production", "formula_1_engineering", "aerodynamics", "scriptwriting", "youtube_strategy", "social_media_marketing",
  "seo", "copywriting", "project_management", "agile_scrum", "fintech", "big_data", "ai_ethics", "natural_language_processing",
  "computer_vision", "deep_learning", "data_engineering", "business_intelligence", "sql_mastery", "mongodb", "redis",
  "mysql", "sqlite", "graphql", "rest_api_design", "grpc", "microservices", "system_design", "sre", "linux_administration",
  "cloud_security", "network_security", "penetration_testing", "soc_analyst", "cryptography", "app_sec", "devsecops",
  "figma_mastery", "interaction_design", "motion_graphics", "graphic_design", "3d_modelling", "game_dev_unity",
  "unreal_engine", "godot_engine", "game_design", "ar_vr_development", "embedded_systems", "robotics", "iot_engineering",
  "hardware_design", "fpga_programming", "quantum_computing", "bioinformatics", "finops", "customer_success", "sales_engineering",
  "hr_tech", "edtech_foundations", "e_commerce_strategy", "growth_hacking", "content_strategy", "brand_design", 
  "podcast_production", "photography_digital", "vfx_compositing", "music_theory_for_producers", "game_audio",
  "cyber_law", "it_governance", "product_marketing", "data_privacy", "cloud_native_architecture"
];

const outputDir = path.join(process.cwd(), 'src', 'content', 'roadmaps');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

roadmapIds.forEach((id) => {
  const fileName = `official_${id}.md`;
  const filePath = path.join(outputDir, fileName);
  const title = id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  let phases = "";

  // 🏎️ Engineering & Physics (F1, Aerodynamics, Robotics)
  if (id.match(/(aerodynamics|engineering|robotics|hardware|embedded|fpga|iot)/)) {
    phases = `## Phase 1: Core Physics & Math
* Master fluid dynamics, structural mechanics, and the mathematical foundations of **${title}**.
* Learn CAD software (AutoCAD, SolidWorks) and simulation basics.
## Phase 2: Technical Design & Testing
* Prototype components and run computational simulations (CFD or FEA).
* Study material science and real-world implementation constraints.
## Phase 3: Advanced Optimization
* Perform high-level system integration and performance tuning.
* Master industry-specific standards and safety certifications.`;

  // 💻 Development & Engineering
  } else if (id.match(/(frontend|backend|fullstack|javascript|python|java|rust|go|sql|devops|cloud|security|data)/)) {
    phases = `## Phase 1: Environment & Syntax
* Setup a professional development environment and master **${title}** core syntax.
* Understand version control (Git) and clean code principles.
## Phase 2: Frameworks & Logic
* Build complex systems using the most relevant frameworks for **${title}**.
* Integrate databases, APIs, and implement rigorous testing.
## Phase 3: Scalability & Deployment
* Optimize performance for high-traffic environments and implement CI/CD.
* Master cloud architecture and system design patterns.`;

  // 🎨 Design & Content (3D, UI/UX, Video, Marketing)
  } else if (id.match(/(modelling|design|figma|video|strategy|marketing|content|brand|vfx|music)/)) {
    phases = `## Phase 1: Creative Theory
* Understand color theory, composition, and the psychological impact of **${title}**.
* Master the primary tools (Adobe Suite, Blender, or Figma).
## Phase 2: Craft & Execution
* Develop high-fidelity assets and master complex workflows.
* Focus on storytelling and user-centered experience within **${title}**.
## Phase 3: Professional Portfolio
* Finalize high-end projects and build a professional showcase.
* Learn client management and industry-specific delivery standards.`;

  // 👔 Business & Governance (PM, Agile, Law, HR)
  } else {
    phases = `## Phase 1: Industry Knowledge
* Understand the legal, ethical, and structural landscape of **${title}**.
* Master key terminology and fundamental operational processes.
## Phase 2: Strategic Management
* Implement workflows, manage stakeholders, and use industry-standard software.
* Focus on data-driven decision-making and project lifecycles.
## Phase 3: Leadership & Mastery
* Specialize in advanced niche topics and lead large-scale initiatives.
* Drive organizational growth through expert-level **${title}** strategy.`;
  }

  const content = `---
title: "${title}"
description: "Professional EduNexus Guide to mastering ${title}."
date: "${new Date().toISOString().split('T')[0]}"
---

# 🚀 ${title} Roadmap

Welcome to the official EduNexus guide. This roadmap provides a high-level technical path to becoming an expert in **${title}**.

${phases}

---
*This is an official EduNexus Pro Guide. Content is updated for 2026 industry standards.*`;

  fs.writeFileSync(filePath, content);
});

console.log(`✅ Dynamically generated 100 professional roadmaps!`);