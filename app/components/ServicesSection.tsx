'use client';
import { useEffect, useRef } from 'react';
import styles from './ServicesSection.module.css';

const services = [
    {
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        title: 'نقل الأثاث المنزلي',
        description: 'نقل جميع أنواع الأثاث المنزلي بأمان تام مع فريق متخصص وسيارات مجهزة',
        features: ['تغليف احترافي', 'فك وتركيب', 'تأمين شامل'],
    },
    {
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
        title: 'نقل أثاث المكاتب',
        description: 'خدمات نقل مكتبية متكاملة تشمل الأجهزة والمعدات مع الحفاظ على سير العمل',
        features: ['نقل أجهزة IT', 'تنسيق مواعيد', 'خدمة ليلية'],
    },
    {
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        ),
        title: 'التخزين الآمن',
        description: 'مستودعات مؤمنة ومراقبة على مدار الساعة لتخزين أثاثك لأي مدة',
        features: ['مراقبة 24/7', 'تحكم مناخي', 'تأمين كامل'],
    },
    {
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
        title: 'التغليف الاحترافي',
        description: 'تغليف متخصص لجميع أنواع الأثاث والتحف والأجهزة الإلكترونية',
        features: ['مواد عالية الجودة', 'حماية كاملة', 'تقنيات حديثة'],
    },
];

export default function ServicesSection() {
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
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="services" className={styles.services} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionLabel}>
                        <span className={styles.labelLine}></span>
                        <span>خدماتنا</span>
                    </div>
                    <h2 className={styles.sectionTitle}>شحنتك، أولويتنا</h2>
                    <p className={styles.sectionDesc}>
                        نقدم مجموعة متكاملة من خدمات نقل العفش لتلبية جميع احتياجاتك
                    </p>
                </div>

                <div className={styles.servicesGrid}>
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={styles.serviceCard}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.cardIcon}>{service.icon}</div>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDesc}>{service.description}</p>
                            <ul className={styles.cardFeatures}>
                                {service.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#f26922">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" stroke="#f26922" fill="none" strokeWidth="2" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <a href="#contact" className={styles.cardLink}>
                                احجز الآن
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
