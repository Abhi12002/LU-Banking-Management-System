"use client";
import UserProfile from "../../../components/UserProfile";
import { useState, useEffect } from "react";
import Alert from "@/components/Alert";
export default function ProfilePage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [alertKey, setAlertKey] = useState<number>(0);
    const [message, setMessage] = useState("");
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/getUsers", { method: "GET" });
                if (!response.ok) throw new Error("Failed to fetch users");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);
    const makeAdminReq = async () => {
        if(selectedUser.isAdmin){
            setMessage("User is already admin.")
            setAlertKey(prevKey => prevKey + 1);
        }else{
        try {
   
            const response = await fetch("/api/makeAdmin", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: selectedUser.email,
                }),
              });
            if (!response.ok) throw new Error("Failed to fetch users");
            setMessage("User is successfully granted admin role.")
            setAlertKey(prevKey => prevKey + 1);
        } catch (error) {
            console.error("Error fetching users:", error);
        } 
    }
    }
    if (loading) return <p>Loading users...</p>;
    console.log(users)
    return (
        <div className="md:p-6 overflow-scroll">
            {selectedUser ? (
                <div>
                    <div className="flex flex-col md:flex-row">
                    <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setSelectedUser(null)}>
                        Back to Users
                    </button>
                    <button className="mb-4 px-4 py-2 md:mx-[2rem] bg-blue-500 text-white rounded" onClick={() => makeAdminReq()}>
                        Grant the user admin privilege.
                    </button>
                    </div>
                    <UserProfile user={selectedUser} />
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold mb-4">User List</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border md:p-2">Name</th>
                                <th className="border md:p-2">Email</th>
                                <th className="border md:p-2">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="cursor-pointer hover:bg-gray-100" onClick={() => setSelectedUser(user)}>
                                    <td className="border md:p-2">{user.firstName} {user.lastName}</td>
                                    <td className="border md:p-2">{user.email}</td>
                                    <td className="border md:p-2">{user.address}, {user.city}, {user.state} {user.postalCode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
                        { alertKey > 0 && (
        <Alert key={alertKey} message={message} type="success" />
      )}
        </div>
    );
}