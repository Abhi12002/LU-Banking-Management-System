import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RighrSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import Image from "next/image";

const Home = () => {
  const loggedIn = { firstName: 'Hunny', lastName: 'JSM', email: 'contact@jsmastery.pro'}
}
export default function Home() {
  return (
    <section className="home">
        <div className="home-content">
            <header className="home-header">
                <HeaderBox
                type="greeting"
                title="Welcome"
                user="Hunny"
                subtext="Access and manage your account and transactions effciently"
                />
                <TotalBalanceBox
                accounts={[]}
                totalBanks={1}
                totalCurrentBalance={0.69}
                />
            </header>

            RECENT TRANSACTIONS
        </div>

        <RightSidebar 
          user={loggedIn}
          transactions={[]}
          banks={[{}, {}]}
        />
    </section>
  );
}
