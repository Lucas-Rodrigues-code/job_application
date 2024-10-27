"use client";
import { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountByMonth } from "@/components/bar-chart-count-by-month";
import { getApplications } from "@/api/job_applications.api";
import { SelectionProcesses } from "@/components/selection-processes";

export type Application = {
  id: number;
  companyName: string;
  position: string;
  applicationDate: string;
  status: string;
  notes: string;
};

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const get = async () => {
      const data: Application[] | undefined = await getApplications();
      if (data) {
        const job_applications = data.map((app) => {
          return {
            id: app.id,
            companyName: app.companyName,
            position: app.position,
            applicationDate: app.applicationDate,
            status: app.status,
            notes: app.notes,
          };
        });
        setApplications(job_applications);
      }
    };
    get();
  }, []);

  const stats = {
    total: applications.length,
    inProgress: applications.filter((app) => app.status === "Em andamento")
      .length,
    rejected: applications.filter((app) => app.status === "Rejeitado").length,
    accepted: applications.filter((app) => app.status === "Aceito").length,
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Dashboard de Candidaturas</h1>
        <p className="text-muted-foreground">
          Visualize suas estatísticas de candidaturas
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Candidaturas
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <div className="h-4 w-4 rounded-full bg-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejeitadas</CardTitle>
            <div className="h-4 w-4 rounded-full bg-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aceitas</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.accepted}</div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <CountByMonth />
        <SelectionProcesses />
      </div>
    </div>
  );
}
