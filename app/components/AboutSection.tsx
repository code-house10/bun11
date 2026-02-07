'use client';
import { useEffect, useRef } from 'react';
import styles from './AboutSection.module.css';

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const features = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
            ),
            title: 'نقل الشحنات الكاملة',
            description: 'مثالي للشحنات الكبيرة التي تحتاج لنقل مخصص',
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                </svg>
            ),
            title: 'التخزين المؤمن',
            description: 'مستودعات آمنة ومراقبة على مدار الساعة',
        },
    ];

    return (
        <section id="about" className={styles.about} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Image Side */}
                    <div className={styles.imageWrapper}>
                        <div className={styles.mainImage}>
                            <img
                                src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80"
                                alt="نقل العفش"
                            />
                        </div>
                        <div className={styles.secondaryImage}>
                            <img
                                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
                                alt="تغليف الأثاث"
                            />
                        </div>
                        <div className={styles.experienceBadge}>
                            <span className={styles.expNumber}>+10</span>
                            <span className={styles.expText}>سنوات خبرة</span>
                        </div>
                        <div className={styles.decorCircle}></div>
                    </div>

                    {/* Content Side */}
                    <div className={styles.content}>
                        <div className={styles.sectionLabel}>
                            <span className={styles.labelLine}></span>
                            <span>من نحن</span>
                        </div>
                        <h2 className={styles.title}>شريكك الموثوق في كل عملية نقل</h2>
                        <p className={styles.description}>
                            نحن أكثر من مجرد شركة نقل - نحن شريكك الموثوق في كل خطوة. من اللحظة الأولى وحتى وصول أثاثك بسلام، فريقنا المتخصص يضمن معاملة كل قطعة بعناية فائقة مع متابعة مستمرة.
                        </p>

                        <div className={styles.features}>
                            {features.map((feature, index) => (
                                <div key={index} className={styles.featureItem}>
                                    <div className={styles.featureIcon}>{feature.icon}</div>
                                    <div className={styles.featureContent}>
                                        <h4>{feature.title}</h4>
                                        <p>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a href="#contact" className={styles.ctaBtn}>
                            اقرأ المزيد
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
