# RescueGuard — Advanced Emergency & Disaster management System

RescueGuard is a state-of-the-art, real-time disaster management and emergency response system. Designed for both citizens and responders, it provides a centralized platform for SOS triggering, real-world monitoring, and resource coordination.

## 🚀 Key Features

### 🛡️ For Citizens (User Dashboard)
- **One-Tap SOS**: Instantly transmit your location and medical profile to emergency responders.
- **Smart Monitoring**: Real-time integration with Open-Meteo for local risk factors (weather, wind, humidity).
- **Nearby Resources**: Dynamic Hospital & Medical Center discovery via OpenStreetMap (Overpass API).
- **Live Location Tracking**: Accurate GPS tracking with reverse geocoding for precise address identification.
- **Emergency Profile**: Secure storage of blood type, allergies, and critical medical conditions.

### 🏢 For Responders & Admins (Command Center)
- **Centralized Alert Management**: Real-time table of active emergencies with detailed status tracking.
- **Resource Deployment**: Assign dispatchers and field agents to specific SOS requests.
- **Geospatial Intelligence**: Interactive map displaying all active alerts, city-wide traffic corridors, and risk hotspots.
- **Advanced Analytics**: Weekly response time visualization and hazard composition breakdowns.
- **Broadcast System**: Multi-channel communication for city-wide alerts.

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Vanilla CSS with Design Tokens (Light/Dark Mode support)
- **Maps**: Leaflet + React-Leaflet
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Data Integration**:
  - **Open-Meteo API**: Professional weather telemetry.
  - **Nominatim API**: Reverse geocoding.
  - **Overpass API (OSM)**: Real-time medical resource discovery.

## 📦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Authentication**:
   - **Signup**: New users can register with their name, email, and password. Data is persisted in local storage.
   - **Admin Hub**: Use the built-in override `admin@rescue.com` / `admin123` or register a new account.
   - **Password Security**: Features a visibility toggle for secure input.

## 🧹 Project Cleanup & Completion

The project has been audited and cleaned by Antigravity:
- Removed redundant backup directories (`DisasterGuard_Restored`).
- Eliminated unused boilerplate CSS (`App.css`).
- Fixed name typos and established "RescueGuard" as the primary system brand.
- Implemented dynamic user greetings and connected medical profiles.
- **Added User Registration**: New users can now join the network directly from the login page.
- **Enhanced Security UI**: Added password visibility toggle for better user experience.

---
*Built with ❤️ for a safer tomorrow.*
