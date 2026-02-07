'use client';
import { useEffect, useRef } from 'react';
import styles from './WorkProcessSection.module.css';

const steps = [
    {
        number: '01',
        title: 'الطلب والحجز',
        description: 'تواصل معنا وأخبرنا بتفاصيل النقل. سنقدم لك عرض سعر مفصل ومناسب لاحتياجاتك.',
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="2" />
                <path d="M9 14l2 2 4-4" />
            </svg>
        ),
    },
    {
        number: '02',
        title: 'التحميل والنقل',
        description: 'يقوم فريقنا بتغليف وتحميل جميع الأثاث بعناية فائقة مع ضمان الحماية الكاملة.',
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
        ),
    },
    {
        number: '03',
        title: 'التوصيل والدعم',
        description: 'نوصل أثاثك في الموعد المحدد ونقوم بالفك والتركيب مع متابعة ما بعد الخدمة.',
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
    },
];

export default function WorkProcessSection() {
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

    return (
        <section className={styles.workProcess} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionLabel}>
                        <span className={styles.labelLine}></span>
                        <span>آلية العمل</span>
                    </div>
                    <h2 className={styles.sectionTitle}>كيف ننقل أثاثك</h2>
                    <p className={styles.sectionDesc}>
                        ثلاث خطوات بسيطة لتجربة نقل سلسة وآمنة
                    </p>
                </div>

                <div className={styles.stepsGrid}>
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={styles.stepCard}
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <div className={styles.stepNumber}>{step.number}</div>
                            <div className={styles.stepIcon}>{step.icon}</div>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDesc}>{step.description}</p>
                            {index < steps.length - 1 && (
                                <div className={styles.connector}>
                                    <svg width="60" height="20" viewBox="0 0 60 20">
                                        <path
                                            d="M0 10 L50 10 M50 10 L40 5 M50 10 L40 15"
                                            stroke="#f26922"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeDasharray="5,5"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
