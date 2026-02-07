import styles from './admin.module.css';

async function getStats() {
    // In production, fetch from API
    return {
        heroSlides: 3,
        services: 4,
        teamMembers: 4,
        projects: 6,
        testimonials: 3,
        blogPosts: 2,
    };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    const statCards = [
        { label: 'السلايدر', value: stats.heroSlides, icon: '🖼️', color: 'orange' },
        { label: 'الخدمات', value: stats.services, icon: '🛠️', color: 'blue' },
        { label: 'فريق العمل', value: stats.teamMembers, icon: '👥', color: 'green' },
        { label: 'المشاريع', value: stats.projects, icon: '📁', color: 'purple' },
    ];

    return (
        <div>
            <div className={styles.statsGrid}>
                {statCards.map((stat, index) => (
                    <div key={index} className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles[stat.color]}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>مرحباً بك في لوحة التحكم</h2>
                </div>
                <p style={{ color: '#6c757d', lineHeight: 1.8 }}>
                    من هنا يمكنك إدارة جميع محتويات موقع نقل العفش. استخدم القائمة الجانبية للتنقل بين الأقسام المختلفة.
                </p>
                <ul style={{ marginTop: '20px', color: '#6c757d', lineHeight: 2 }}>
                    <li>📸 <strong>السلايدر الرئيسي:</strong> إدارة صور ومحتوى الصفحة الرئيسية</li>
                    <li>ℹ️ <strong>من نحن:</strong> تعديل معلومات الشركة</li>
                    <li>🛠️ <strong>الخدمات:</strong> إضافة وتعديل الخدمات المقدمة</li>
                    <li>👥 <strong>فريق العمل:</strong> إدارة أعضاء الفريق</li>
                    <li>📁 <strong>المشاريع:</strong> عرض المشاريع المنجزة</li>
                    <li>💬 <strong>آراء العملاء:</strong> إدارة شهادات العملاء</li>
                    <li>📝 <strong>المدونة:</strong> كتابة وتعديل المقالات</li>
                    <li>📈 <strong>الإحصائيات:</strong> تعديل الأرقام المعروضة</li>
                    <li>⚙️ <strong>الإعدادات:</strong> بيانات التواصل والروابط</li>
                </ul>
            </div>
        </div>
    );
}
