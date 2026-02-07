'use client';
import { useEffect, useRef } from 'react';
import styles from './ProjectsSection.module.css';

const projects = [
    {
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
        title: 'نقل فيلا كاملة',
        category: 'نقل منزلي',
    },
    {
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
        title: 'نقل شركة تقنية',
        category: 'نقل مكتبي',
    },
    {
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
        title: 'تخزين أثاث عائلي',
        category: 'تخزين',
    },
    {
        image: 'https://images.unsplash.com/photo-1600573472591-ee6c8e695c75?w=600&q=80',
        title: 'نقل شقة فاخرة',
        category: 'نقل منزلي',
    },
    {
        image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&q=80',
        title: 'نقل مستشفى خاص',
        category: 'نقل تجاري',
    },
    {
        image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80',
        title: 'نقل محل تجاري',
        category: 'نقل تجاري',
    },
];

export default function ProjectsSection() {
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
        <section id="projects" className={styles.projects} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionLabel}>
                        <span className={styles.labelLine}></span>
                        <span>أعمالنا</span>
                    </div>
                    <h2 className={styles.sectionTitle}>مشاريع نقل ناجحة</h2>
                    <p className={styles.sectionDesc}>
                        نفخر بإنجازاتنا في نقل الآلاف من المنازل والمكاتب بنجاح
                    </p>
                </div>

                <div className={styles.projectsGrid}>
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={styles.projectCard}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.projectImage}>
                                <img src={project.image} alt={project.title} />
                                <div className={styles.projectOverlay}>
                                    <span className={styles.projectCategory}>{project.category}</span>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <a href="#" className={styles.projectLink}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M19 12H5M12 19l-7-7 7-7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.viewAll}>
                    <a href="#contact" className={styles.viewAllBtn}>
                        عرض جميع المشاريع
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
