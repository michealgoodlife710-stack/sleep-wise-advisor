# SleepSense Architecture Documentation

## 🏗️ System Overview

SleepSense is a client-side web application implementing a rule-based expert system for sleep hygiene recommendations using forward-chaining inference.

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (Client)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  React Router  │  │  State (React)  │  │  SessionStorage │  │
│  └────────┬───────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                   │                     │            │
│  ┌────────▼───────────────────▼─────────────────────▼────────┐  │
│  │                     Pages Layer                            │  │
│  │  • Index (Hero + How It Works)                            │  │
│  │  • Assessment (Form)                                       │  │
│  │  • Results (Recommendations)                               │  │
│  └────────────────────────────┬───────────────────────────────┘  │
│                                │                                  │
│  ┌────────────────────────────▼───────────────────────────────┐  │
│  │                  Components Layer                           │  │
│  │  • RecommendationCard (with explainability)                │  │
│  │  • Hero, HowItWorks (marketing)                            │  │
│  │  • shadcn/ui components (Button, Card, etc.)               │  │
│  └────────────────────────────┬───────────────────────────────┘  │
│                                │                                  │
│  ┌────────────────────────────▼───────────────────────────────┐  │
│  │                   Business Logic Layer                      │  │
│  │  ┌─────────────────────────────────────────────────────┐   │  │
│  │  │       Inference Engine (inference-engine.ts)        │   │  │
│  │  │  • analyze(input): Forward-chaining algorithm       │   │  │
│  │  │  • calculateConfidence(): Scoring logic             │   │  │
│  │  │  • exportAsJSON(): Data serialization               │   │  │
│  │  └────────────────┬────────────────────────────────────┘   │  │
│  │                   │                                          │  │
│  │  ┌────────────────▼────────────────────────────────────┐   │  │
│  │  │         Rule Knowledge Base (rules.ts)              │   │  │
│  │  │  • 18 rules with conditions & recommendations       │   │  │
│  │  │  • Priority weights (1-10)                          │   │  │
│  │  │  • Explanation generators                            │   │  │
│  │  └─────────────────────────────────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Type Definitions                        │  │
│  │  • AssessmentInput                                        │  │
│  │  • AnalysisResult                                         │  │
│  │  • Recommendation                                         │  │
│  │  • Rule                                                   │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

### 1. User Assessment Flow

```
User fills form
      ↓
Assessment.tsx collects AssessmentInput
      ↓
Submit button triggers analyze()
      ↓
InferenceEngine.analyze(input)
      ↓
Evaluate all 18 rules against input facts
      ↓
Collect fired rules + metadata
      ↓
Deduplicate recommendations
      ↓
Calculate confidence scores
      ↓
Sort by priority
      ↓
Return AnalysisResult
      ↓
Store in sessionStorage
      ↓
Navigate to /results
      ↓
Results.tsx displays recommendations
```

### 2. Inference Process Detail

```typescript
function analyze(input: AssessmentInput): AnalysisResult {
  const firedRules: FiredRule[] = [];
  const recommendationMap = new Map();
  
  // FORWARD-CHAINING LOOP
  for (const rule of RULES) {
    if (rule.condition(input)) {  // ← Rule firing
      firedRules.push({
        ruleId: rule.id,
        priority: rule.priority,
        conditionsMatched: countConditions(rule)
      });
      
      // Deduplication logic
      if (recommendationMap.has(rule.recommendation)) {
        // Merge with existing
        mergeRules(recommendationMap, rule);
      } else {
        // Add new recommendation
        recommendationMap.set(rule.recommendation, {
          recommendation: rule.recommendation,
          priority: rule.priority,
          firedRuleIds: [rule.id],
          explanations: [rule.explanation(input)]
        });
      }
    }
  }
  
  // Convert to recommendations with confidence scores
  const recommendations = Array.from(recommendationMap.values())
    .map((item) => ({
      ...item,
      confidence: calculateConfidence(item.priority, item.conditionsMatched),
      category: getPriorityCategory(item.priority)
    }))
    .sort((a, b) => b.priority - a.priority);  // ← Priority sorting
  
  return {
    recommendations,
    firedRules,
    meta: { inferenceTimeMs, totalRulesEvaluated, rulesMatched }
  };
}
```

## 🧩 Component Hierarchy

