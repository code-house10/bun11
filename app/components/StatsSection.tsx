'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './StatsSection.module.css';

const stats = [
    { value: 480, suffix: 'K', label: 'عمليات النقل المكتملة' },
    { value: 223, suffix: '+', label: 'شراكات متنوعة' },
    { value: 467, suffix: 'K', label: 'خدمة شهرية' },
    { value: 98, suffix: '%', label: 'معدل التسليم في الوقت' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isVisible, value]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

export default function StatsSection() {
    return (
        <section className={styles.stats}>
            <div className={styles.overlay}></div>
            <div className={styles.container}>
                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <div className={styles.statValue}>
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
