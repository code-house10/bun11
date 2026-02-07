'use client';
import { useState, useEffect } from 'react';
import styles from './HeroSection.module.css';

const slides = [
    {
        title: 'خدمات نقل العفش الاحترافية',
        subtitle: 'نقل آمن وسريع لأثاثك',
        description: 'نقدم لكم أفضل خدمات نقل العفش والأثاث بأيدي خبراء متخصصين. نضمن لكم سلامة ممتلكاتكم مع التغليف الاحترافي والنقل الآمن.',
        image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1920&q=80',
    },
    {
        title: 'تغليف احترافي ونقل آمن',
        subtitle: 'حماية كاملة لأثاثك',
        description: 'فريقنا المتخصص يستخدم أحدث تقنيات التغليف لضمان وصول أثاثك بحالة ممتازة. خدماتنا تشمل التغليف والفك والتركيب.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    },
    {
        title: 'خبرة تمتد لأكثر من 10 سنوات',
        subtitle: 'ثقة عملائنا هي رأسمالنا',
        description: 'أكثر من 10,000 عملية نقل ناجحة. نفخر بثقة عملائنا ونسعى دائماً لتقديم أفضل خدمة بأفضل سعر.',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80',
    },
];

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className={styles.hero}>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className={styles.overlay}></div>
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <span className={styles.subtitle}>{slide.subtitle}</span>
                            <h1 className={styles.title}>{slide.title}</h1>
                            <p className={styles.description}>{slide.description}</p>
                            <div className={styles.buttons}>
                                <a href="#contact" className={styles.btnPrimary}>
                                    احصل على عرض سعر
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 12H5M12 19l-7-7 7-7" />
                                    </svg>
                                </a>
                                <a href="#services" className={styles.btnOutline}>
                                    تعرف على خدماتنا
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Slide Indicators */}
            <div className={styles.indicators}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${index === currentSlide ? styles.indicatorActive : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className={styles.scrollIndicator}>
                <div className={styles.mouse}>
                    <div className={styles.wheel}></div>
                </div>
                <span>اسحب للأسفل</span>
            </div>
        </section>
    );
}
