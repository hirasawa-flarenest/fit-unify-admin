import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"

export default function HelpSupportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ヘルプ・サポート</h1>

      {/* 検索バー */}
      <div className="mb-8">
        <Input type="search" placeholder="キーワードで検索..." className="max-w-md" />
      </div>

      {/* よくある質問 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">よくある質問</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>予約をキャンセルする方法は？</AccordionTrigger>
            <AccordionContent>
              予約のキャンセルは、予約管理画面から該当の予約を選択し、「キャンセル」ボタンをクリックすることで行えます。キャンセルポリシーに基づき、キャンセル料が発生する場合がありますのでご注意ください。
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>新しいトレーナーを追加するには？</AccordionTrigger>
            <AccordionContent>
              新しいトレーナーを追加するには、トレーナー管理画面で「新規トレーナー追加」ボタンをクリックし、必要な情報を入力してください。トレーナーのプロフィール、専門分野、利用可能な時間帯などの情報が必要です。
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>料金プランの変更方法は？</AccordionTrigger>
            <AccordionContent>
              料金プランの変更は、プラン管理画面から行えます。既存のプランを選択して「編集」をクリックするか、新しいプランを作成することができます。変更を保存する前に、影響を受ける顧客や予約について確認することをお勧めします。
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* ヘルプトピック */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">ヘルプトピック</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>予約管理</CardTitle>
              <CardDescription>予約の作成、変更、キャンセルについて</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                <li>新規予約の作成方法</li>
                <li>予約の変更とキャンセル</li>
                <li>予約状況の確認</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>会員管理</CardTitle>
              <CardDescription>会員情報の管理と更新について</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                <li>新規会員の登録</li>
                <li>会員情報の編集</li>
                <li>会員の検索と絞り込み</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>レポートと分析</CardTitle>
              <CardDescription>データ分析と報告書の作成について</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                <li>売上レポートの生成</li>
                <li>会員統計の確認</li>
                <li>トレーナー稼働率の分析</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* お問い合わせ */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">お問い合わせ</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>カスタマーサポート</CardTitle>
              <CardDescription>お困りの際はこちらまでご連絡ください</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <div className="flex items-center">
                <Mail className="mr-2" />
                <span>support@fitunify.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2" />
                <span>0120-123-456</span>
              </div>
              <Button>お問い合わせフォーム</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>営業時間</CardTitle>
              <CardDescription>サポート対応可能な時間帯</CardDescription>
            </CardHeader>
            <CardContent>
              <p>平日: 9:00 - 18:00</p>
              <p>土曜: 10:00 - 17:00</p>
              <p>日曜・祝日: 休業</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

