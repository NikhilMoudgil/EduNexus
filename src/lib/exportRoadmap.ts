export function downloadMarkdown(title: string, content: string) {
  const filename = `${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}-roadmap.md`;
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function printOrSavePDF(title: string, content: string, profileInfo: { branch: string; sem: string; goal: string }) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to export the roadmap PDF.");
    return;
  }

  // Convert basic markdown tags to styled print HTML
  const formattedHtml = content
    .replace(/^# (.*$)/gim, '<h1 style="color:#06b6d4; border-bottom: 2px solid #06b6d4; padding-bottom:8px; margin-top:20px;">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 style="color:#0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom:4px; margin-top:18px;">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 style="color:#1e293b; margin-top:14px;">$1</h3>')
    .replace(/^\> (.*$)/gim, '<blockquote style="background:#f1f5f9; border-left:4px solid #06b6d4; padding:8px 12px; margin:10px 0; font-style:italic;">$1</blockquote>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- [ ] (.*$)/gim, '<li style="list-style:none; margin:4px 0;">☐ $1</li>')
    .replace(/^- [x] (.*$)/gim, '<li style="list-style:none; margin:4px 0;">☑ $1</li>')
    .replace(/^- (.*$)/gim, '<li style="margin:4px 0;">$1</li>')
    .replace(/\n\n/g, '<br/>');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>EduNexus Roadmap - ${title}</title>
        <style>
          @page { size: A4; margin: 20mm; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #0f172a;
            line-height: 1.5;
            padding: 20px;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 12px;
            margin-bottom: 20px;
          }
          .brand { font-size: 24px; font-weight: 900; color: #0f172a; tracking: -0.5px; }
          .brand span { color: #06b6d4; }
          .meta-box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 13px;
          }
          table { width: 100%; border-collapse: collapse; margin: 16px 0; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; font-size: 13px; }
          th { background: #f1f5f9; }
          .footer {
            margin-top: 40px;
            padding-top: 12px;
            border-top: 1px solid #e2e8f0;
            font-size: 11px;
            color: #64748b;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="brand">Edu<span>Nexus</span></div>
          <div style="font-size: 12px; color: #64748b;">AI Personalized Career Pathway</div>
        </div>
        
        <div class="meta-box">
          <strong>Target Career:</strong> ${profileInfo.goal} &nbsp;|&nbsp;
          <strong>Academic Branch:</strong> ${profileInfo.branch} &nbsp;|&nbsp;
          <strong>Semester:</strong> ${profileInfo.sem}
        </div>

        <div class="content">
          ${formattedHtml}
        </div>

        <div class="footer">
          Generated via EduNexus AI Roadmap Engine • Confidential to Student
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}