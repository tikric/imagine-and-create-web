import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/curso")({
  component: CursoLayout,
});

function CursoLayout() {
  return <Outlet />;
}