```
App
├── TooltipProvider
├── Toaster (shadcn)
├── Sonner (toast notifications)
└── BrowserRouter
    └── Routes
        ├── Index (/)
        │   ├── Hero
        │   │   ├── Animated particles
        │   │   ├── Title & description
        │   │   └── CTA buttons
        │   ├── HowItWorks
        │   │   ├── Step cards (4)
        │   │   └── Feature grid
        │   ├── Medical Disclaimer
        │   ├── About the System
        │   └── Footer
        │
        ├── Assessment (/assessment)
        │   ├── Form
        │   │   ├── Sleep Schedule card
        │   │   ├── Stimulants card
        │   │   ├── Screen Time card
        │   │   ├── Environment card
        │   │   └── Medical card
        │   └── Submit button
        │
        ├── Results (/results)
        │   ├── Stats cards (3)
        │   ├── Top Priority section
        │   ├── Medical disclaimer (conditional)
        │   ├── Recommendations list
        │   │   └── RecommendationCard (repeated)
        │   │       ├── Priority badge
        │   │       ├── Rule IDs
        │   │       ├── Confidence circle
        │   │       └── Collapsible explanation
        │   └── Understanding Your Analysis
        │
        └── NotFound (*)
```

## 🎨 Design System Architecture

### Color Token Structure

```
:root {
  /* Base Colors (HSL) */
  --primary: 240 60% 40%        /* Indigo */
  --secondary: 180 60% 50%      /* Teal */
  --accent: 180 65% 45%         /* Cyan */
  
  /* Priority Scale */
  --priority-critical: 0 84% 60%    /* Red */
  --priority-high: 180 60% 45%      /* Teal */
  --priority-medium: 38 92% 50%     /* Amber */
  --priority-low: 220 15% 60%       /* Gray */
  
  /* Gradients */
  --gradient-hero: linear-gradient(135deg, 
    hsl(240 60% 40%), 
    hsl(180 60% 50%)
  )
  
  /* Shadows */
  --shadow-card: 0 4px 24px -4px hsl(240 60% 40% / 0.08)
}

/* Usage in components */
.recommendation-card {
  background: hsl(var(--card));
  box-shadow: var(--shadow-card);
}

.critical-badge {
  color: hsl(var(--priority-critical));
}
```

### Component Variants

```typescript
// Example: Button with design system
<Button 
  variant="default"     // Uses --primary
  className="hover:scale-105 transition-all"
>
  Start Assessment
</Button>

// Priority-colored badge
<Badge className="bg-secondary/10 text-secondary">
  High Priority
</Badge>
```

## 🔧 Technical Decisions

### 1. Why Forward-Chaining?

**Decision**: Use forward-chaining (data-driven) inference  
**Rationale**:
- Natural fit for assessment → recommendations flow
- Easier to explain to users ("your answers triggered these rules")
- Allows evaluation of all applicable rules
- Better for generating multiple recommendations

**Alternative considered**: Backward-chaining (goal-driven)
- Would require predefined goals
- Less intuitive for this use case

### 2. Why Client-Side Processing?

**Decision**: 100% client-side inference (no backend)  
**Rationale**:
- Privacy: No data leaves user's device
- Performance: Instant analysis (2-5ms)
- Cost: Zero server costs
- Simplicity: No backend to maintain
- Offline: Works without internet (after initial load)

**Trade-offs**:
- Cannot persist data across devices
- Cannot do A/B testing easily
- Limited to browser capabilities

### 3. Why TypeScript?

**Decision**: Strict TypeScript with no `any`  
**Rationale**:
- Type safety prevents runtime errors
- Better IDE autocomplete
- Self-documenting interfaces
- Easier refactoring

### 4. Why Framer Motion?

**Decision**: Use Framer Motion for animations  
**Rationale**:
- Declarative animation syntax
- Performance-optimized
- Works with React component lifecycle
- Easy complex animations (stagger, gestures)

**Alternative considered**: CSS animations
- Less flexible for complex sequences
- Harder to coordinate with state changes

## 📦 State Management Strategy

### Local State (useState)
```typescript
// Component-specific state
const [formData, setFormData] = useState<AssessmentInput>({...});
const [isAnalyzing, setIsAnalyzing] = useState(false);
```

### Session State (sessionStorage)
```typescript
// Persist between page navigation
sessionStorage.setItem("assessmentResult", JSON.stringify(result));
const storedResult = sessionStorage.getItem("assessmentResult");
```

### No Global State Needed
- Pages don't share complex state
- Data flow is unidirectional (assessment → results)
- No need for Redux/Zustand/Context

## 🔐 Security Considerations

### Input Validation
```typescript
// Type-safe inputs
interface AssessmentInput {
  sleep_duration: number;  // TypeScript enforces number
  stress_level: "low" | "medium" | "high";  // Union type = limited values
}

// UI constraints
<Slider min={3} max={12} />  // HTML5 validation
<Select>
  <SelectItem value="low">Low</SelectItem>
  {/* Only valid values selectable */}
</Select>
```

### No XSS Risk
- No `dangerouslySetInnerHTML`
- All user input is data, never executed
- React escapes all rendered content

### No Sensitive Data
- No passwords or PII collected
- No localStorage persistence (intentional)
- No external API calls with user data

## 🚀 Performance Optimizations

