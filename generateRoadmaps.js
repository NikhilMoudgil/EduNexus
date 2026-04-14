const fs = require('fs');
const path = require('path');

// Your cluster of 100 roadmap IDs
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

// Path to your roadmap content folder
const outputDir = path.join(process.cwd(), 'src', 'content', 'roadmaps');

// 1. Create directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`📁 Created directory: ${outputDir}`);
}

// 2. Generate 100 markdown files
roadmapIds.forEach((id) => {
  const fileName = `official_${id}.md`;
  const filePath = path.join(outputDir, fileName);
  
  const title = id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const content = `# 🚀 ${title} Roadmap\n\n## Phase 1: Foundations\n* Content for ${title} coming soon!\n* This is an official EduNexus Pro Guide.`;

  fs.writeFileSync(filePath, content);
});

console.log(`✅ Successfully generated 100 roadmap files in src/content/roadmaps/`);