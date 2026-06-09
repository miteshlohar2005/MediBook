# MediBook (CascadeRx)

MediBook (featuring CascadeRx) is an advanced clinical pharmacology platform designed to evaluate complex, multi-drug **cascade interactions** alongside standard pairwise drug-drug interactions (DDIs). Built with a state-of-the-art frontend and a powerful Python backend, the platform visualizes unseen enzyme interaction networks and generates patient-specific safety reports using LLMs.

---

## 🎯 Core Features

### 1. The Cascade Engine (Beyond Pairwise DDIs)
Traditional interaction checkers only look at two drugs at a time (Drug A + Drug B). MediBook goes deeper by analyzing **Cytochrome P450 (CYP450)** enzyme pathways. It detects:
- **Inhibition Cascades:** When one drug blocks the clearance of another, causing toxic accumulation.
- **Induction Cascades:** When a drug accelerates the clearance of another, causing treatment failure.
- **Enzyme Competition:** When multiple drugs compete for the same enzyme, saturating the pathway.

### 2. Patient-Specific Risk Multipliers
The analysis engine dynamically adjusts the calculated risk score based on the patient's physiological state:
- **Renal Impairment (eGFR):** Automatically scales toxicity risks for drugs cleared renally.
- **Age:** Adjusts for reduced hepatic reserve in patients over 65.
- **Pre-existing Conditions:** Flags contraindications (e.g., NSAIDs for heart failure or cirrhosis).

### 3. Brand-Name to Generic Resolution
Doctors and patients rarely input pure generic names. The backend features a **Drug Name Resolver**:
- **Offline Curated Dictionary:** Instantly resolves over 200 common global brand names (e.g., *Crocin → Paracetamol*, *Lipitor → Atorvastatin*).
- **LLM Fallback (Featherless / LLaMA 3.1 70B):** If an unknown brand or combination product is entered, the system queries a pharmacological LLM to safely split it into its active ingredients before passing it to the cascade engine.

### 4. Interactive "Cascade Fingerprint"
A highly interactive, dynamic 2D force-directed graph (built with `react-force-graph-2d`) visualizes the enzyme network. It highlights safe drugs in green, cascade-involved drugs in red, and visually links them to their respective metabolizing enzymes.

### 5. Premium UI & Animations
The entire user interface is designed to feel like a modern, premium native application:
- **Full Dark/Light Mode:** Seamless theme switching utilizing CSS variables and `next-themes`.
- **Fluid Animations:** Powered by `framer-motion`, featuring staggered list entries, glowing hover scales, seamless page transitions, and smooth `AnimatePresence` height adjustments for input panels.

---

## 🏗 Architecture & Tech Stack

### Frontend (Next.js)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom CSS variable tokens for theming.
- **UI Components:** Radix UI / shadcn
- **Animations:** Framer Motion (`FadeIn`, `ScaleHover`, `StaggerContainer` wrappers)
- **Graphing:** `react-force-graph-2d` for the enzyme network.

### Backend (Python Flask)
- **Framework:** Flask v3
- **Data Engine (`analyzer.py`):** Loads primary pairwise interaction datasets (`DDI_2_0.json` and DDInter databases) and combines them with a vast CYP450 routing table (`cyp_table.py`).
- **Resolver (`drug_resolver.py`):** Translates input names to generic APIs before calculation.
- **LLM Integration (`main.py`):** Streams clinical safety reports back to the frontend in real-time, explaining the mechanistic reasons behind the detected interactions and proposing safer alternatives.
- **Dependencies:** `openai` (for LLM connections), `pydantic` (for strict data modeling).

---

## 🤖 AI Agent Details (Antigravity)

This project underwent a massive UI and architecture polish executed by the **Antigravity AI Agent** (powered by Google DeepMind). The user's directive was to transform the functional Next.js dashboard into an "Apple-level," premium animated application without breaking the complex medical functionality.

### Agent Accomplishments A to Z:
1. **Dark Mode Integration:**
   - The agent analyzed the hardcoded hex colors across the Next.js components and elegantly refactored them into CSS variable tokens in `globals.css`.
   - It integrated `next-themes` and a `ThemeProvider` wrapper, creating a bug-free, hydration-safe dark mode toggle.
2. **Framer Motion Architecture:**
   - The agent recognized the need for reusable animation logic to keep the codebase clean. It authored a suite of wrapper components (`FadeIn.tsx`, `ScaleHover.tsx`, `StaggerContainer.tsx`).
   - It wrapped Next.js layouts in a `template.tsx` file to achieve global page cross-fade transitions.
3. **Complex State Animation:**
   - In the interactive `/checker` tool, the agent utilized Framer Motion's `AnimatePresence (mode="wait")` to smoothly cross-fade between the "Empty," "Loading," and "Results" states.
   - It animated the dynamic addition and removal of drug input fields so the layout smoothly expands and collapses rather than snapping abruptly.
4. **Debugging strict TypeScript:**
   - When Next.js strict compilation failed due to Downlevel Iteration on `Set` objects and tight type bindings on the 2D Canvas Graph (`react-force-graph-2d`), the agent successfully diagnosed the `tsconfig.json` requirements and patched the canvas rendering functions to ensure a stable, production-ready build.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** v18+
- **Python:** 3.9+
- *(Optional)* Featherless API Key for LLM brand-name resolution.

### 1. Run the Backend
```bash
cd backend
pip install -r requirements.txt

# Optional: Set LLM API Key for advanced drug resolution
export FEATHERLESS_API_KEY="your_api_key_here"

python main.py
```
*(The Flask server will start on `http://localhost:8000`)*

### 2. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
*(The Next.js application will start on `http://localhost:3000`)*

---

## 📂 Project Structure

```text
MediBook/
├── backend/
│   ├── main.py              # Flask server, API endpoints, LLM streaming
│   ├── analyzer.py          # Cascade Engine, risk scoring, patient multipliers
│   ├── drug_resolver.py     # Brand-to-Generic translation logic
│   ├── cyp_table.py         # CYP450 enzyme routing rules
│   ├── data/                # DDI Datasets (DDI_2_0.json, etc.)
│   └── requirements.txt
├── frontend/
│   ├── app/                 # Next.js App Router (dashboard, checker, etc.)
│   ├── components/          # React components (CascadeGraph, PastChecksList)
│   │   └── animations/      # Agent-created Framer Motion wrappers
│   ├── tailwind.config.ts
│   ├── globals.css          # Theme variables
│   └── package.json
└── README.md
```
