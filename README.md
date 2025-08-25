# AuditX: Advanced Website Security & Performance Analyzer  

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Pruthvi-123-prog/AuditX/main.yml?branch=main)](https://github.com/Pruthvi-123-prog/AuditX/actions)
[![npm version](https://img.shields.io/npm/v/auditx)](https://www.npmjs.com/package/auditx)
[![Issues](https://img.shields.io/github/issues/Pruthvi-123-prog/AuditX)](https://github.com/Pruthvi-123-prog/AuditX/issues)
[![Stars](https://img.shields.io/github/stars/Pruthvi-123-prog/AuditX)](https://github.com/Pruthvi-123-prog/AuditX/stargazers)
[![Forks](https://img.shields.io/github/forks/Pruthvi-123-prog/AuditX)](https://github.com/Pruthvi-123-prog/AuditX/network/members)

---

## Overview  
**AuditX** is a web application that provides real-time **security, performance, SEO, and accessibility audits** for websites.  
It is built with a modern stack and delivers professional-grade analysis with intuitive reporting features.  

**Live Platform:** [AuditX on Vercel](https://audit-x.vercel.app/)  

---

## Features
- Security vulnerability scanning  
- Performance insights & recommendations  
- SEO & accessibility analysis  
- Export reports as PDF or JSON  
- Professional UI with data visualization  

---

## Getting Started  

### Prerequisites
- Node.js (>=18.x)  
- npm or yarn  

### Installation  
```bash
# Clone repo
git clone https://github.com/Pruthvi-123-prog/AuditX.git
cd AuditX

# Install dependencies
npm install

# Start development server
npm run dev
```

Now open:  
```
http://localhost:3000
```

---

## Usage Guide  

1. Enter a website URL  
2. Run a scan  
3. View results across **Security, Performance, SEO, and Accessibility** tabs  
4. Export reports (PDF or JSON)  

---

## API Endpoints  

### Website Scan  
```http
POST /api/scan
{
  "url": "https://example.com"
}
```

### Export Report  
```http
POST /api/export
{
  "reportId": "scan-id",
  "format": "pdf" | "json"
}
```

### Security Headers  
```http
GET /api/headers
```

---

## Project Structure  
```
AuditX/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router
│   ├── components/      # React components
│   ├── lib/             # Core scanning engine + reporting
│   └── types/           # TypeScript definitions
├── package.json
├── next.config.ts
└── README.md
```

---

## Tech Stack  

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)  
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)  
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)  
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)  
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)  
![Zustand](https://img.shields.io/badge/Zustand-593D88?logo=react&logoColor=white)  

---

## Contributors  

- [Pruthvi](https://github.com/Pruthvi-123-prog)  
- [Nafees Khan](https://github.com/Nafees-khan-29)  
- [Muzammil](https://github.com/Muzammilk3)  
- [Ajaz Jamadar](https://github.com/ajazjamadar)  

---

## Contact  
For queries: **pruthvis2004@gmail.com**  

---

## License  
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).  

---

<div align="center">

Built by the **AuditX Team**  
[Website](https://audit-x.vercel.app/) • [Contact](mailto:pruthvis2004@gmail.com) • [Report Issue](https://github.com/Pruthvi-123-prog/AuditX/issues)

</div>
