
import { users, configurations } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users as UsersIcon, Search, User, Clock, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count configurations per user
  const userConfigCount = users.map(user => {
    const count = configurations.filter(config => config.userId === user.id).length;
    return { userId: user.id, count };
  });

  const getConfigCount = (userId: string) => {
    const found = userConfigCount.find(item => item.userId === userId);
    return found ? found.count : 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <UsersIcon className="mr-2 h-4 w-4" />
            Users List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by username or email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">User</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Email</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Role</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Configurations</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Joined</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-muted/30">
                      <td className="p-3 flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-tech-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-tech-300" />
                        </div>
                        <span className="font-medium">{user.username}</span>
                      </td>
                      <td className="p-3 text-sm">{user.email}</td>
                      <td className="p-3">
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className={user.role === 'admin' ? 'bg-tech-300' : ''}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm">{getConfigCount(user.id)}</td>
                      <td className="p-3 text-sm flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No users match your search.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
