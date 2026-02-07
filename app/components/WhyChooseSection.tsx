'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './WhyChooseSection.module.css';

const stats = [
    { label: 'رضا العملاء', value: 98 },
    { label: 'إدارة المخزون', value: 95 },
    { label: 'التسليم في الوقت', value: 92 },
    { label: 'جودة الخدمة', value: 97 },
];

const features = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        title: 'السرعة',
        description: 'خدمة سريعة وموثوقة',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        title: 'الأمان',
        description: 'حماية كاملة لأثاثك',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ),
        title: 'الجودة',
        description: 'أعلى معايير الخدمة',
    },
];

export default function WhyChooseSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
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

    return (
        <section className={styles.whyChoose} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Content Side */}
                    <div className={styles.content}>
                        <div className={styles.sectionLabel}>
                            <span className={styles.labelLine}></span>
                            <span>لماذا نحن</span>
                        </div>
                        <h2 className={styles.title}>الطريق نحو خدمات نقل أذكى يبدأ من هنا</h2>
                        <p className={styles.description}>
                            نحن أكثر من مجرد شركة نقل - نحن شريكك الموثوق على المدى الطويل. من أول خطوة وحتى الوجهة النهائية، فريقنا الخبير يضمن سلامة كل شحنة.
                        </p>

                        <div className={styles.progressBars}>
                            {stats.map((stat, index) => (
                                <div key={index} className={styles.progressItem}>
                                    <div className={styles.progressHeader}>
                                        <span>{stat.label}</span>
                                        <span>{stat.value}%</span>
                                    </div>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFill}
                                            style={{
                                                width: isVisible ? `${stat.value}%` : '0%',
                                                transitionDelay: `${index * 0.15}s`,
                                            }}
                                        ></div>
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

                    {/* Image Side with Features */}
                    <div className={styles.imageWrapper}>
                        <div className={styles.mainImage}>
                            <img
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                                alt="نقل العفش الاحترافي"
                            />
                        </div>
                        <div className={styles.featuresGrid}>
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={styles.featureCard}
                                    style={{ animationDelay: `${index * 0.15}s` }}
                                >
                                    <div className={styles.featureIcon}>{feature.icon}</div>
                                    <h4>{feature.title}</h4>
                                    <p>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
