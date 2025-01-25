import { useScaffoldReadContract } from "./useScaffoldReadContract";

export const useWorldCapitalStats = () => {
  const { data: totalValueLocked } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "totalValueLocked",
  });

  const { data: activeInvestments } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getActiveInvestmentsCount",
  });

  return {
    tvl: totalValueLocked || 0n,
    investmentsCount: activeInvestments ? Number(activeInvestments) : 0,
    isLoading: !totalValueLocked || !activeInvestments
  };
};