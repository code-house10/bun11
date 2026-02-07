'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './TestimonialsSection.module.css';

const testimonials = [
    {
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        name: 'خالد العمري',
        role: 'صاحب شركة',
        text: 'خدمة ممتازة من البداية حتى النهاية. الفريق محترف جداً والتغليف كان ممتازاً. وصل أثاثي بحالة ممتازة وفي الموعد المحدد. أنصح الجميع بالتعامل معهم.',
        rating: 5,
    },
    {
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        name: 'فاطمة الزهراني',
        role: 'ربة منزل',
        text: 'كنت قلقة جداً من نقل أثاث منزلي الكبير، لكن الفريق طمأنني منذ اللحظة الأولى. عملوا بجد واحترافية عالية. سعر معقول وخدمة لا تُنسى.',
        rating: 5,
    },
    {
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
        name: 'عبدالله الشمري',
        role: 'مهندس',
        text: 'نقلت مكتبي بالكامل معهم. كل شيء تم بسلاسة تامة - من الأجهزة الإلكترونية وحتى الأثاث الثقيل. خدمة عملاء ممتازة ومتابعة مستمرة.',
        rating: 5,
    },
];

export default function TestimonialsSection() {
    const [current, setCurrent] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

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
        <section id="testimonials" className={styles.testimonials} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionLabel}>
                        <span className={styles.labelLine}></span>
                        <span>آراء العملاء</span>
                    </div>
                    <h2 className={styles.sectionTitle}>ماذا يقول عملاؤنا</h2>
                </div>

                <div className={styles.slider}>
                    <div className={styles.quoteIcon}>
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                    </div>

                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`${styles.testimonialItem} ${index === current ? styles.active : ''}`}
                        >
                            <p className={styles.testimonialText}>{testimonial.text}</p>
                            <div className={styles.rating}>
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#f26922">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <div className={styles.author}>
                                <img src={testimonial.image} alt={testimonial.name} />
                                <div>
                                    <h4>{testimonial.name}</h4>
                                    <p>{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className={styles.indicators}>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.indicator} ${index === current ? styles.indicatorActive : ''}`}
                                onClick={() => setCurrent(index)}
                                aria-label={`Testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
