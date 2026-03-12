
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, FileText, Clock, TrendingUp } from 'lucide-react';
import { IndianRupee } from 'lucide-react';
import { HandCoinsIcon } from 'lucide-react';
import { Briefcase } from 'lucide-react';
import { Home } from 'lucide-react';
import { UserCheck2Icon } from 'lucide-react';
import { Car } from 'lucide-react';
import { HandshakeIcon } from 'lucide-react';

export const StatsCards = (stats) => {
  console.log(stats);

  const { totalAmount, totalApplications, typeWise } = stats?.stats;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statsCards = [
    {
      title: 'Total applied loan',
      value: formatCurrency(totalAmount),
      icon: IndianRupee,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      application: totalApplications?.toLocaleString(),
      changeColor: 'text-green-600'
    },
    {
      title: 'Total Gold Loan',
      value: formatCurrency(typeWise?.Gold?.amount),
      icon: HandCoinsIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      application: typeWise?.Gold?.count?.toLocaleString(),
      changeColor: 'text-orange-600'
    },
    {
      title: 'Total Business Loan',
      value: formatCurrency(typeWise?.Business?.amount),
      icon: Briefcase,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      changeColor: 'text-pink-600',
      application: typeWise?.Business?.count?.toLocaleString(),
    },
    {
      title: 'Total Home Loan',
      value: formatCurrency(typeWise?.Home?.amount),
      icon: Home,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      application: typeWise?.Home?.count?.toLocaleString(),
      changeColor: 'text-blue-600'
    },
    {
      title: 'Total Persoanl Loan',
      value: formatCurrency(typeWise?.Personal?.amount),
      icon: UserCheck2Icon,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      application: typeWise?.Personal?.count?.toLocaleString(),
      changeColor: 'text-red-600'
    },
    {
      title: 'Total Vehicle Loan',
      value: formatCurrency(typeWise?.Vehicle?.amount),
      icon: Car,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      application: typeWise?.Vehicle?.count?.toLocaleString(),
      changeColor: 'text-gray-600'
    },
    // {
    //   title: 'Total Leads',
    //   value: 500,
    //   icon: HandshakeIcon,
    //   color: 'text-purple-600',
    //   bgColor: 'bg-purple-50',
    //   // application: typeWise?.Vehicle?.count?.toLocaleString(),
    //   changeColor: 'text-purple-600'
    // },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsCards.map((card, index) => (
        <Card key={index} className=" transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-gray-900 mb-1">
              Amount : {card.value || 0}
            </div>
            {
              card?.application &&
              <p className="text-md text-gray-500 flex items-center">
                <span className={`font-medium ${card.changeColor}`}>
                  Application : {card.application || 0}
                </span>
              </p>
            }

          </CardContent>
        </Card>
      ))}
    </div>
  );
};

{/* <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Total Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-center">{totalLeads}</p>
        </CardContent>
      </Card> */}