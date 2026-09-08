import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Home } from "@/routes/Home";
import { TrackPage } from "@/routes/TrackPage";
import { ModulePage } from "@/routes/ModulePage";
import { Glossary } from "@/routes/Glossary";
import { ProgressPage } from "@/routes/ProgressPage";

export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trilha/:trackId" element={<TrackPage />} />
        <Route path="/trilha/:trackId/:moduleId" element={<ModulePage />} />
        <Route path="/glossario" element={<Glossary />} />
        <Route path="/progresso" element={<ProgressPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
