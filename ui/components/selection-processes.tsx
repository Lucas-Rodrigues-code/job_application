"use client";
import React, { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";

import { getApplicationsCountByMonth } from "@/api/job_applications.api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import ReactApexChart from "react-apexcharts";

export type Application = {
  id: number;
  companyName: string;
  position: string;
  applicationDate: string;
  status: string;
  notes: string;
};

export function SelectionProcesses() {
  const [counts, setCounts] = useState<{ name: string; data: number[] }[]>([
    { name: "Candidato", data: [1, 2, 3, 4, 0, 0, 0, 0, 0, 0] },
    { name: "Entrevista Inicial", data: [2, 9, 4, 5, 6] },
    /*  { name: "Em andamento", data: [9, 8, 8] },
    { name: "contratado", data: [9, 8, 8] }, */
  ]);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  const allMonths = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const currentMonth = new Date().getMonth();

  const pastMonths = allMonths.slice(0, currentMonth + 1);

  const state = {
    series: counts,
    options: {
      chart: {
        height: 350,
        type: "line" as "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: pastMonths,
        title: {
          text: "",
        },
      },
      yaxis: {
        title: {
          text: "Número por etapa",
        },
        min: 0,
        max: 40,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2022 },
    (_, index) => currentYear - index
  );

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progresso dos Processos Seletivos</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <div className="w-full max-w-sm space-y-2">
            <Label htmlFor="year-select">Selecione um ano</Label>
            <Select value={selectedYear} onValueChange={handleYearChange}>
              <SelectTrigger id="year-select">
                <SelectValue placeholder="Select a year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedYear && (
              <p className="text-sm text-muted-foreground">
                Ano: {selectedYear}
              </p>
            )}
          </div>
          <ReactApexChart
            // @ts-ignore
            options={state.options}
            series={state.series}
            type="line"
            height={350}
          />
        </div>
      </CardContent>
    </Card>
  );
}
