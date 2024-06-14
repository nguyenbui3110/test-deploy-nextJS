import AdminSidebar from '@/src/components/AdminSidebar/AdminSidebar'

export default function Layout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="p-6 w-full flex-grow-1 max-h-screen">{children}</main>
    </div>
  )
}
