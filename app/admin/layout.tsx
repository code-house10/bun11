'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './admin.module.css';

const navItems = [
    { href: '/admin', label: 'لوحة التحكم', icon: '📊' },
    { href: '/admin/hero', label: 'السلايدر الرئيسي', icon: '🖼️' },
    { href: '/admin/about', label: 'من نحن', icon: 'ℹ️' },
    { href: '/admin/services', label: 'الخدمات', icon: '🛠️' },
    { href: '/admin/team', label: 'فريق العمل', icon: '👥' },
    { href: '/admin/projects', label: 'المشاريع', icon: '📁' },
    { href: '/admin/testimonials', label: 'آراء العملاء', icon: '💬' },
    { href: '/admin/blog', label: 'المدونة', icon: '📝' },
    { href: '/admin/stats', label: 'الإحصائيات', icon: '📈' },
    { href: '/admin/settings', label: 'الإعدادات', icon: '⚙️' },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className={styles.adminLayout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <Link href="/admin" className={styles.logo}>
                        <span>🚚</span>
                        <span>لوحة التحكم</span>
                    </Link>
                </div>
                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className={styles.sidebarFooter}>
                    <Link href="/" className={styles.viewSite}>
                        👁️ عرض الموقع
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.main}>
                <header className={styles.header}>
                    <h1 className={styles.pageTitle}>
                        {navItems.find((item) => item.href === pathname)?.label || 'لوحة التحكم'}
                    </h1>
                    <div className={styles.headerActions}>
                        <span className={styles.adminBadge}>مدير</span>
                    </div>
                </header>
                <div className={styles.content}>{children}</div>
            </main>
        </div>
    );
}
