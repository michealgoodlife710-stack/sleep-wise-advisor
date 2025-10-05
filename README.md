# SleepSense - Rule-Based Sleep Hygiene Advisor

A production-quality web application demonstrating an explainable rule-based expert system for personalized sleep hygiene recommendations.

![SleepSense](https://img.shields.io/badge/Status-Production-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)

## 🌟 Features

- **18 Evidence-Based Rules**: Comprehensive sleep hygiene knowledge base
- **Forward-Chaining Inference Engine**: Data-driven reasoning from facts to conclusions
- **Explainable AI**: Full transparency - see exactly which rules fired and why
- **Priority-Based Recommendations**: Ranked 1-10 with confidence scoring
- **Beautiful UI**: Modern design with Framer Motion animations
- **Privacy-First**: All processing happens locally in your browser
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: WCAG AA compliant with keyboard navigation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation & Running

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd sleepsense

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:8080 in your browser
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📖 How to Use

1. **Start Assessment**: Click "Start Assessment" on the homepage
2. **Answer Questions**: Complete the form about your sleep habits
3. **Get Results**: Receive personalized recommendations with explanations
4. **Download**: Export your analysis as JSON for future reference

## 🧠 System Architecture

### Inference Engine

The system uses a **forward-chaining inference engine**:

```typescript
Input Facts (User Assessment)
    ↓
Rule Evaluation (18 Rules)
    ↓
Fired Rules Collection
    ↓
Recommendation Deduplication
    ↓
Priority Sorting & Confidence Scoring
    ↓
Output (Personalized Recommendations)
```

### Rule Structure

Each rule contains:
- **ID**: Unique identifier (R1-R18)
- **Priority**: Weight 1-10 (10 highest)
- **Condition**: Boolean function evaluating input facts
- **Recommendation**: Actionable sleep hygiene tip
- **Explanation**: Why this matters for the user

### Confidence Scoring

```
confidence = min(1.0, 0.5 + 0.05 × priority + 0.1 × conditionsMatched)
```

## 🏗️ Project Structure

```
sleepsense/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── Hero.tsx               # Landing page hero
│   │   ├── HowItWorks.tsx         # Feature explanation
│   │   └── RecommendationCard.tsx # Result display
│   ├── pages/
│   │   ├── Index.tsx              # Homepage
│   │   ├── Assessment.tsx         # Assessment form
│   │   ├── Results.tsx            # Results page
│   │   └── NotFound.tsx           # 404 page
│   ├── lib/
│   │   ├── inference-engine.ts    # Core inference logic
│   │   ├── rules.ts               # Rule knowledge base
│   │   └── utils.ts               # Utility functions
│   ├── types/
│   │   └── assessment.ts          # TypeScript definitions
│   ├── index.css                  # Design system tokens
│   └── App.tsx                    # Main app component
├── public/                        # Static assets
├── tailwind.config.ts             # Tailwind configuration
├── vite.config.ts                 # Vite configuration
└── package.json                   # Dependencies
```

## 🎨 Design System

### Color Palette

- **Primary**: Deep Indigo `hsl(240, 60%, 40%)`
- **Secondary**: Teal `hsl(180, 60%, 50%)`
- **Accent**: Cyan `hsl(180, 65%, 45%)`
- **Success**: Green `hsl(142, 70%, 45%)`
- **Warning**: Amber `hsl(38, 92%, 50%)`

### Priority Colors

- **Critical**: Red (Priority 9-10)
- **High**: Teal (Priority 7-8)
- **Medium**: Amber (Priority 5-6)
- **Low**: Gray (Priority 1-4)

## 📝 Input Fields

The assessment collects these data points:

| Field | Type | Values |
|-------|------|--------|
| `bedtime_consistent` | Boolean | yes/no |
| `sleep_duration` | Number | 3-12 hours |
| `caffeine_after_3pm` | Boolean | yes/no |
| `alcohol_before_bed` | Boolean | yes/no |
| `late_screen_time` | Number | 0-180 minutes |
| `daytime_nap_minutes` | Number | 0-120 minutes |
| `exercise_within_3hrs_of_bed` | Boolean | yes/no |
| `noise_level` | Select | low/medium/high |
| `light_level` | Select | dark/dim/bright |
| `stress_level` | Select | low/medium/high |
| `room_temperature` | Number | 14-28°C |
| `uses_bed_for_work` | Boolean | yes/no |
| `medical_issues` | Select | none/insomnia/sleep_apnea/other |

## 🔬 Example Analysis

**Sample Input:**
```json
{
  "bedtime_consistent": "no",
  "sleep_duration": 5.5,
  "caffeine_after_3pm": "yes",
  "late_screen_time": 90,
  ...
}
```

**Sample Output:**
```json
{
  "recommendations": [
    {
      "id": "REC-1",
      "text": "Aim for 7–9 hours of sleep nightly.",
      "priority": 10,
      "confidence": 0.95,
      "firedRules": ["R2"],
      "category": "critical"
    },
    ...
  ],
  "firedRules": [...],
  "meta": {
    "inferenceTimeMs": 2.3,
    "totalRulesEvaluated": 18,
    "rulesMatched": 8
  }
}
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- inference-engine.test.ts
```

## 🛡️ Medical Disclaimer

**IMPORTANT**: SleepSense provides general sleep hygiene recommendations for educational purposes only. This tool does NOT provide medical advice, diagnosis, or treatment.

If you have:
- Persistent sleep problems
- Medical conditions (insomnia, sleep apnea, etc.)
- Concerns about your sleep health

Please consult a qualified healthcare professional. Do not use this tool as a substitute for professional medical care.

## 🔒 Privacy & Security

- ✅ No user accounts or authentication required
- ✅ All data processing happens locally in your browser
- ✅ No data sent to external servers
- ✅ No cookies or tracking
- ✅ Assessment data stored only in browser sessionStorage
- ✅ Export functionality for user control of their data

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## 📚 Technologies

- **Frontend**: React 18, TypeScript 5, Vite 5
- **Styling**: Tailwind CSS 3, shadcn/ui
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **State**: React Query, React Router
- **Forms**: React Hook Form, Zod validation

## 🤝 Contributing

This is an educational demonstration project. If you'd like to extend it:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Sleep research from American Academy of Sleep Medicine
- Clinical guidelines from National Sleep Foundation
- UI inspiration from Calm, Headspace, and Apple Health
- Built with [Lovable](https://lovable.dev)

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Email: support@sleepsense.example.com

---

Built with ❤️ and ☕ by the SleepSense team

**Note**: This is a demonstration project showcasing rule-based expert systems and explainable AI principles. It is not intended for actual medical use.
