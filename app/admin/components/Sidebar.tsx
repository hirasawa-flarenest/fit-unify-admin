import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Users,
  Store,
  UserCheck,
  Calendar,
  ClipboardList,
  CreditCard,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  Home,
} from "lucide-react"

const menuItems = [
  { icon: Home, label: "ホーム", href: "/admin/dashboard" },
  { icon: Users, label: "ユーザー管理", href: "/admin/users" },
  { icon: Store, label: "店舗管理", href: "/admin/stores" },
  { icon: UserCheck, label: "トレーナー管理", href: "/admin/trainers" },
  { icon: Calendar, label: "予約管理", href: "/admin/reservations" },
  { icon: ClipboardList, label: "プラン管理", href: "/admin/plans" },
  { icon: CreditCard, label: "支払い管理", href: "/admin/payments" },
  { icon: BarChart2, label: "レポート", href: "/admin/reports" },
  { icon: Settings, label: "システム設定", href: "/admin/settings" },
  { icon: HelpCircle, label: "ヘルプ・サポート", href: "/admin/help" },
]

interface SidebarProps {
  isOpen: boolean
}

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={`
        fixed top-16 left-0 z-30 h-[calc(100vh-4rem)]
        bg-white border-r border-gray-200
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* ナビゲーションメニュー */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-2 space-y-1">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center h-10 px-3 rounded-lg
                      transition-all duration-200 relative
                      group whitespace-nowrap
                      ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}
                    `}
                  >
                    <item.icon
                      className={`
                        w-5 h-5 shrink-0
                        transition-colors
                        ${isActive ? "text-blue-600" : "text-gray-500"}
                        ${isOpen ? "mr-3" : ""}
                      `}
                    />
                    <span
                      className={`
                        text-sm font-medium
                        transition-all duration-300
                        ${!isOpen ? "opacity-0 -translate-x-full w-0" : "opacity-100 translate-x-0"}
                      `}
                    >
                      {item.label}
                    </span>
                    {/* 折りたたみ時のツールチップ */}
                    {!isOpen && (
                      <div
                        className="
                        absolute left-full ml-2 px-2 py-1
                        bg-gray-900 text-white text-sm
                        rounded opacity-0 invisible
                        group-hover:opacity-100 group-hover:visible
                        transition-all duration-200
                        whitespace-nowrap z-50
                      "
                      >
                        {item.label}
                      </div>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* フッター */}
        <div className="border-t border-gray-200 p-3">
          <div
            className={`
            flex items-center justify-between
            overflow-hidden
          `}
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
            <div
              className={`
              flex items-center space-x-3 ml-3
              ${!isOpen ? "opacity-0 w-0" : "opacity-100"}
              transition-all duration-300
            `}
            >
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-700">管理者</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>
            <button
              className={`
                p-2 rounded-lg hover:bg-gray-100 transition-colors
                ${!isOpen ? "opacity-0 w-0" : "opacity-100"}
              `}
              title="ログアウト"
            >
              <LogOut className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

