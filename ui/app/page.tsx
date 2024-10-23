"use client";

import { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Component } from "@/components/chart";

type Application = {
  id: number;
  company: string;
  position: string;
  date: string;
  status: "Em andamento" | "Rejeitado" | "Aceito";
  notes: string;
};

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const mockData: Application[] = [
      {
        id: 1,
        company: "TechCorp",
        position: "Frontend Developer",
        date: "2023-05-01",
        status: "Em andamento",
        notes: "Entrevista técnica agendada",
      },
      {
        id: 2,
        company: "DataSys",
        position: "Data Analyst",
        date: "2023-05-15",
        status: "Rejeitado",
        notes: "Não atendeu aos requisitos",
      },
      {
        id: 3,
        company: "WebSolutions",
        position: "Full Stack Developer",
        date: "2023-06-01",
        status: "Aceito",
        notes: "Oferta aceita, início em 01/07",
      },
      {
        id: 4,
        company: "AITech",
        position: "Machine Learning Engineer",
        date: "2023-06-15",
        status: "Em andamento",
        notes: "Aguardando retorno após teste técnico",
      },
    ];
    setApplications(mockData);
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
        <Card>
          <CardHeader>
            <CardTitle>Candidaturas por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <Component />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
