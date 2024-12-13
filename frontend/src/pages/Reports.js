import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [reportType, setReportType] = useState('contributions');

  useEffect(() => {
    fetchReports(reportType);
  }, [reportType]);

  const fetchReports = async (type) => {
    try {
      const data = await apiService.getReports(type);
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleGenerateReport = async () => {
    try {
      await apiService.generateReport(reportType);
      fetchReports(reportType);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Financial Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contributions">Contributions</SelectItem>
                <SelectItem value="dividends">Dividends</SelectItem>
                <SelectItem value="transactions">Transactions</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleGenerateReport}>Generate Report</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Member</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>${report.amount.toFixed(2)}</TableCell>
                  <TableCell>{report.member}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;

