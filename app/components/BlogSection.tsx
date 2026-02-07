'use client';
import { useEffect, useRef } from 'react';
import styles from './BlogSection.module.css';

const blogPosts = [
    {
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
        date: '15 يناير 2025',
        author: 'المدير',
        comments: 4,
        title: 'نصائح ذهبية لنقل أثاثك بأمان تام',
        excerpt: 'تعرف على أهم النصائح والخطوات التي تضمن وصول أثاثك سليماً إلى وجهته الجديدة...',
    },
    {
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
        date: '10 يناير 2025',
        author: 'المدير',
        comments: 6,
        title: 'كيف تختار شركة نقل عفش موثوقة',
        excerpt: 'معايير مهمة يجب مراعاتها عند اختيار شركة نقل العفش لضمان تجربة نقل ناجحة...',
    },
];

export default function BlogSection() {
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
        <section id="blog" className={styles.blog} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.headerRow}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionLabel}>
                            <span className={styles.labelLine}></span>
                            <span>أخبار ونصائح</span>
                        </div>
                        <h2 className={styles.sectionTitle}>مدونة نقل العفش</h2>
                    </div>
                    <a href="#" className={styles.viewAllBtn}>
                        عرض جميع المقالات
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </a>
                </div>

                <div className={styles.blogGrid}>
                    {blogPosts.map((post, index) => (
                        <article
                            key={index}
                            className={styles.blogCard}
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <div className={styles.cardImage}>
                                <img src={post.image} alt={post.title} />
                                <div className={styles.cardDate}>{post.date}</div>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardMeta}>
                                    <span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        {post.author}
                                    </span>
                                    <span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                                        </svg>
                                        {post.comments} تعليقات
                                    </span>
                                </div>
                                <h3 className={styles.cardTitle}>
                                    <a href="#">{post.title}</a>
                                </h3>
                                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                                <a href="#" className={styles.readMore}>
                                    اقرأ المزيد
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 12H5M12 19l-7-7 7-7" />
                                    </svg>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
