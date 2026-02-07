'use client';
import { useEffect, useRef } from 'react';
import styles from './TeamSection.module.css';

const teamMembers = [
    {
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        name: 'محمد الأحمد',
        role: 'المدير العام',
        social: { facebook: '#', twitter: '#', linkedin: '#' },
    },
    {
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
        name: 'سارة العلي',
        role: 'مديرة العمليات',
        social: { facebook: '#', twitter: '#', linkedin: '#' },
    },
    {
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
        name: 'أحمد الخالد',
        role: 'رئيس فريق النقل',
        social: { facebook: '#', twitter: '#', linkedin: '#' },
    },
    {
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
        name: 'نورة السالم',
        role: 'مسؤولة خدمة العملاء',
        social: { facebook: '#', twitter: '#', linkedin: '#' },
    },
];

export default function TeamSection() {
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
        <section id="team" className={styles.team} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionLabel}>
                        <span className={styles.labelLine}></span>
                        <span>فريقنا</span>
                    </div>
                    <h2 className={styles.sectionTitle}>تعرف على خبرائنا</h2>
                    <p className={styles.sectionDesc}>
                        فريق متخصص من المحترفين يعملون بشغف لتقديم أفضل خدمة
                    </p>
                </div>

                <div className={styles.teamGrid}>
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className={styles.teamCard}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.cardImage}>
                                <img src={member.image} alt={member.name} />
                                <div className={styles.socialLinks}>
                                    <a href={member.social.facebook} aria-label="Facebook">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                        </svg>
                                    </a>
                                    <a href={member.social.twitter} aria-label="Twitter">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                        </svg>
                                    </a>
                                    <a href={member.social.linkedin} aria-label="LinkedIn">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                                            <rect x="2" y="9" width="4" height="12" />
                                            <circle cx="4" cy="4" r="2" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.memberName}>{member.name}</h3>
                                <p className={styles.memberRole}>{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
