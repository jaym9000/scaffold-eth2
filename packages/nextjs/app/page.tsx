"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { 
  BanknotesIcon,
  ChartBarIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { formatEther } from "viem";
import { useWorldCapitalStats } from "~~/hooks/scaffold-eth/useWorldCapitalStats";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { tvl, investmentsCount, isLoading } = useWorldCapitalStats();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-base-200 to-base-100 pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex items-center gap-4 p-4 bg-base-100 rounded-2xl shadow-lg">
              <BanknotesIcon className="h-8 w-8 text-primary" />
              <div className="flex flex-col items-start">
                <span className="text-sm">Investment Wallet</span>
                <Address address={connectedAddress} />
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold">
              <span className="block text-base-content/60 text-2xl sm:text-3xl mb-2">Welcome to</span>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                World Capital
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-base-content/80 max-w-2xl">
              The future of global investment and wealth management on the blockchain. Secure, transparent, and accessible to all.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full px-6 pb-20 -mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Investment Portal Card */}
          <Link href="/debug" className="group">
            <div className="h-full bg-base-100 border border-base-300 rounded-3xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="flex flex-col h-full gap-4">
                <div className="bg-primary/10 rounded-2xl p-4 w-fit">
                  <ChartBarIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Investment Portal</h3>
                <p className="text-base-content/70 flex-grow">
                  Access your investment portfolio, monitor performance, and manage your assets with our advanced smart contract system.
                </p>
                <div className="flex items-center gap-2 text-primary group-hover:gap-4 transition-all duration-200">
                  <span className="font-semibold">View Portfolio</span>
                  <ArrowPathIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Market Explorer Card */}
          <Link href="/blockexplorer" className="group">
            <div className="h-full bg-base-100 border border-base-300 rounded-3xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="flex flex-col h-full gap-4">
                <div className="bg-secondary/10 rounded-2xl p-4 w-fit">
                  <GlobeAltIcon className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Market Explorer</h3>
                <p className="text-base-content/70 flex-grow">
                  Explore global investment opportunities, track market trends, and analyze real-time blockchain data.
                </p>
                <div className="flex items-center gap-2 text-secondary group-hover:gap-4 transition-all duration-200">
                  <span className="font-semibold">Explore Markets</span>
                  <ArrowPathIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Investment Stats Card */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="h-full bg-base-100 border border-base-300 rounded-3xl p-8">
              <div className="flex flex-col h-full gap-8">
                <div className="bg-accent/10 rounded-2xl p-4 w-fit">
                  <CurrencyDollarIcon className="h-8 w-8 text-accent" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <ArrowTrendingUpIcon className="h-6 w-6 text-base-content/70 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Total Value Locked</h4>
                      <div className="bg-base-300 px-4 py-2 rounded-lg text-sm font-mono">
                        {isLoading ? (
                          <div className="animate-pulse">Loading...</div>
                        ) : (
                          formatNumber(parseFloat(formatEther(tvl)))
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <BanknotesIcon className="h-6 w-6 text-base-content/70 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Active Investments</h4>
                      <div className="bg-base-300 px-4 py-2 rounded-lg text-sm font-mono">
                        {isLoading ? (
                          <div className="animate-pulse">Loading...</div>
                        ) : (
                          `${investmentsCount} Active Positions`
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