### 1. Bundle Size
- Tree-shaking (Vite): Only imported code bundled
- Lazy loading: Could add `React.lazy()` for routes (not needed yet)
- Icon tree-shaking: Lucide React only bundles used icons

### 2. Render Optimization
```typescript
// Framer Motion with layout
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  // Uses CSS transforms (GPU-accelerated)
/>

// Stagger animations (more efficient than setTimeout)
{recommendations.map((rec, i) => (
  <RecommendationCard
    index={i}  // Stagger delay = i * 0.1s
  />
))}
```

### 3. Inference Speed
- Inference runs in 2-5ms for all 18 rules
- No async needed (synchronous is faster for this use case)
- Map-based deduplication: O(n) time complexity

## 📱 Responsive Design Strategy

### Breakpoints
```typescript
// Tailwind config (mobile-first)
sm: 640px   // Small tablets
md: 768px   // Tablets
lg: 1024px  // Desktops
xl: 1280px  // Large desktops
2xl: 1400px // Extra large
```

### Responsive Patterns
```tsx
// Stack on mobile, grid on desktop
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
  {/* Cards */}
</div>

// Hide text on mobile, show on desktop
<span className="hidden md:inline">
  Detailed description
</span>

// Adjust font sizes
<h1 className="text-3xl md:text-5xl lg:text-7xl">
  SleepSense
</h1>
```

## 🧪 Testing Strategy (Recommended)

### Unit Tests (Jest + Testing Library)
```typescript
// tests/inference-engine.test.ts
describe('InferenceEngine', () => {
  it('should fire R2 when sleep_duration < 7', () => {
    const input = { sleep_duration: 5.5, /* ... */ };
    const result = inferenceEngine.analyze(input);
    expect(result.firedRules).toContainEqual(
      expect.objectContaining({ ruleId: 'R2' })
    );
  });
  
  it('should deduplicate recommendations', () => {
    // Test when multiple rules produce same recommendation
  });
  
  it('should calculate confidence correctly', () => {
    // Test confidence formula
  });
});
```

### Integration Tests (Playwright)
```typescript
// e2e/assessment-flow.spec.ts
test('complete assessment flow', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Start Assessment');
  
  // Fill form
  await page.selectOption('[name="stress_level"]', 'high');
  await page.fill('[name="sleep_duration"]', '5');
  
  // Submit
  await page.click('text=Get Recommendations');
  
  // Verify results
  await expect(page.locator('text=Your Sleep Analysis')).toBeVisible();
  await expect(page.locator('[data-testid="recommendation-card"]')).toHaveCount.greaterThan(0);
});
```

## 🔄 Deployment Architecture

```
Developer
    ↓ git push
GitHub Repository
    ↓ auto-deploy
Lovable Platform
    ↓ build (Vite)
Static Assets (HTML, CSS, JS)
    ↓ serve
CDN (Global Edge Network)
    ↓ HTTPS
User's Browser
```

### Build Process
```bash
# Development
npm run dev  # Vite dev server with HMR

# Production
npm run build  # TypeScript check + Vite build
# Output: dist/
#   - index.html
#   - assets/
#     - index-[hash].js   (minified, tree-shaken)
#     - index-[hash].css  (minified, purged)
```

## 📊 Scalability Considerations

### Current Limitations
- **Rules**: 18 rules evaluate in <5ms
- **Max complexity**: ~100 rules before noticeable delay
- **Data size**: Assessment + results < 50KB

### Scaling Strategies (If Needed)
1. **More rules**: 
   - Use rule groups/categories
   - Implement rule prioritization (evaluate high-priority first)
   - Add caching for repeated patterns

2. **Machine Learning Addition**:
   - Use rule-based system for transparency
   - Add ML for personalized rule weights
   - Hybrid approach: ML suggests, rules explain

3. **Backend Addition**:
   - Keep inference client-side
   - Backend for analytics, progress tracking
   - Preserve privacy-first design

## 🎯 Extension Points

Where to add new features:

### New Rules
```typescript
// rules.ts
{
  id: "R19",
  priority: 7,
  condition: (input) => input.new_field === "value",
  recommendation: "New recommendation text",
  explanation: (input) => `Because ${input.new_field}...`
}
```

### New Assessment Fields
```typescript
// types/assessment.ts
export interface AssessmentInput {
  // ... existing fields
  new_field: "option1" | "option2";  // 1. Add to type
}

// Assessment.tsx
<Select
  value={formData.new_field}
  onValueChange={(v) => updateField("new_field", v)}
>
  {/* 2. Add UI control */}
</Select>
```

### New Pages
```typescript
// App.tsx
<Route path="/new-page" element={<NewPage />} />

// pages/NewPage.tsx
const NewPage = () => { /* ... */ };
export default NewPage;
```

---

**Last Updated**: 2025-10-05  
**Version**: 1.0.0  
**Maintainer**: SleepSense Team
