"use client";

import { useEffect, useState } from "react";

interface Institution {
  name: string;
  institution_id: string;
}

interface BankAccount {
  id: string;
  name: string;
  balance: number;
  institution: Institution;
  access_token: string;
  link_session_id: string;
  transfer_status: string;
  mask?: string;
  subtype?: string;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
}

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  bank_accounts: BankAccount[];
}

const UserProfile = ({ user }: { user: User }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?._id) return;

      try {
        const response = await fetch("/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: user }), // Passing the user ID for transaction filtering
        });
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  return (
    <div className=" ">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Personal Info</h2>
        <p>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Address:</strong> {user.address}, {user.city}, {user.state}{" "}
          {user.postalCode}
        </p>

        <p>
          <strong>SSN (Last 4):</strong> ****{user.ssn}
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-6">Bank Accounts</h2>

      {/* Scrollable Bank Accounts Section */}
      <div className="max-h-[34rem] overflow-y-auto p-2 border rounded-lg bg-white shadow-md">
      {user.bank_accounts ?
      <>
        {user.bank_accounts.map((account) => (
          <div
            key={account.id}
            className=" p-4 rounded-lg shadow-md mt-4"
          >
            <h3 className="text-lg font-semibold">
              {account.name} - {account.institution.name}
            </h3>
            <p>
              <strong>Balance:</strong> ${account.balance.toFixed(2)}
            </p>
            <p>
              <strong>Transfer Status:</strong> {account.transfer_status}
            </p>
            {account.mask && (
              <p>
                <strong>Account Number:</strong> ****{account.mask}
              </p>
            )}
            {account.subtype && (
              <p>
                <strong>Type:</strong> {account.subtype}
              </p>
            )}

            <h4 className="text-md font-semibold mt-3">Recent Transactions</h4>
            <div>
              {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
              ) : transactions.length === 0 ? (
                <p className="text-center text-gray-600">
                  No transactions found.
                </p>
              ) : (
                <ul className="space-y-4">
                {transactions.map((txn: any) => (
                  <li key={txn._id} className="border-b pb-2">
                    {txn.transferType == "personal-accounts" ? (
                      <>
                        <p>
                          <strong>From Account:</strong>{" "}
                          {txn.senderAccountName}
                        </p>
                        <p>
                          <strong>Account To:</strong>{" "}
                          {txn.receiverAccountName}
                        </p>
                        <p>
                          <strong>Amount:</strong> ${txn.amount}
                        </p>
                        <p>
                          <strong>Status:</strong> {txn.status}
                        </p>
                        <p>
                          <strong>Message:</strong>{" "}
                          {txn.message || "No message"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(txn.timestamp).toLocaleString()}
                        </p>
                      </>
                    ) : (
                      <>
                     {txn.senderEmailId == user.email? 
              <><p><strong>Sent To: </strong>{txn.receiverId}</p>
              <p><strong>From Account </strong>{txn.senderAccountName}</p>
              <p><strong>Amount:</strong> ${txn.amount}</p>
              <p><strong>Status:</strong> {txn.status}</p>
              <p><strong>Message:</strong> {txn.message || "No message"}</p>
              <p className="text-sm text-gray-500">{new Date(txn.timestamp).toLocaleString()}</p></> 
              : 
              <><p><strong>Sent by: </strong>{txn.senderEmailId}</p>
              <p><strong>Received in: </strong>{txn.receiverAccountName}</p>
              <p><strong>Amount:</strong> ${txn.amount}</p>
              <p><strong>Status:</strong> {txn.status}</p>
              <p><strong>Message:</strong> {txn.message || "No message"}</p>
              <p className="text-sm text-gray-500">{new Date(txn.timestamp).toLocaleString()}</p></>}
              </>
                    )}
                  </li>
                ))}
              </ul>
              )}
            </div>
          </div>
        ))}</>: "No bank account connected." }
      </div>

    </div>
  );
};

export default UserProfile;
