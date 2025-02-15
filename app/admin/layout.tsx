"use client"

import { useState } from "react"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import type React from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16">
        <Sidebar isOpen={isSidebarOpen} />
        <main
          className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 px-6 py-4 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

