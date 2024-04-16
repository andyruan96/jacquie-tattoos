import SideNav from '@/app/_components/sidenav/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:ml-5 md:mt-5 md:w-48">
        <SideNav />
      </div>
      <div className="flex-grow md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
