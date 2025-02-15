"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const users = [
  { id: 1, name: "山田太郎", email: "yamada@example.com", status: "有効", registrationDate: "2023-01-15" },
  { id: 2, name: "佐藤花子", email: "sato@example.com", status: "有効", registrationDate: "2023-02-20" },
  { id: 3, name: "鈴木一郎", email: "suzuki@example.com", status: "停止", registrationDate: "2023-03-10" },
  // ... 他のユーザーデータ
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ユーザー管理</h1>
      <div className="flex justify-between">
        <Input
          placeholder="ユーザー名またはメールアドレスで検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button>新規ユーザー追加</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>氏名</TableHead>
            <TableHead>メールアドレス</TableHead>
            <TableHead>ステータス</TableHead>
            <TableHead>登録日</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{user.registrationDate}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  詳細
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

