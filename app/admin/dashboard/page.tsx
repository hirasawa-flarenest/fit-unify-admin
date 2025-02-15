import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "1月", 新規会員: 400, 売上: 2400 },
  { name: "2月", 新規会員: 300, 売上: 1398 },
  { name: "3月", 新規会員: 200, 売上: 9800 },
  { name: "4月", 新規会員: 278, 売上: 3908 },
  { name: "5月", 新規会員: 189, 売上: 4800 },
  { name: "6月", 新規会員: 239, 売上: 3800 },
]

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ダッシュボード</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本日の予約件数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24件</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">新規会員数（今月）</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145人</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">売上（今月）</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥2,345,000</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">アクティブユーザー</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234人</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>月次推移</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="新規会員" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="売上" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

