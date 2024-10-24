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

export type Application = {
  id: number;
  companyName: string;
  position: string;
  applicationDate: string;
  status: string;
  notes: string;
};

export function CountByMonth() {
  const [counts, setCounts] = useState<{ month: string; count: number }[]>([]);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  useEffect(() => {
    const count = async () => {
      const data: any[] | undefined = await getApplicationsCountByMonth(
        selectedYear
      );
      if (data) {
        setCounts(data);
      }
    };

    count();
  }, [selectedYear]);

  const groupedData = counts.reduce((acc: any, { month, count }: any) => {
    const key = month;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += count;
    return acc;
  }, {} as Record<string, number>);

  const categories: string[] = Object.keys(groupedData);
  const data: number[] = Object.values(groupedData);

  const state = {
    series: [
      {
        name: "Candidaturas",
        data: data,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar" as "bar", // Explicitamente definindo o tipo como 'bar'
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: categories,
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text: "Candidaturas",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
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
        <CardTitle>Candidaturas por Mês</CardTitle>
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
          <ApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </CardContent>
    </Card>
  );
}
