## HerbTech Web App — Page-by-Page Workflows

This document outlines user workflows for each page in the HerbTech Smart Cultivation web application. It focuses on user intent, key UI areas, primary interactions, data sources, success criteria, and navigation transitions.

---

### 1) Login Page (`/login`)

- **Purpose**: Gate access to authenticated features (Dashboard, Analytics, Settings).
- **Entry Conditions**: User is not logged in or was redirected from a protected route.
- **Primary UI**: Email/password inputs, Login button, optional branding.
- **Auth Logic**:
  - Any credentials are accepted in demo mode.
  - On submit, set `localStorage['herbtech-loggedIn'] = 'true'`.
  - Redirect to `/'` (Dashboard).
- **Success Criteria**: `localStorage` flag set; navigation to Dashboard occurs.
- **Failure Handling**: N/A for demo (no real validation). If needed, show a generic error toast.
- **Navigation**: On success → Dashboard. Sidebar is hidden on this page.

---

### 2) Dashboard (`/`)

- **Purpose**: Command center for real-time monitoring and quick controls.
- **Layout**:
  - Left: `SidebarRail` (fixed navigation with compact icons).
  - Header: Title and horizontal System Status tile (Active, Last Watering, Next Maintenance).
  - Main Grid: `PlantPod` visualization; Quick Stats below; Plant Health panel on the right; Pod Controls below Plant Health; System Status tile below Controls.
- **Key State/Derived Data** (client-only):
  - `luminance: number[]` (0–100) → `lightIntensity = luminance[0] / 100`.
  - `temperature: number[]`, `soilMoisture: number[]`, `npk: number[]`.
  - `watering: boolean` (transient animation state).
  - `luxValue = round((luminance[0] / 100) * 6000)`.
  - Plant KPIs: `plantHealth`, `growthStage`, `leafCount`.
- **Primary Interactions**:
  - Adjust sliders (luminance, temperature, soil moisture, NPK) → updates state and UI instantly.
  - "Water" action (handleWatering) → sets `watering=true`, bumps soil moisture, triggers plant/soil animations, auto-resets after ~2s.
  - Observe canopy glow and plant/tint response tied to `lightIntensity`.
- **Data Sources**: Local React state; visual effects via `plant-pod.css`; no server dependency.
- **Success Criteria**:
  - UI updates without refresh; canopy and plant visuals respond to changes.
  - System Status tile renders right-aligned in header with correct badges.
- **Navigation**: Sidebar → Analytics `/charts`, Settings `/settings`, Pod Demo `/pod-demo`.

---

### 3) Analytics Dashboard (`/charts`)

- **Purpose**: Time-series insights and system performance analysis.
- **Data Source**: `useDemoTelemetry()` hook (simulated readings updated periodically).
- **Controls**:
  - Time range select: `1h | 6h | 24h | 7d` → filters telemetry by timestamp.
  - Refresh button → shows brief spinner; re-computes derived metrics.
- **Visuals** (Recharts):
  - Environmental Trends: LineChart of `tempC`, `rh` over time.
  - Soil & pH Analysis: AreaChart of `soil`, `ph`.
  - System Performance: BarChart of `pumpPWM`, `ledPWM`.
  - Plant Health Distribution: PieChart of Brahmi vs Ashwagandha health.
- **Derived KPIs**:
  - Averages: temperature, humidity, soil moisture (based on filtered data).
  - System Efficiency: blended metric from plant health and environment bands.
- **Success Criteria**:
  - Charts render without hydration errors; tooltips/legends functional.
  - Time range updates data density and averages accordingly.
- **Navigation**: Sidebar → Dashboard `/`, Settings `/settings`, Pod Demo `/pod-demo`.

---

### 4) Settings (`/settings`)

- **Purpose**: Configure system parameters and view system/network status.
- **Access Control**: On mount, redirect to `/login` if `localStorage['herbtech-loggedIn'] !== 'true'`.
- **Layout**:
  - Main (2/3): `SettingsForm` — configure thresholds, modes, automation (persist to localStorage in the form component).
  - Sidebar (1/3): Tiles for System Information, Network Status, Quick Actions.
- **Sidebar Tiles**:
  - System Information: version, online status, uptime badge.
  - Network Status: connection, latency, signal strength.
  - Quick Actions: Refresh System, Backup Data, Security Check (stubbed buttons with room for integration).
- **Success Criteria**:
  - Settings changes persist (localStorage) and survive reloads.
  - Redirect works for unauthenticated access.
- **Navigation**: Back link to Dashboard; Sidebar to other pages.

---

### 5) Plant Pod Demo (`/pod-demo`)

- **Purpose**: Showcase the pod’s visual fidelity and compact mobile control surface.
- **Layout**:
  - Left: `PlantPod` in a stylized card (Ashwagandha image, canopy glow, soil + nutrient display).
  - Right: iPhone-style panel (375×812) with neon-blue UI, fully scrollable content.
- **Control States**:
  - `lightIntensity: number (0–1)` → drives `lux`, canopy tint, and visual responses.
  - `plantHealth: number (0–100)` → used for Moisture control (demo label).
  - `growthStage: number (0–100)` → used as Temperature control (°C label in UI).
  - `environmentalStress: number (0–1)` → small stress indicator.
- **Derived Metrics (updated via `useEffect`)**:
  - `lux`, `pH`, `soilM`, `hum`, `npk` displayed in compact status cards.
- **Success Criteria**:
  - Sliders update values smoothly; screen scrolls while phone size stays realistic.
  - Pod and mobile screen fit together without page scroll on typical desktop.
- **Navigation**: Sidebar → Dashboard `/`, Analytics `/charts`, Settings `/settings`.

---

### 6) Global Navigation (`SidebarRail`)

- **Purpose**: Consistent, minimal, non-scrollable navigation rail.
- **Items**: Dashboard `/`, Analytics `/charts`, Settings `/settings`; Logout anchored at bottom.
- **Behavior**:
  - Iconography: small, aligned towards the top; logout persists at bottom.
  - On Logout: clear `localStorage['herbtech-loggedIn']` and redirect to `/login`.
- **Success Criteria**: Rail is visible on all pages except `/login`; layout remains uncluttered.

---

### Cross-Page Notes

- **Branding**: `HerbTechLogo` used consistently where applicable without cluttering headers.
- **State & Storage**: Demo telemetry on Analytics; settings persisted to `localStorage`.
- **Performance**: Animations are lightweight; charts optimized with filtered datasets.
- **Accessibility**: Clear labels, readable contrasts, keyboard-friendly controls where possible.


