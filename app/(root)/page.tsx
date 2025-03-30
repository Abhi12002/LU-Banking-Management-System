"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import TransactionList from "@/components/TransactionList";
const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bankData, setBankData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchBankData = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch(`/api/getBankData?userId=${session.user.id}`);
        if (!response.ok) throw new Error("Failed to fetch bank data");
        const data = await response.json();
        setBankData(data);
      } catch (error) {
        console.error("Error fetching bank data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchBankData();
    }
  }, [session]);

  if (status === "loading" || loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }


  // console.log(session.user)
  var totalBalance = 0;
if(bankData.length > 0) {
  totalBalance = bankData?.reduce((sum: number, account: any) => sum + (account.balance || 0), 0) || 0;
}
  const totalAccounts = bankData?.length || 0;
console.log(bankData)
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={session.user.firstName}
            subtext="Access and manage your account and transactions efficiently"
          />
          <TotalBalanceBox
            accounts={bankData || []}
            totalBanks={totalAccounts}
            totalCurrentBalance={totalBalance}
          />

        </header>
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100 custom-scroll">
          <p className="text-bold mb-3">RECENT TRANSACTIONS</p>
          <TransactionList/>
        </div>
      </div>
      <RightSidebar user={session.user as User} bankAccount={bankData} transactions={[]} />
    </section>
  );
};

export default Home;
